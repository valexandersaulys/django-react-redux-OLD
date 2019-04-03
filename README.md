# README

This is based on a Traversy Media Post.

https://www.youtube.com/watch?v=Uyei2iDA4Hs

The twist in the idea is to use Django Rest Framework to create an API
and then let Django load a single HTML template, letting React manage
the frontend.

Use `rjsx-mode` within emacs! It does mostly correct syntax
highlighting.

Install
[`react-snippets`](https://github.com/johnmastro/react-snippets.el)
from `package-install`. I've yet to figure it out, but it seems
useful? docs are scant. 


## Order of Operations for REST creation

1. Define Models
2. Define Serializers
3. Define Viewsets
4. Define URLs


## Frontend work

Create a frontend app within django. From this, we'll be putting in
our react js code.

Within this, we'll have a `src`, `static`, and `templates`. The latter
two need to have nested `frontend` folders b/c of how Django works.

`src` will have a `components` folder for holding our raw source
values.

Then we install npm and a host of dependencies

```shell
(.venv) [django-rest-api]$ npm i -D webpack webpack-cli
(.venv) [django-rest-api]$ npm i -D @babel/core babel-loader \
@babel/preset-env @babel/preset-react \
babel-plugin-transform-class-properties \
(.venv) [django-rest-api]$ npm i react react-dom prop-types
```

Following this, we go to `webpack.config.js` and add in new scripts in
addition to modifying our `.babelrc` file. You can see the examples here
for that.

We'll create a basic component in `frontend/src/index.js` to load up
in the html template. We'll also create that in the
`frontend/templates/frontend/index.html`.

Then we can run `npm run build` and build the whole thing. Once we run
`python manage.py runserver`, we can see it works!

To avoid having to rebuild all the time, we'll tack on `--watch`
within out scripts. 



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


## Other Links

[Bootswatch for Bootstrap themes](https://bootswatch.com/)

