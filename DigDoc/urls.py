"""DigDoc URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from mainapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('mainapp.urls')),
    path('home/<str:input>', views.DigDoc().text_to_speech),
    # path('billing/', views.DigDoc),
    path('api/users/<str:input>/test/', views.DigDoc().predict_op),
    path('api/users', views.DigDoc().user_view),
    path('api/users/<str:input>',views.DigDoc().user_detail_view),
    path('api/users/reading/<int:id>/answers',views.DigDoc().answers_detail_view),
    path('api/users/<str:input>/test/<int:id>/',views.DigDoc().reading_detail_view),
    path('api/users/<str:input>/answers/',views.DigDoc().user_answer_view)
]
