from rest_framework import permissions, viewsets
from leads.models import Lead, Topic
from .serializers import LeadSerializer, TopicSerializer

# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()
    # only gets leads corresponding to the user
    # def get_queryset(self):
    #     return self.request.user.leads.all()

    # allows us to save the lead owner when we create the lead
    def perform_create(self, serializer):
        # print(self.request.user)
        serializer.save(owner = self.request.user)
        # serializer.save(topic = self.request.data['topic'])

# Lead Viewset
class TopicViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()
    # only gets leads corresponding to the user
    # def get_queryset(self):
    #     return self.request.user.leads.all()

    # allows us to save the lead owner when we create the lead
    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)
