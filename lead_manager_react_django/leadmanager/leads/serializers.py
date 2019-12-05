from rest_framework import serializers
from leads.models import Lead, Topic

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    leads = LeadSerializer(many=True, read_only=True)
    class Meta:
        model = Topic
        fields = '__all__'