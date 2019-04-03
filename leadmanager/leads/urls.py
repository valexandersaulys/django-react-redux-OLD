from rest_framework import routers

from leads.api import LeadViewSet


router = routers.DefaultRouter()

# router.register(<url_prefix>, <viewset_class>, <basename>)
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls
