from django.shortcuts import render, redirect
from .forms import UploadJSONForm
import json


def handle_uploaded_file(f):
    content = f.read().decode('utf-8')
    data = json.loads(content)
    return data


def upload_json(request):
    if request.method == 'POST':
        form = UploadJSONForm(request.POST, request.FILES)
        if form.is_valid():
            json_file = request.FILES['json_file']
            data = handle_uploaded_file(json_file)
            orientacion = form.cleaned_data['orientacion']
            request.session['json_data'] = data
            request.session['orientacion'] = orientacion

            return redirect('flowchart_app:display_diagram')
    else:
        form = UploadJSONForm()
    return render(request, 'flowchart_app/upload.html', {'form': form})


def display_diagram(request):
    json_data = request.session.get('json_data')
    orientacion = request.session.get('orientacion', 'UD')

    return render(request, 'flowchart_app/diagram.html', {'json_data': json_data, 'orientacion': orientacion})
