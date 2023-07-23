from django.contrib import admin
from .models import Entry

class EntryAdmin(admin.ModelAdmin):
    form_display = ('name', 'email', 'select', 'raceOption', 'comments')

admin.site.register(Entry)