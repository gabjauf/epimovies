import requests
import json


NotDone = True
i = 1

while NotDone == True:
    try:
        html = requests.get('https://www.omdbapi.com/?s=of&page=' + str(i))
    except requests.exceptions.HTTPError as e:
        print e.message
    parsed = json.loads(html.text) # Loads JSON into usable object

    for movie in parsed['Search']:
        #print(movie)
        movieDetail = requests.get('https://www.omdbapi.com/?i=' + movie['imdbID'])
        print(movieDetail.text)
        headers = {'content-type': 'application/json'}
        requests.post('http://localhost:3000/api/importData', data = movieDetail.text.encode("utf8"), headers = headers)

    NotDone = bool(parsed['Response']) # Gets the parameter Response which tell us if we are done!
    #print("NotDone = " + str(NotDone))
    i += 1 # Increment the page number
    print("i = " + str(i))

print("Done")