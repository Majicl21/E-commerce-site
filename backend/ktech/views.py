from django.shortcuts import render
import json
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view,permission_classes, authentication_classes
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password

# Create your views here.
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
@api_view(['POST'])
def clientSignup(request):
    serializer = ClientSignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        username = request.data.get('user', {}).get('username')
        if username:
            user = User.objects.get(username=username)
            my_client_group = Group.objects.get_or_create(name='Client')
            my_client_group[0].user_set.add(user)
            token, created = Token.objects.get_or_create(user=user)
            data = {
                "user": serializer.data, 
                "token": token.key
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Username not provided in request data."}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signIn(request):
    data = request.data
    serializer = UserLoginSerializer(data=data)
    if serializer.is_valid():
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            token, created_token = Token.objects.get_or_create(user=user)
            user_group = None
            if user.groups.exists():
                user_group = user.groups.first().name
            response_data = {
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,  
                    "group": user_group  
                },
                "token": token.key
            }
            return Response(response_data, status=status.HTTP_200_OK)
    return Response({"message": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response({"message": "Logged out successfully"})
    except AuthenticationFailed:
        return Response({"error": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)
    except PermissionDenied:
        return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
def send_email_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        email = data.get('email')
        subject = data.get('name', 'No Subject') 
        message = data.get('message', '')
        from_email = settings.EMAIL_HOST_USER
        
        email_body = f"Submitted Email: {email}\n\nMessage:\n{message}"
        recipient_list = [settings.EMAIL_HOST_USER,email]  
        
        if not message or not from_email:
            return JsonResponse({'error': 'Message and email are required'}, status=400)

        try:
            send_mail(subject, email_body, from_email, recipient_list)
            return JsonResponse({'success': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@api_view(['POST'])
def create_client_and_order(request):
    client_data = request.data.get('client')
    order_data = request.data.get('order')

    # Debug: Check the type and content of order_data
    print(type(order_data))  # This should be <class 'dict'>
    print(order_data)

    # Check if order_data is actually a dictionary
    if not isinstance(order_data, dict):
        return Response({"error": "Order data should be a dictionary"}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure user is provided and set correctly
    user = request.user  # Assuming user is authenticated and you want to use the current user
    client_data['user'] = user.id  # Set user_id or user directly

    # Check if a client with the provided cin already exists
    cin = client_data.get('cin')  # Adjust the field name as needed
    existing_client = Client.objects.filter(cin=cin).first()

    if existing_client:
        # If client exists, use the existing client
        client = existing_client
    else:
        # Create a new client if one does not exist
        client_serializer = ClientSerializer(data=client_data)
        if client_serializer.is_valid():
            client = client_serializer.save()
        else:
            return Response(client_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Continue with order creation
    order_data['client'] = client.id  # This should work now if order_data is correct
    order_serializer = OrderSerializer(data=order_data)
    if order_serializer.is_valid():
        order_serializer.save()
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def update_order_status(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    new_status = request.data.get('status')
    if new_status and new_status in ['pending', 'completed', 'cancelled']:
        order.status = new_status
        order.save()
        return Response({'message': 'Order status updated successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)