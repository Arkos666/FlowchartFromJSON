from django.urls import path
from . import views

app_name = 'jsonapp'

urlpatterns = [
    path('upload/', views.upload_json, name='upload_json'),
    path('diagram/', views.display_diagram, name='display_diagram'),
]
