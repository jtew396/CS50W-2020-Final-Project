from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from .serializers import UserSerializer, UserSerializerWithToken, PostSerializer, PostListSerializer, LikeSerializer, LikeListSerializer, FollowSerializer, FollowListSerializer
from .models import Post, Like, Follow
from .pagination import PaginationHandlerMixin
import json


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

class UserDetailByUsername(APIView):
    """
    Retrieve, update or delete a user instance.
    """

    permission_classes = (permissions.AllowAny,)

    def get_object(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, username, format=None):
        user = self.get_object(username)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, username, format=None):
        user = self.get_object(username)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username, format=None):
        user = self.get_object(username)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostList(APIView, PaginationHandlerMixin):
    """
    Create a new post. It's called 'PostList' because normally we'd have a get
    method here too, for retrieving a list of all Post objects.
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        posts = Post.objects.all().order_by('created_at').reverse()
        print('We made it to the get route of post list')
        print(request)
        created_by = request.GET.get('created_by', '')
        print(created_by)
        if created_by:
            user = None
            if User.objects.filter(id=created_by).count() == 1:
                user = User.objects.get(id=created_by)
            posts = posts.filter(created_by=user)
        # if created_by:
        #     print('Did we make it past created_by')
        #     user = User.objects.get(id=created_by)
        #     posts = posts.filter(created_by=user)
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = PostListSerializer(result_page, many=True)
        return Response({
            'links': {
                'next': paginator.get_next_link(),
                'previous': paginator.get_previous_link()
            },
            'data': serializer.data
        })


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

    @property
    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)


class PostDetail(APIView):
    """
    Retrieve, update or delete a post instance.
    """

    permission_classes = (permissions.AllowAny,)

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
        print(request.data)
        post_id = request.data['post_id']
        if Post.objects.filter(pk=post_id).count() == 1:
            p = Post.objects.get(pk=post_id)
            if Like.objects.filter(post=p, created_by=request.user.id).count() == 0:
                l = Like(
                    post=p,
                    created_by=request.user
                )
                l.save()
                return HttpResponse('Liked')
            else:
                l = Like.objects.get(post=p, created_by=request.user)
                if l.delete():
                    return HttpResponse('Unliked')
                else:
                    return HttpResponse('Error')
        else:
            return HttpResponse('Error')

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
