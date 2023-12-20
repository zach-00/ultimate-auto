from django.db import models
from django.urls import reverse

# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=8)

    def __str__(self):
        return self.last_name

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address_street = models.CharField(max_length=200)
    address_city = models.CharField(max_length=200)
    address_state = models.CharField(max_length=2)
    address_zip = models.CharField(max_length=5)
    phone = models.CharField(max_length=13)

class AutoVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutoVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    price = models.PositiveSmallIntegerField()
