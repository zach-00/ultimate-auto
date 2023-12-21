from django.urls import path
from .views import api_technicians, api_technician, api_appointments, api_appointment_cancel
from .views import api_appointment_finish, api_appointment_delete

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_technician, name="api_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:id>/cancel/", api_appointment_cancel, name="api_appointment_cancel"),
    path("appointments/<int:id>/finish/", api_appointment_finish, name="api_appointment_finish"),
    path("appointments/<int:id>/", api_appointment_delete, name="api_appointment_delete"),
]
