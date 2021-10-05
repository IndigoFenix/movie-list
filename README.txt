This is a demo app for managing a list of movies.
It is designed to work locally with a MongoDB database.
node_modules are not included and must be installed for both the frontend and the backend.

The default category and movie list are stored in JSON files in movies-backend/data.
To populate the movie list, call POST localhost:3000/api/populate from Postman (not included in the frontend). (This is for demo purposes only and has no security.)
Most other API calls will not work without a user_id and token in the header.
Logins are stored in a persistent object on the backend. In a real project, this would use Redis.

To create a new user, click the Sign Up button on the login screen.
To add a movie, you must have a valid IMDB link and a valid image URL to use as the poster.