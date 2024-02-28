from django.db import models
from users.models import User


# Create your models here.
class Movie(models.Model):
    LANGUAGE_CHOICES = (
        ("English", "ENGLISH"),
        ("Hindi", "HINDI"),
        ("Tamil", "TAMIL"),
        ("Telugu", "TELUGU"),
    )

    name = models.CharField(max_length=250)
    description = models.TextField()
    image = models.URLField(max_length=10000)
    director = models.CharField(max_length=250)
    actors = models.CharField(max_length=250)
    release_date = models.DateField(blank=True, null=True)
    genre = models.CharField(max_length=250)
    language = models.CharField(
        max_length=50, choices=LANGUAGE_CHOICES, default="ENGLISH"
    )
    rating = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.name


class Theatre(models.Model):
    name = models.CharField(max_length=250)
    city = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    phone = models.CharField(max_length=100)
    website = models.URLField(max_length=500, null=True, blank=True)
    movies = models.ManyToManyField(Movie)

    def __str__(self) -> str:
        return f"{self.name} - {self.city}"


class Seat(models.Model):
    name = models.CharField(max_length=250)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.SET_NULL, null=True, blank=True)
    row = models.IntegerField()
    col = models.IntegerField()
    is_reserved = models.BooleanField(default=False)
    price = models.FloatField()

    def __str__(self) -> str:
        return f"{self.name} - {self.theatre.name} - {self.theatre.city}"


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    date = models.DateTimeField()
    price = models.FloatField()
    is_paid = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.name} - {self.movie.name} - {self.theatre.name} - {self.seat.name}"


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    seat = models.ManyToManyField(Seat)
    date = models.DateTimeField()
    price = models.FloatField()
    is_paid = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.name} - {self.movie.name} - {self.theatre.name}"
