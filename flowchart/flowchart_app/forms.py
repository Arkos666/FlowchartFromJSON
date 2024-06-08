from django import forms

ORIENTACION_CHOICES = [
    ('UD', 'Arriba-Abajo'),
    ('LR', 'Izquierda-Derecha'),
]


class UploadJSONForm(forms.Form):
    json_file = forms.FileField()

    def clean_json_file(self):
        data = self.cleaned_data['json_file']
        if data:
            file_extension = data.name.split('.')[-1]
            if file_extension.lower() != 'json':
                raise forms.ValidationError("Solo se permiten archivos JSON.")
        return data

    orientacion = forms.ChoiceField(choices=ORIENTACION_CHOICES, initial='UD')

