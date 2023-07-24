from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Entry

class EntryTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.entry_data = {
            'name': 'John Doe',
            'email': 'john@test.com',
            'select': 'Yes',
            'raceOption': 'Marathon',
            'comments': 'Test comments',
        }
    
    def test_create_entry(self):
        url = reverse('entries')
        response = self.client.post(url, self.entry_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Entry.objects.count(), 1)
        self.assertEqual(Entry.objects.get().name, 'John Doe')

    
        #Getting all race entries

    def test_get_all_entries(self):
        url = reverse('entries')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        #Creating a update test case for race entries

    def test_update_entry(self):
        entry = Entry.objects.create(**self.entry_data)
        url = reverse('entries-detail')
        updated_data = {
            'name': 'Updated Name',
            'email': 'updated@example.com',
            'selectValue': 'No',
            'radioOption': '5k',
            'comments': 'Updated comments',
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Entry.objects.get(id=entry.id).name, 'Updated Name')

        #Creating a delete test case for race entries

    def test_delete_entry(self):
        entry = Entry.objects.create(**self.entry_data)
        url = reverse('entries-detail')
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Entry.objects.count(), 0)