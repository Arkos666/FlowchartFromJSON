from django.urls import include, path

urlpatterns = [
    path('flowchart_app/', include('flowchart_app.urls', namespace='flowchart_app')),
]
