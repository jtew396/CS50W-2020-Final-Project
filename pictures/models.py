from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    content = models.TextField()
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now=True)

    def likes(self):
        return Like.objects.filter(post=self).count()

    def user_liked(self, user):
        print('This is the user')
        print(user)
        if Like.objects.filter(post=self, created_by=user).count() == 1:
            return True
        else:
            return False

class Like(models.Model):
    post = models.ForeignKey(
        'Post',
        on_delete=models.CASCADE
    ) # Some kind of int for the post id
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    ) # the username of the liker or user_id
    created_at = models.DateTimeField(auto_now=True) # some date time for this guy'

class Follow(models.Model):
    followee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='followee'
    )
    follower = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='follower'
    ) # the username id of
    created_at = models.DateTimeField(auto_now=True) # some dat time for this follow
