from django.db import models


class CustomUser(models.Model):
    username = models.fields.CharField(max_length=45,null=False)
    email = models.fields.EmailField(max_length=45,primary_key=True,unique=True, null=False)
    city = models.fields.CharField(max_length = 50,null=False)
    mobile = models.fields.CharField(max_length = 10,null=False)


    def __str__(self):
        return self.email

class Reading(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    temperature = models.DecimalField(max_digits=5, decimal_places=2)
    age = models.IntegerField()
    oximeter = models.DecimalField(max_digits=5, decimal_places=2)
    cough = models.IntegerField()
    risk = models.CharField(max_length = 10)
    created_on = models.DateTimeField(auto_now_add=True)


class Answers(models.Model):
    reading = models.OneToOneField(Reading,on_delete=models.CASCADE,primary_key=True)
    travelhistory = models.CharField(max_length = 10,null=False)
    heartpatient = models.CharField(max_length = 10,null=False)
    familyinfected = models.CharField(max_length = 10,null=False)
    shortnessbreath = models.CharField(max_length = 10,null=False)
    

    