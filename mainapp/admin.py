from django.contrib import admin
from .models import CustomUser,Reading,Answers
admin.site.register(CustomUser)
admin.site.register(Reading)
admin.site.register(Answers)
# Register your models here.
