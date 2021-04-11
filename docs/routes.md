# Currently, in development. Please see the dev branch (and others)

### Data returned should always include:

```ts
interface IReturnGenericData {
  error: null | string | object | object[];
  success: boolean;
}
```

Note: `This project uses express-validator, if you wish to get a better understanding of it's return value please refer to it's` [documentation](https://express-validator.github.io/docs/validation-chain-api.html)

Routes:

## `api/login`

**HTTP method**: `GET`

**Description**:

This route will re-route you towards auth0 were the user can the login and will then be redirecrted back to the site's default domain.

## `api/tickets/new`

**HTTP method**: `POST`

**Description**:

This route creates a new ticket and get's put in the default data pool.

**Example request body**:

```json
{
  // Author expects a valid id of the the account that created the ticket
  "authorId": "github|16852656",
  // Body takes in a valid string expects linebreaks to be \n"s (this is default when sending data from a text input in a form)
  "text": "This is a long string that I wrote back in highschool"
}
```

**Example response body for a successful ticket creation**:

```json
{
  "success": true,
  "errors": null,
  "data": {
    "assignee": null,
    "createdAt": "2021-04-11T15:08:40.086Z",
    "isStarred": false,
    "tags": [],
    "labels": [],
    "rating": null,
    "isUpdated": true,
    "messages": [
      {
        "authorId": "github|16852656",
        "text": "Hi!\n I Need assistance with adding some configs, as I as appear to be receiving the attached error when doing so!"
      }
    ],
    "notes": [],
    "personnelView": [
      {
        "authorId": "github|16852656",
        "text": "Hi!\n I Need assistance with adding some configs, as I as appear to be receiving the attached error when doing so!"
      }
    ],
    "_id": "607310f858e6ef001ecff89c"
  }
}
```

Note: `In upcoming editions of this route the route will return slightly diffirent data depending on whom is viewing it i.e. if you're from staff or an end-user. Currently the notes are exposed to the end-user`

## `api/tickets/reply`

**HTTP method**: `PATCH`

**Description**:

This route is intended to update the ticket with a new message/reply (this can be used for any user that is included in the message)

**Example JSON request body**:

```json
{
  "id": "607310f858e6ef001ecff89c",
  "authorId": "github|16852656",
  "text": "Hi,\nThanks for looking into this matter but I was able to solve it after sending the ticket!\nBest regards,"
}
```

**Example JSON response body**:

```json
{
  "success": true,
  "errors": null,
  "data": {
    "_id": "607310f858e6ef001ecff89c",
    "authorId": "github|16852656",
    "author": "Eddie Englund",
    "assignee": null,
    "createdAt": "2021-04-11T15:08:40.086Z",
    "isStarred": false,
    "tags": [],
    "labels": [],
    "rating": null,
    "isUpdated": true,
    "messages": [
      {
        "authorId": "github|16852656",
        "text": "Hi!\n I Need assistance with adding some configs, as I as appear to be receiving the attached error when doing so!"
      },
      {
        "authorId": "github|16852656",
        "text": "Hi, \nIs there any update on this matter,it&#x27;s quite urgent for us!"
      }
    ],
    "notes": [],
    "personnelView": [
      {
        "authorId": "github|16852656",
        "text": "Hi!\n I Need assistance with adding some configs, as I as appear to be receiving the attached error when doing so!"
      }
    ]
  }
}
```
