from django.shortcuts import render
from django.contrib.auth.models  import User
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from .models import Group, Event, UserProfile, Member, Comment, Bet
from .serializers import GroupSerializer, EventSerializer, GroupFullSerializer, UserSerializer,UserProfileSerializer, ChangePasswordSerializer, MemberSerializer, CommentSerializer, EventFullSerializer, BetSerializer, EventCreateSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from django.utils import timezone

# Create your views here.
class GroupViewset(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GroupFullSerializer(instance, many=False, context={'request': request})
        return Response(serializer.data)
    

class EventViewset(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = EventFullSerializer(instance, many=False, context={'request': request})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = EventCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                "message": "Event created successfully",
                "data": serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
        # Combine the message and the errors into a single dictionary
            response_data = {
                "message": "Error, Event not created",
                "errors": serializer.errors
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key = response.data['token'])
        user = User.objects.get(id = token.user_id)
        user_serializer = UserSerializer(user, many=False)
        return Response({'token': token.key, 'user': user_serializer.data})


class UserProfileViewset(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(methods=['PUT'], detail=True, serializer_class=ChangePasswordSerializer, permission_classes=[IsAuthenticated])
    def change_password(self, request, pk):
        # user = User.objects.get(pk=pk)
        # serializer = ChangePasswordSerializer(data=request.data)

        # if serializer.is_valid():
        #     if not user.check_password(serializer.data.get('old_password')):
        #         return Response({'message': 'Invalid Old Password'}, status=status.HTTP_400_BAD_REQUEST)
        #     user.set_password(serializer.data.get('new_password'))
        #     user.save()
        #     return Response({'message': 'Password Updated Successfully'}, status=status.HTTP_200_OK)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            try:
                user = User.objects.get(pk=pk)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            if user.check_password(old_password):
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MemberViewset(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


    @action(methods=['POST'], detail=False)
    def join(self, request):
        if 'group' in request.data and 'user' in request.data:
            try:
                group = Group.objects.get(id=request.data['group'])
                user = User.objects.get(id=request.data['user'])

                member = Member.objects.create(group=group, user=user, admin=False)
                serializer = MemberSerializer(member, many=False)
                response = {'message':'Joined group successfully', 'results':serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                response = {'message':'Cannot join, Try again'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message':'Wrong Params, Try again'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
    
    @action(methods=['POST'], detail=False)
    def leave(self, request):
        if 'group' in request.data and 'user' in request.data:
            try:
                group = Group.objects.get(id=request.data['group'])
                user = User.objects.get(id=request.data['user'])

                member = Member.objects.get(group=group, user=user)
                member.delete()
                response = {'message':'Left group successfully'}
                return Response(response, status=status.HTTP_200_OK)
            except:
                response = {'message':'Cannot leave from group, Try again'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message':'Wrong Params, Try again'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class CommentViewset(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    

class BetViewset(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def update(self, request, *args, **kwargs):
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(detail=False, methods=['POST'], url_path='place_bet')
    def place_bet(self, request):
        if 'event' in request.data and 'scoreHome' in request.data and 'scoreAway' in request.data:
            event_id = request.data['event']
            event = Event.objects.get(id=event_id)

            # check if user in group
            in_group = self.checkIfUserInGroup(event, request.user)

            # Convert current time to aware datetime
            now_aware = timezone.now()

            if event.time > now_aware  and in_group:
                score1 = request.data['scoreHome']
                score2 = request.data['scoreAway']

                try:
                    # Update bet
                    my_bet = Bet.objects.get(event=event_id, user=request.user.id)
                    my_bet.score1 = score1
                    my_bet.score2 = score2
                    my_bet.save()
                    serializer = BetSerializer(my_bet, many=False)
                    response = {"message": "Bet updated successfully", "new": False, "result": serializer.data}
                    return Response(response, status=status.HTTP_200_OK)
                except:
                    # Post bet
                    my_bet = Bet.objects.create(event=event, user=request.user, score1=score1, score2=score2)
                    serializer = BetSerializer(my_bet, many=False)
                    return Response({"message": "Bet Placed Successfully", "new": True, "result": serializer.data}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Sorry!, you cant place bet. Time out'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Wrong Params'}, status=status.HTTP_400_BAD_REQUEST)
        
    def checkIfUserInGroup(self, event, user):
        try:
            return Member.objects.get(user=user, group=event.group)
        except:
            return False