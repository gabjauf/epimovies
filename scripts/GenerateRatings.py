import string
import random
import requests
import json

for i in range(1, 2000):
    user = json.loads(requests.get('http://localhost:3000/api/generic/random?table=t_user&limit=1').text)
    movies = json.loads(requests.get('http://localhost:3000/api/generic/random?table=t_movies&limit=50').text.encode("utf8"))
    for movie in movies:
        headers = {'content-type': 'application/json'}
        data = "{ \"movieId\" : " + str(movie["id"]) + ", \"userId\" : " + str(user[0]["id"]) +"}"
        requests.post('http://localhost:3000/api/rating/', data = data.encode("utf8"), headers = headers)
        print("rating for %s added to database" % movie["title"])