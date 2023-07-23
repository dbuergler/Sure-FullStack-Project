from django.urls import path, include
from .views import EntryView

"""api URL configuration"""

urlpatterns = [
    path('api/entries/', EntryView.as_view(), name='entries'),
    
]