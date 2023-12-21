from django.contrib import admin
from .models import Salesperson, Customer, AutoVO, Sale

# Register your models here.
@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
        list_display = [
        "first_name",
        "last_name",
        "full_name"
    ]

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(AutoVO)
class AutoVO(admin.ModelAdmin):
    pass

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass
