from rest_framework import serializers
from .models import Group, Event, UserProfile, Member, Comment, Bet
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# creating serializer models
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'team1', 'team2', 'time', 'score1', 'score2', 'group')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'location', 'description')


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'image', 'is_premium', 'bio')


class UserSerializer(serializers.ModelSerializer):

    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validate_data):
        profile_data = validate_data.pop('profile')
        user = User.objects.create_user(**validate_data)
        UserProfile.objects.create(user=user, **profile_data)
        Token.objects.create(user=user)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Member
        fields = ('user',  'group', 'admin')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('user',  'group', 'description', 'time')


class BetSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Bet
        fields = ('id', 'user',  'event', 'score1', 'score2')


class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('team1', 'team2', 'time', 'group')



# this is third serializer but in python dont use a variable or whatever before declaration, so this group will be last in this code format
class GroupFullSerializer(serializers.ModelSerializer):

    events = EventSerializer(many=True)
    members = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ('id', 'name', 'location', 'description', 'events', 'members', 'comments')

    def get_members(self, obj):
        user_points = []
        members = obj.members.all()
        for member in members:
            points = 0
            member_serialized = MemberSerializer(member, many=False)
            member_data = member_serialized.data
            member_data['points'] = points

            user_points.append(member_data)
        return user_points
    
    def get_comments(self, obj):
        comments = Comment.objects.filter(group=obj).order_by('-time')
        serializer = CommentSerializer(comments, many=True)
        return serializer.data


# same the above case, this is event serializer
class EventFullSerializer(serializers.ModelSerializer):
    bets = BetSerializer(many=True)

    class Meta:
        model = Event
        fields = ('id', 'team1', 'team2', 'time', 'score1', 'score2', 'group', 'bets')