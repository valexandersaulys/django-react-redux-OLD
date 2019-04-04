from rest_framework import viewsets, permissions

from leads.models import Lead
from leads.serializers import LeadSerializer


# View
class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LeadSerializer

    # what we query for 
    def get_queryset(self):
        """only get the leads of the user"""
        return self.request.user.leads.all()

    # what happens we create a new lead
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

