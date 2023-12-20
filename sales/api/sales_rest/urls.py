from django.urls import path
from .views import api_salespeople_list, api_customer_list, api_sales_list

urlpatterns = [
    path("salespeople/", api_salespeople_list, name="api_salespeople_list"),
    path("customers/", api_customer_list, name="api_customer_list"),
    path("sales/", api_sales_list, name="api_sales_list")

]
