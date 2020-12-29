from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, PostSerializer, PostListSerializer, LikeSerializer, LikeListSerializer, FollowSerializer, FollowListSerializer
from .models import Post, Like, Follow


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        posts = User.objects.all()
        serializer = UserSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """

    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostList(APIView):
    """
    Create a new post. It's called 'PostList' because normally we'd have a get
    method here too, for retrieving a list of all Post objects.
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        posts = Post.objects.all()
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        print('We posted.')
        print('This is the data: ')
        print(request.data)
        print('This is the user: ')
        print(request.user)
        print('This is the user id: ')
        print(request.user.id)
        data = request.data
        data['created_by'] = request.user.id
        print('This is the data: ')
        print(data)
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        print('We went to perform create')
        serializer.save(created_by=self.request.user)


class PostDetail(APIView):
    """
    Retrieve, update or delete a post instance.
    """
    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def likes(self, pk):
        try:
            return Like.objects.filter(post=self).cound()
        except Like.DoesNotExist:
            raise Http404

    def user_liked(self, request, pk):
        try:
            if Like.objects.filter(post=self, created_by=request.user) == 1:
                return True
            else:
                return False
        except Like.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LikeList(APIView):
    """
    Create a new like. It's called 'LikeList' because normally we'd have a get
    method here too, for retrieving a list of all Like objects.
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        likes = Like.objects.all()
        serializer = LikeListSerializer(likes, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        print('We posted.')
        print('This is the data: ')
        print(request.data)
        print('This is the user: ')
        print(request.user)
        print('This is the user id: ')
        print(request.user.id)
        data = request.data
        data['created_by'] = request.user.id
        print('This is the data: ')
        print(data)
        serializer = LikeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LikeDetail(APIView):
    """
    Retrieve, update or delete a like instance.
    """

    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        try:
            return Like.objects.get(pk=pk)
        except Like.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        like = self.get_object(pk)
        serializer = LikeSerializer(like)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        like = self.get_object(pk)
        serializer = LikeSerializer(like, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        like = self.get_object(pk)
        like.delete()
        return

class FollowList(APIView):
    """

    """

    def get(self, request, format=None):
        follows = Follow.objects.all()
        serializer = FollowListSerializer(follows, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        data['created_by'] + request.user.id
        serializer = FollowSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Reesponse(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FollowDetail(APIView):
    """
    Retrieve, update or delete a follow instance.
    """

    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        try:
            return Follow.objects.get(pk=pk)
        except Follow.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        follow = self.get_object(pk)
        serializer = FollowSerializer(follow)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        follow = self.get_object(pk)
        serializer = FollowSerializer(follow, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        follow = self.get_object(pk)
        follow.delete()
        return
