from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Technician, Appointment
import json



class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "id",
        "technician"
    ]
    encoders = {
        "technician": TechnicianDetailEncoder()
    }

@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianDetailEncoder,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No current technicians"},
                status=404
            )

    else: # POST
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)

            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician ID"},
                status=400
            )
    else: # DELETE
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentListEncoder
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "No appointments available"},
                status=404
            )

    else: # POST
        try:
            content = json.loads(request.body)
            employee_id = content["technician"]
            technician = Technician.objects.get(employee_id=employee_id)
            content["technician"] = technician

            appointment = Appointment.objects.create(**content)

            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician Employee ID"},
                status=400
            )

@require_http_methods(["PUT"])
def api_appointment_cancel(request, id):
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=id)

            props = ["status"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
                    appointment.save()

            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )

        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Appointment ID"},
                status=400
            )

@require_http_methods(["PUT"])
def api_appointment_finish(request, id):
    try:
        content = json.loads(request.body)
        appointment = Appointment.objects.get(id=id)

        props = ["status"]
        for prop in props:
            if prop in content:
                setattr(appointment, prop, content[prop])
                appointment.save()

        return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )

    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid Appointment ID"},
            status=400
        )

@require_http_methods(["DELETE"])
def api_appointment_delete(request, id):
    count, _ = Appointment.objects.filter(id=id).delete()
    return JsonResponse({"deleted": count > 0})
