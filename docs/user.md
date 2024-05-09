# User API Spec

## Register User

Endpoint: POST /api/users/register

Request Body:

```json
{
  "username": "mhaatha",
  "password": "rahasia",
  "name": "Hafidz Athaya"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "mhaatha",
    "name": "Hafidz Athaya"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "mhaatha",
  "password": "rahasia"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "mhaatha",
    "name": "Hafidz Athaya",
    "token": "uuid"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint: GET /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "username": "mhaatha",
    "name": "Hafidz Athaya"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "password": "rahasia", // Tidak wajib
  "name": "Hafidz Athaya" // Tidak wajib
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "mhaatha",
    "name": "Hafidz Athaya"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint: DELETE /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Error):

```json
{
  "errors": "Unauthorized, ..."
}
```