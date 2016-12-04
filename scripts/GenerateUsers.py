import string
import random
import requests
import json

stringSize = 8

for i in range(1, 2000):
    headers = {'content-type': 'application/json'}
    user = "\"user" + str(i) + "\""
    data = "{ \"name\" : " + user + ", \"username\" : " + user + ", \"password\" : " + user + "}"
    requests.post('http://localhost:3000/api/user/', data = data.encode("utf8"), headers = headers)
    print("User %s added to database" % user)