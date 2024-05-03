# Address API Spec

## Create Address

Endpoint: POST /api/contact/:idContact/addresses

Request Header:
- X-API-TOKEN: Token

Request Body:

```json
{
  "street": "Jalan Apa",
  "city": "Kota Apa",
  "province": "Provinsi Apa",
  "country": "Negara Apa",
  "postal_code": "12345"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota Apa",
    "province": "Provinsi Apa",
    "country": "Negara Apa",
    "postal_code": "12345"
  }
}
```

Response Body (Error):

```json
{
  "errors": "postal_code must not blank, ..."
}
```

## Get Address

Endpoint: GET /api/contact/:idContact/addresses/:idAddress

Request Header:
- X-API-TOKEN: Token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota Apa",
    "province": "Provinsi Apa",
    "country": "Negara Apa",
    "postal_code": "12345"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Address is not found, ..."
}
```

## Update Address

Endpoint: PUT /api/contact/:idContact/addresses/:idAddress

Request Header:
- X-API-TOKEN: Token

Request Body:

```json
{
  "street": "Jalan Apa",
  "city": "Kota Apa",
  "province": "Provinsi Apa",
  "country": "Negara Apa",
  "postal_code": "12345"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota Apa",
    "province": "Provinsi Apa",
    "country": "Negara Apa",
    "postal_code": "12345"
  }
}
```

Response Body (Error):

```json
{
  "errors": "postal_code must not blank, ..."
}
```

## Remove Address

Endpoint: DELETE /api/contact/:idContact/addresses/:idAddress

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
  "errors": "Address is not found, ..."
}
```

## List Address

Endpoint: GET /api/contact/:idContact/addresses

Request Header:
- X-API-TOKEN: Token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 2,
      "street": "Jalan Apa",
      "city": "Kota Apa",
      "province": "Provinsi Apa",
      "country": "Negara Apa",
      "postal_code": "12345"
    },
    {
      "id": 1,
      "street": "Jalan Apa",
      "city": "Kota Apa",
      "province": "Provinsi Apa",
      "country": "Negara Apa",
      "postal_code": "12345"
    }
  ]
}
```

Response Body (Error):

```json
{
  "errors": "Contact is not found, ..."
}
```