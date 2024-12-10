from django.contrib import admin
from .models import Group, Event, UserProfile, Member, Comment, Bet

# Register your models here.
@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    fields = ('name', 'location', 'description')
    list_display = ('id', 'name', 'location', 'description')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    fields = ('team1', 'team2', 'time', 'score1','score2','group')
    list_display = ('team1', 'team2', 'time', 'score1', 'score2', 'group')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    fields = ('user', 'image', 'is_premium', 'bio')
    list_display = ('id', 'user', 'image', 'is_premium')

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    fields = ('user', 'group', 'admin')
    list_display = ('user', 'group', 'admin')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    fields = ('user', 'group', 'description')
    list_display = ('user', 'group', 'description', 'time')

@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
    fields = ('user', 'event', 'score1', 'score2')
    list_display = ('id', 'user', 'event', 'score1', 'score2')