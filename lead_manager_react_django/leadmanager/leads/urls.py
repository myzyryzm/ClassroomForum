from rest_framework import routers
from leads.api import LeadViewSet, TopicViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')
router.register('api/topics', TopicViewSet, 'topics')
urlpatterns = router.urls