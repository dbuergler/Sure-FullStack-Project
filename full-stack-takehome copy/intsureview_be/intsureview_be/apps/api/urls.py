from django.urls import path, include
from .views import EntryCreateView, EntryRetrieveUpdateDeleteView

"""api URL configuration"""

urlpatterns = [
    path('api/entries/', EntryCreateView.as_view(), name='entries'),
    path('api/entries/', EntryRetrieveUpdateDeleteView.as_view(), name='entries-detail')
]