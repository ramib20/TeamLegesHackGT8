from django.conf import settings
from twilio.rest import Client

# def send_message(receiving_phone_num='+16307508897', lat="33.762003", long="-84.416305", comment=""):
def send_message(receiving_phone_num, lat, long, name, comment):
  partialURL = 'https://www.google.com/maps/place/'

  client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
  URL = partialURL + str(lat) + "," + str(long)
  
  try:
    message = client.messages.create(
      body = "[Hello, this is a notification from DROPSPOT. You will find your package delivered by " + name + " at the following location.] " + URL,
      from_ = '+13204002803',
      to = receiving_phone_num)
    print("Message sent successfully!")
    return message.error_code
  except Exception as e:
    return e


  