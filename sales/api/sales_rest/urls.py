from django.urls import path
from .views import api_salespeople_list, api_customer_list, api_sales_list
from .views import api_salesperson, api_customer, api_sale

urlpatterns = [
    path("salespeople/", api_salespeople_list, name="api_salespeople_list"),
    path("customers/", api_customer_list, name="api_customer_list"),
    path("sales/", api_sales_list, name="api_sales_list"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salesperson"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("sales/<int:id>/", api_sale, name="api_sale"),
]
