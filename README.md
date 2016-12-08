# Epimovies
Application for managing movies

# Dependencies

The project may require you to install as globals:
* gulp
* typescript
* typings

In this case, you should use the command:

`npm i -g <package name>`

The project is also using neo4j, so an instance of this database should be running.

# Pre requisites

The mysql database schema is inside _schema.sql_, you have to import it before starting importing data.

To use neo4j and mysql routes, you first need to provide some data first. For this, we provide a few scripts in the script directory:
* ImportData            -> Imports data from the OMDB API, it takes only the 2016 movies for the moment
* ImportDataAlt         -> Same as previous, but directly asks for the IMDB id. However it takes much longer and gets some very old movies
* GenerateUsers         -> Generate 2000 users
* GenerateRatings       -> To use after generating enough users. Generates 50 random ratings for a random user

# Initialize project

`npm install`     -> Installs the project dependencies
`gulp`            -> Launch the project on port 3000

Access application at "http://localhost:3000"



