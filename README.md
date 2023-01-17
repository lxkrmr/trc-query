# typed-rest-client and query parameters

Today we learned that the [typed-rest-client](https://github.com/microsoft/typed-rest-client) does **not** support query parameters for the following http verbs:

* POST
* PATCH
* PUT

To verify this behaviour one can use this simple Nest.JS application.

1. start the application via `npm run start:dev`
2. use `requests.http` to fire a request against the GET, POST, PATCH, PUT and DELETE endpoint
3. verify the response
4. optional: open `AppController` to see that each endpoint is using typed-rest-client to call another endpoint with a given query param.

If type-rest-client supports query params for the given HTTP verb then one will get a response like this:

```JSON
{
  "message": "When one does a DELETE request via type-rest-client then the query param is: myNiceQueryParam"
}
```

Otherwise, one will see that the query param is undefined:

```JSON
{
"message": "When one does a POST request via type-rest-client then the query param is: undefined"
}
```

# PS

## good news

The Github user [ajuanjojjj](https://github.com/ajuanjojjj) created a [PR](https://github.com/microsoft/typed-rest-client/pull/301) to support query parameters for POST, PATCH and PUT as well.

## bad news

This PR is open since **Oct 7, 2021**