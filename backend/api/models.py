from django.db import models

class DadosConsumo(models.Model):
    user_id = models.IntegerField(unique=True)
    age = models.IntegerField()
    reels_watch_time_hours = models.FloatField()
    daily_screen_time_hours = models.FloatField()
    sleep_hours = models.FloatField()
    attention_span_score = models.IntegerField() # Escala 1-10
    focus_level = models.IntegerField()          # Escala 1-10
    task_completion_rate = models.FloatField()   # 0-100
    stress_level = models.CharField(max_length=10) # Low, Medium, High
    platform = models.CharField(max_length=50)     # Instagram Reels, etc.

    def __str__(self):
        return f"User {self.user_id} - {self.platform}"