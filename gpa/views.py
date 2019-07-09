from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from datetime import datetime
import json

import gpa.fetcher

def index(request):
    return render(
        request, 
        'index.html', {
            #'current_time': str(datetime.now()),
        }
    )

def tutorial(request):
    return render(
        request,
        'tutorial.html',
    )

@csrf_exempt
def getGPA(request):
    if request.method == "GET":
        return render(
            request,
            'index.html'
        )

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    url = body.get("url")

    return JsonResponse(gpa.fetcher.getGrades(url))
