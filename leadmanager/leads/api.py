from rest_framework import viewsets, permissions

from leads.models import Lead
from leads.serializers import LeadSerializer


# View
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()   # grab all leads in our queryset
    permission_classes = [
        permissions.AllowAny   # this will get changed later
    ]
    serializer_class = LeadSerializer
