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

Add [Redux
Devtools](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
from Firefox!


## Order of Operations for REST creation

1. Define Models
2. Define Serializers
3. Define Viewsets
4. Define URLs


## Frontend work with React

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


## Frontend work with Redux

Order of Building:

  1. reducer with name
  2. action that corresponds to reducer name
  3. connect up reducer with component

Redux helps us keep a single state from which we can read data.

Install with:

```shell
npm i --save redux react-redux redux-thunk redux-devtools redux-devtools-extension
```

Within our `frontend/src` folder, we'll add a file called `store.js`
which will be used to store redux state. Also create a folder called
`reducers`. 

With reducers, we take in an action and then pass down the changes
into our store. We typically store these actions inside of their own
directory called `actions` at the root of `src`. We can use a
`types.js` file here to store all of our actions in one place for
organizational purposes. 

Each file within `actions`, other than `types.js`, will be named by
organizational purpose according to the reducer we created. Here is
where we'll put http requests.

Connecting with our components uses the `connect()` function from
`react-redux`. We use a `mapStateToProp` function to match the redux
state to component properties. This will look like:

```javascript
export default connect(mapStateToProps)(Leads);
```

It seems to be wiser to build out the JSX how you imagine it looking
after loading, _then_ put in what it should look like before loading
or on error.



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

