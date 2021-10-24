from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.conf import settings
from .models import Delivery
from .serializer import DeliverySerializer
from django.views.decorators.csrf import csrf_exempt
from .auxiliary import send_message

import requests
import os
from twilio.rest import Client

@csrf_exempt # temp solution for testing
def location(request):
  print(request.POST)

  if request.method == "GET":
    return render(request, 'index.html')
  else:
    # request method is POST:

    phone_number = "+" + request.POST.get('country_code') + request.POST.get('phone_number')

    response = send_message(phone_number, request.POST.get('latitude'), request.POST.get('longitude'), request.POST.get('your_name'), request.POST.get('comment'))


# 'csrfmiddlewaretoken': ['t8Ph2ZEu5KxdpdnALGlV1k9CSU98OnXCJ9OBe5koQTMdoVIxVPJgyUwq6IT9jPrG'], 'your_name': ['tyler'], 'countryCode': ['1'], 'phone_number': ['864-567-0018'], 'latitude': ['33.7743171'], 'longitude': ['-84.3964628']}>
    # print(DeliverySerializer(request.POST).isValid())

    return render(request, 'success.html')

