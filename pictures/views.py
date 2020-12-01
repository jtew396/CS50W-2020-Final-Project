from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view, action, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.reverse import reverse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, UserSerializerWithToken, PostSerializer
from .models import Post
from .permissions import IsOwnerOrReadOnly

def index(request):
    return render(request, "pictures/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "pictures/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "pictures/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "pictures/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "pictures/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "pictures/register.html")

# @api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
# def api_root(request, format=None):
#     return Response({
#         'user': unicode(request.user),
#         'auth': unicode(request.auth),
#         'users': reverse('user-list', request=request, format=format),
#         'posts': reverse('post-list', request=request, format=format)
#     })

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     This viewset automatically provides `list` and `detail` actions.
#     """
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class PostViewSet(viewsets.ModelViewSet):
#     """
#     This viewset automatically provides `list`, `create`, `retrieve`,
#     `update` and `destroy` actions.
#     """
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly,
#                           IsOwnerOrReadOnly]

#     # @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
#     # def highlight(self, request, *args, **kwargs):
#     #     snippet = self.get_object()
#     #     return Response(snippet.highlighted)

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)


# I don't know what I'm doing I feel like I've done the same thing over 10 times
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data.
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
