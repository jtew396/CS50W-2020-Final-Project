from django.db import models

class Post(models.Model):
    owner = models.ForeignKey(
        'auth.User',
        related_name='posts',
        on_delete=models.CASCADE
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']
