# README

This is based on a Traversy Media Post.

https://www.youtube.com/watch?v=Uyei2iDA4Hs


__[To-do](https://www.youtube.com/watch?v=Fia-GGgHpK0)__


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
  2. action that corresponds to reducer name -- one for one match
  3. connect up reducer with component

Redux helps us keep a single state from which we can read
data. Components trigger actions, which _dispatch_ reducers resulting
in changes to state. 

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


### Alerts

_Note: I wasn't a believe in these, but after completing the tutorial
I've come to think they're essential for a good frontend._

Alert handling is done with the
[`react-alerts`](https://github.com/schiehll/react-alert) library.

Within our `src/layouts` folder, we create an `Alerts.js` file. This
file contains a fragment (it has no layout -- that's handled by
_react-alerts_), which is wrapped with `withAlert()(Alerts)`. This
gives us `alert` withint `this.props`.

Then, in our main app, we import a few things at the header top

```javascript
/* src/components/App.js */
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';

//...

<Provider store={store}>   //this original Provider from react-redux
  <AlertProvider template={AlertTemplate} {...alertOptions}>
    <Fragment>
      <Header/>
      <Alerts/>  // <-- what we need to add
      // ...
    </Fragment>
  </AlertProvider>
</Provider>
//  ...
```

Now our alerts get improted into our app.

Whenever an error occurs, we'll need to `dispatch` it to the redux
reducer and trigger the appropriate action. Our action will be called
`GET_ERRORS` to start. Instead of console logging the error, we'll be
calling `dispatch({ type: GET_ERRORS, payload: errors })`, which is
already imported via redux (I think?).

Back in our `components/layout/Alerts.js` file, we can add new error
handling by looking at component lifecycle information. Our component,
has access to `prevProps` inside of `componentDidUpdate(...)`. We can
compare the error at the moment in `this.props` with the `prevProps`
error. If they differ, we can call `this.props.alert` -- which comes
from `withAlert()(...)` -- and return a popup error.

Our error has multiple keys associated with it: _name_ and _email_. If
we have a _name_ error, then we can call a different alert from if we
have an _email_ error. This hardcodes the message, which isn't
necesarily preferable. Using backticks this is improved.

On our Form component, we want it to clear when we add a new lead. We
can do that by changing the state with `this.setState` on the
`onSubmit` function.


## Authentication [Video 5]

Now we go back to the Django application to secure it. 

We'll go to our models and add in our User model, located in
`django.contrib.auth.models`.

```python
...

from django.contrib.auth.models import User


class Lead(models.Model):
    # *** to secure our model so only appropriate users can see
    owner = models.ForeignKey(User,
                              related_name='leads',
                              on_delete=models.CASCADE,  # what happens we delete a user
                              null=True)  # we can have null values
    ...
```

Then we migrate everything.

Going to our `api.py` file, we can change the permission classes
listed within our viewset.

```python
# View
class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LeadSerializer

    # what we query for 
    def get_queryset(self):
        """only get the leads of the user"""
        return self.request.user.leads.all()

    # what happens we create a new lead
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
```

Now we'll need to catch errors that come up -- we'll get a 403 if we
run now. This will be a new action called `returnError`, which we'll
also use to condense other work we've done sending errors.

Django will need a registration API to login. We'll do this at the end
of our middleware using a django extension called
[knox](https://github.com/James1345/django-rest-knox). We'll also add
a `REST_FRAMEWORK` variable to store auth class info.

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'leads.apps.LeadsConfig',
    'frontend.apps.FrontendConfig',
    'rest_framework',
    'knox',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication')
}
```

We'll need a new app for managing accounts. This will be our API
endpoint for logging in.

Create `accounts/serializers.py` file. This will be a serializer like
before, but more indepth for user. 






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

