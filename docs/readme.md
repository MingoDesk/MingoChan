# MingoChan's API documentation

- [The API's flow](./flow.md)
- [Routes and data](./routes.md)

## Stuff needed to run the application:

Docker and a .env file

Example:

```.env
# This desides what port the application will listen on
PORT = 1928

# The name of the databse (First letter must be capital)
DB_NAME = MingoChan

# The URI to the databse. Note that it should be called the same as the above value (First letter must be capital) and URI should follow this format: mongo://<dockerip>:27017/<dbname>
MONGO_URI = mongodb://database:27017/MingoChan?authSource=admin

# The URI to the key value session storage. URI should follow this format: redis://<dockerip>:6379/0
REDIS_URI = redis://redis:6379/0

# Long string that can't be easily forced, you can use command openssl rand -hex 32 in the command line to get a suitable string
SESSION_SECRET = 7f32646406ea61a3f61b2801b98d8f6ed69e35bbfc2c29c92e3742a0e25f8b2f

# The name of the instance
INSTANCE_NAME = MingoChan-1

# Environment. The only "Real" value here is Production and should only set when deploying for prod. As it may cause issues for local testing
NODE_ENV = DEV


CLIENT_ID = SiyRIkzp0efZ4JhZgpjfS6USOme1XhJA
BASEURL = http://localhost:1928

# Long string that can't be easily forced, you can use command openssl rand -hex 32 in the command line to get a suitable string or run node -e "console.log(crypto.randomBytes(32).toString('hex'))"
SECRET = LMgZLR5fKJEkxKr4ndvHXfuRL5MnMbWwkh-kJL0bM80fvwY3W_2bJ5VEemBguXvt

# The URL provided by auth0 under the "applications --> applications --> name of application" in the auth0 portal
ISSUER_BASEURL = dev-v22cwv36.eu.auth0.com

# The session lifetime in hours
SESSION_LIFETIME = 128000

# This represents the URL/Domain of which the front-end application is running. To know where to redirect to after the login.
BASE_REDIRECT_URL = http://localhost:8080/

# The ID of the organisation running on this instance

ORGANISATIONID = 1eff307b-c25c-4c43-83c0-1752b2ebd7c2
```

`Note that if one of the variables are missing the program will let you know on boot and cannot boot without all the .env variables being set`
