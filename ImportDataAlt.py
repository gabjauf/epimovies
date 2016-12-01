import requests
import json
from multiprocessing.pool import ThreadPool
from time import time as timer

Elements = 3789996
Urls = []
for i in range(1, Elements):
    Urls.append("https://www.omdbapi.com/?i=tt" + str(i).zfill(7))


def fetch_urls(url):
    try:
        html = requests.get(url)
        headers = {'content-type': 'application/json'}
        requests.post('http://localhost:3000/api/importData', data = html.text.encode("utf8"), headers = headers)
    except Exception as e:
        print e.message
        return url, e
    return url, None
    #parsed = json.loads(html.text)# Loads JSON into usable object
    #try:
    #    for movie in parsed["Search"]:
    #        movieDetail = requests.get('https://www.omdbapi.com/?i=' + movie['imdbID'])
    #        
    #except Exception as e:
    #    print e.message
    #    return url, e
    #return url, None

start = timer()
results = ThreadPool(200).imap_unordered(fetch_urls, Urls)
for url, error in results:
    if error is None:
        print("%r fetched in %ss" % (url, timer() - start))
    else:
        print("error fetching %r: %s" % (url, error))
print("Elapsed Time: %s" % (timer() - start,))
