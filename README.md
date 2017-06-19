# Tetration Postman Custom Authentication and Examples

The Tetration API uses a highly secure digest authentication based on a Public
and Private API key as well as several custom headers.  Thus, in order to leverage
Postman to use the API, you need to set up your Postman requests with a prerequest
script to automatically generate the digest values.  This repository contains
a Postman environment example, a Postman collection (including the authentication script), and the raw javascript which can be used to create your own requests.
