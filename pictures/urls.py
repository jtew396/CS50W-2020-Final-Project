from django.urls import path
from .views import current_user, UserList, UserDetail, PostList, PostDetail, LikeList, LikeDetail, FollowList, FollowDetail, UserDetailByUsername

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('user/<int:pk>/', UserDetail.as_view()),
    path('user/<str:username>/', UserDetailByUsername.as_view()),
    path('posts/', PostList.as_view()),
    path('post/<int:pk>/', PostDetail.as_view()),
    path('like/<int:pk>', LikeDetail.as_view()),
    path('likes/', LikeList.as_view()),
    path('follow/<int:pk>', FollowDetail.as_view()),
    path('follows/', FollowList.as_view())
]
