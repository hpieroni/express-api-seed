# Express API seed

This is a RESTful API seed project. As an example this API allows you to create users and articles.

## Table of Contents

- [Express API seed](#express-api-seed)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
    - [MongoDB](#mongodb)
    - [Node.js](#nodejs)
  - [Clone repo and install dependencies](#clone-repo-and-install-dependencies)
  - [Start API](#start-api)
  - [Tests](#tests)
  - [Design decisions](#design-decisions)
  - [API Docs](#api-docs)
    - [Models](#models)
      - [User](#user)
      - [Article](#article)
    - [Errors](#errors)
    - [Authentication](#authentication)
    - [Endpoints](#endpoints)
      - [`POST /v1/users`](#post-v1users)
        - [Description](#description)
        - [Request](#request)
        - [Response](#response)
      - [`POST /v1/articles`](#post-v1articles)
        - [Description](#description-1)
        - [Request](#request-1)
        - [Response](#response-1)
      - [`PUT /v1/articles/:id`](#put-v1articlesid)
        - [Description](#description-2)
        - [Request](#request-2)
        - [Response](#response-2)
      - [`DELETE /v1/articles:id`](#delete-v1articlesid)
        - [Description](#description-3)
        - [Request](#request-3)
        - [Response](#response-3)
      - [`GET /v1/articles?tags=tag1,tag2,..,tagn`](#get-v1articlestagstag1tag2tagn)
        - [Description](#description-4)
        - [Request](#request-4)
        - [Response](#response-4)

## Prerequisites

### MongoDB

Make sure that [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) is installed and running in your local machine. If you are use to use [Docker](https://docs.docker.com/install/) you can use this [image](https://hub.docker.com/_/mongo).
_Version: >= 4.0_

### Node.js

Install the latest LTS [Node.js](https://nodejs.org/en/download/) version. If you are using [nvm](https://github.com/nvm-sh/nvm) you can just run `nvm use` in the root folder.

## Clone repo and install dependencies

1. `git clone https://github.com/hpieroni/simple-user-article-api.git`
2. `cd simple-user-article-api`
3. `npm install`

## Start API

In order to start the API you need to configure some ENV variables first. You can do this through an **.env** file (check [.env.example](https://github.com/hpieroni/simple-user-article-api/blob/master/.env.example) ).

| Variable          | Default | Description                                                                                                                                      |
| :---------------- | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT              |  3000   | Port where the server will listen                                                                                                                |
| TOKEN             |         | Authentication token                                                                                                                             |
| DB_CONNECTION_URI |         | Mongo connection URI. _Example:_ `mongodb://localhost:27017/dbTest` See [reference](https://docs.mongodb.com/manual/reference/connection-string) |  |

Finally run `npm start` and check the console for a message similar to:

```
[Database]: connection was successful
[HTTP-Server]: listening on port 3000
```

## Tests

- `npm run test` _runs the test suit_
- `npm run test:coverage` _displays a test coverage report_

## Design decisions

I tried to minimize the amount of libraries in this solution.
Also, I didn't implement any kind of foreign key constraints, that is why the api allows you to create an article whether the user exists or not.

## API Docs

### Models

#### User

| Field  |   Type   |
| ------ | :------: |
| \_id   | ObjectId |
| name   |  String  |
| avatar |   URL    |

#### Article

| Field  |   Type   |
| ------ | :------: |
| \_id   | ObjectId |
| userId | ObjectId |
| title  |  String  |
| text   |  String  |
| tags   | [String] |

### Errors

The shape of an error is:

```
{
  "statusCode": 400,
  "status": "Bad Request",
  "appCode": "INVALID_REQUEST_BODY",
  "message": "Invalid request body",
  "details": {
    "name": "is required",
    "avatar": "must be a valid uri"
  }
}
```

Where:

| HTTP Code | Status Text  | App Code               | Message                               |
| :-------: | :----------- | :--------------------- | :------------------------------------ |
|    400    | Bad Request  | INVALID_REQUEST_BODY   | Invalid request body                  |
|           |              | INVALID_REQUEST_QUERY  | Invalid request querystring           |
|           |              | INVALID_REQUEST_PARAMS | Invalid request route params          |
|    401    | Unauthorized | MISSING_AUTH_HEADER    | Missing Authorization header          |
|           |              | INVALID_AUTH_SCHEMA    | Invalid Authorization header schema   |
|           |              | INVALID_AUTH_TOKEN     | Invalid token in Authorization header |
|    404    | Not Found    | NOT_FOUND              | Requested resource was not found      |
|    500    | Server Error | UNEXPECTED             | Ups! Something went wrong :(          |

Every error can contain a `details` field for more specific information. See the error example above.
By default an Unexpected error will contain a `message` and `error` (the original) y the `details` section.

### Authentication

All endpoints are protected by `Authorization: Bearer <TOKEN>` header.
The token is the one provided in **.env** file.

### Endpoints

#### `POST /v1/users`

##### Description

Creates a new user

##### Request

```
curl -i -X POST -H "Content-Type: application/json" \
 -H "Authorization: Bearer myToken" \
 -d '{"name":"john","avatar":"http://www.avatar.com"}' \
 http://localhost:3000/v1/users
```

##### Response

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "_id": "5e3ad6deaac3ad522a47ad4b",
  "name": "john",
  "avatar": "http://www.avatar.com"
}
```

#### `POST /v1/articles`

##### Description

Creates a new article

##### Request

```
curl -i -X POST -H "Content-Type: application/json" \
 -H "Authorization: Bearer myToken" \
 -d '{"userId":"5e3ad6deaac3ad522a47ad4b","title":"Title","text":"Lorem ipsum","tags":["music","relax"]}' \
 http://localhost:3000/v1/articles
```

##### Response

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "_id": "5e3ad860aac3ad522a47ad4c",
  "userId":"5e3ad6deaac3ad522a47ad4b",
  "title": "Title"
  "tags: ["music","relax"],
  "text": "Lorem ipsum"
}
```

#### `PUT /v1/articles/:id`

##### Description

Updates article of given id

##### Request

```
curl -i -X PUT -H "Content-Type: application/json" \
 -H "Authorization: Bearer myToken" \
 -d '{"userId":"5e3ad6deaac3ad522a47ad4b","title":"T2","text":"Lorem ipsum 2","tags":["nature"]}' \
 http://localhost:3000/v1/articles/5e3ad860aac3ad522a47ad4c
```

##### Response

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "_id": "5e3ad860aac3ad522a47ad4c",
  "userId":"5e3ad6deaac3ad522a47ad4b",
  "title": "T2"
  "tags: ["nature"],
  "text": "Lorem ipsum 2"
}
```

#### `DELETE /v1/articles:id`

##### Description

Deletes article of given id

##### Request

```
curl -i -X DELETE \
 -H "Authorization: Bearer myToken" \
 http://localhost:3000/v1/articles/5e3ad860aac3ad522a47ad4c
```

##### Response

```
HTTP/1.1 204 No Content
```

#### `GET /v1/articles?tags=tag1,tag2,..,tagn`

##### Description

Find articles that contains the given tags

##### Request

```
curl -i -X GET \
 -H "Authorization: Bearer myToken" \
 http://localhost:3000/v1/articles?tags=nature,music,relax
```

##### Response

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "_id": "5e3ad860aac3ad522a47ad4c",
    "userId":"5e3ad6deaac3ad522a47ad4b",
    "title": "T2"
    "tags: ["nature"],
    "text": "Lorem ipsum 2"
  }
]
```
