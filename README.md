# README

This is based on a Traversy Media Post.

https://www.youtube.com/watch?v=Uyei2iDA4Hs

The twist in the idea is to use Django Rest Framework to create an API
and then let Django load a single HTML template, letting React manage
the frontend.


## Order of Operations

1. Define Models
2. Define Serializers
3. Define Viewsets
4. Define URLs


## Terms

### Serializers

These allow for complex data, querysets and models, to be converted
into python datatypes which are then rendered into JSON.


## Viewsets

These build-in CRUD type operations for us.

[Link to Official Documentation](https://www.django-rest-framework.org/api-guide/viewsets/)


## Routers

These provide built-in functionality for automatically determining how
the URLs for an application should be mapped to the logic that deals
with handling incoming requests.

[Link to docs](https://www.django-rest-framework.org/api-guide/routers/)

