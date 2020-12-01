from django.urls import path, include
from rest_framework.routers import DefaultRouter
from pictures import views
from .views import current_user, UserList


# Create a router and register our viewsets with it.
# router = DefaultRouter()
# router.register(r'posts', views.PostViewSet)
# router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    # path("", views.index, name="index"),
    # path("login", views.login_view, name="login"),
    # path("logout", views.logout_view, name="logout"),
    # path("register", views.register, name="register"),
    # path('api/', include(router.urls)),
    
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]
