"""intsureview_be URL Configuration"""

from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from intsureview_be.apps.api import views




router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

# Added the path to '' for the intsureview_be.apps.api.urls to grab the urls made in the api's urls.py file
urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('intsureview_be.apps.api.urls')),
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
