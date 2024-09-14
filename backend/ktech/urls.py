from django.urls import path,include
from rest_framework import routers

from .views import *

routes=routers.DefaultRouter()
routes.register('client',ClientViewSet)
routes.register('offers', OfferViewSet)
routes.register('order', OrderViewSet)


urlpatterns=[
    path('',include(routes.urls)),
    path('login/',signIn),
    path('logout/',logout),
    path('clientsignup/',clientSignup),
    path('clientOrder/',create_client_and_order),
     path('order/<int:order_id>/update-status/', update_order_status),
]