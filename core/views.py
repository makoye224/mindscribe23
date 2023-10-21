from django.shortcuts import render


def render_react_frontend(request):
    return render(request, "index.html")
