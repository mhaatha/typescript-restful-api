# Contact API Spec

## Create Contact

Endpoint: POST /api/contacts

Request Header:
- X-API-TOKEN: Token

Request Body:

```json
{
  "first_name": "Hafidz",
  "last_name": "Athaya",
  "email": "hafidz.athaya@example.com",
  "phone": "081234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Hafidz",
    "last_name": "Athaya",
    "email": "hafidz.athaya@example.com",
    "phone": "081234567890"
  }
}
```

Response Body (Error):

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Get Contact

Endpoint: GET /api/contacts/:id

Request Header:
- X-API-TOKEN: Token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Hafidz",
    "last_name": "Athaya",
    "email": "hafidz.athaya@example.com",
    "phone": "081234567890"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Contact is not found, ..."
}
```

## Update Contact

Endpoint: PUT /api/contacts/:id

Request Header:
- X-API-TOKEN: Token

Request Body:

```json
{
  "first_name": "Hafidz",
  "last_name": "Athaya",
  "email": "hafidz.athaya@example.com",
  "phone": "081234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Hafidz",
    "last_name": "Athaya",
    "email": "hafidz.athaya@example.com",
    "phone": "081234567890"
  }
}
```

Response Body (Error):

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Remove Contact

Endpoint: DELETE /api/contacts

Request Header:
- X-API-TOKEN: Token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Error):

```json
{
  "errors": "Contact is not found, ..."
}
```

## Search Contact

Endpoint: GET /api/contacts

Query Parameter: 
- name: string, contact first_name or contact last_name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request Header:
- X-API-TOKEN: Token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Hafidz",
      "last_name": "Athaya",
      "email": "hafidz.athaya@example.com",
      "phone": "081234567890"
    },
    {
      "id": 2,
      "first_name": "Athaya",
      "last_name": "Hafidz",
      "email": "athaya.hafidz@example.com",
      "phone": "089213123133"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Error):

```json
{
  "errors": "Unauthorized, ..."
}
```