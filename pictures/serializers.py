from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework.fields import CurrentUserDefault
from django.core import serializers as core_serializer
from django.contrib.auth.models import User
from .models import Post, Like, Follow


class UserSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()
    followees = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    def get_posts(self, obj):
        posts = Post.objects.filter(created_by=obj).order_by('created_at').reverse().values()
        return posts
    
    def get_followees(self, obj):
        followees = Follow.objects.filter(follower=obj).count()
        return followees

    def get_followers(self, obj):
        followers = Follow.objects.filter(followee=obj).count()
        return followers

    class Meta:
        model = User
        fields = ['id', 'username', 'posts', 'followees', 'followers']
        depth = 1


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'

class PostListSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()
    created_by_username = serializers.SerializerMethodField()
    # user_liked = serializers.SerializerMethodField()

    def get_likes(self, obj):
        likes = Like.objects.filter(post=obj).count()
        return likes
    
    def get_user_liked(self, obj):
        user = None
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            print(user)
            print(user.id)
            print(obj.user_liked(user.id))
            print(obj.id)
            return obj.user_liked(user.id)
        else:
            return False

    def get_created_by_username(self, obj):
        created_by_username = User.objects.get(post=obj)
        return created_by_username.username

    # def get_user_liked(self, obj):
    #     print('This is the self: ')
    #     print(self)
    #     # if Like.objects.filter(post=obj, created_by=self.request.user.id):
    #     #     return True
    #     # else:
    #     #     return False
    #     return False

    class Meta:
        model = Post
        fields = '__all__'
        # depth = 1

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'

class LikeListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'
        depth = 1

class FollowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Follow
        fields = '__all__'

class FollowListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Follow
        fields = '__all__'
        depth = 1
