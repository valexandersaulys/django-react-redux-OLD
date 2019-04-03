from django.shortcuts import render

# can I do this with CBV?
def index(request):
    return render(request, 'frontend/index.html')
