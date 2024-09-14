from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,default = '', null=True, blank=True)
    cin = models.CharField(max_length=255,default = '')
    firstName = models.CharField(max_length=255,default = '')
    lastName = models.CharField(max_length=255,default = '')
    tel = models.CharField(max_length=8)
    adresse = models.CharField(max_length=255,default = '')
    photo = models.FileField(upload_to='photos',default = '')
    gender = models.CharField(max_length=10,default = '')
    
    class Meta:
        db_table = "client"

    def __str__(self):
        return self.firstName
    
class Offer(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    tarif = models.CharField(max_length=255)
    class Meta:
        db_table = "offers"

    def __str__(self):
        return self.title
    
class Order(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='orders')
    offers = models.ManyToManyField(Offer, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], default='pending')

    class Meta:
        db_table = "orders"

    def __str__(self):
        return f"Order {self.id} - {self.client.firstName} - Offers: {', '.join([offer.title for offer in self.offers.all()])}"