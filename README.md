# Capstone

My capstone is a mobile-responsive web application that is built with a Django backend and React frontend. This application allows skaters to save their favorite skate spots around their neighborhood.

This project is modeled after the following project by leighhalliday: https://github.com/leighhalliday/google-maps-react-2020


## Distinctiveness & Complexity Requirements

This project satisfies the distinctiveness and complexity requirements by implementing a React frontend with a Django backend. This requires writing declarative programming in JavaScript to make AJAX requests to the backend Django server and updating the DOM accordingly. Partitioning the frontend and backend into separate frameworks has increased the complexity of the application. While interfacing between the two frameworks is particularly challenging, this yields a greater depth of functionality for the end user. Interactivity and responsiveness is enabled with the React frontend while the Django backend provides a straightforward REST API for long-term data storage.


## What's Contained in Each File

The bulk of the `frontend` React framework is in the `finalproject\frontend\src\App.js` file. Within this file are multiple functions that render the Google Maps API, allow for skate spot marker creation upon clicking on the map, search and geolocation for finding places on the map, and a locator that finds the coordinates of the user's browser. Upon decreasing the size of the screen for mobile users, the logo and search box change accordingly based upon the code in the `index.css` file.

The bulk of the `backend` Django framework is contained in the `finalproject\skatespots` folder. The most important files within this folder are the `models.py`, `serializers.py`, `urls.py`, and `views.py` files. Within the `models.py` file is the `Spot` class that contains the latitude, longitude, and created_at fields for tracking saved skate spots. The `serializers.py` file houses the SpotSerializer class that is a Django REST framework object for serializing the Spot model - this allows for the easy conversion of the Python datatypes into JSON, XML or other content types that can be rendered by the API. The `urls.py` file contains the URL patterns for the skatespots app. The two URLs are the `spots/` path, for viewing and managing the skate spots, and the `spot/<int:pk>/` path, for accessing and updating the details about a skate spot. The `views.py` file contains the Django view object classes for navigating the particular routes. The `SpotList` class uses the `SpotSerializer` and corresponds to the `spots/` route and has a get and post function. The `SpotDetail` class also uses the `SpotSerializer` and corresponds to the `spot/<int:pk>/` route and has get_object, get, put, and delete functions.


## Installation

Installing Django and project libraries
```bash
pip install django
pip install djangorestframework
pip install django-markdown
pip install django-filter
```

Installing React and project modules using Homebrew
```bash
cd frontend
brew install node
npm install npm@latest -g
npm install @react-google-maps/api
npm install use-places-autocomplete
npm install @reach/combobox
```


## API Keys

Before running and testing the application, you must create an `apiKeys.js` file within your src folder in the frontend directory. Your file should look like the following:
```js
var apiConfig = {
    googleKey: '<Your API Key>'
}

export default apiConfig;
```

You will need to create a Google Map API key and insert it into the `apiKeys.js` file. Make sure that the following services are enabled:
- Maps JavaScript API
- Places API
- Geocoding API


## Starting the Application

In order to run and test the application you must start the Django REST server and run the React app.

Starting the Django REST server.
```bash
python manage.py runserver
```

Running the React app.
```bash
cd frontend
npm start
```


## requirements.txt

Aside from the `requirements.txt` file in the base `finalproject` directory for the Django packages, there is also a `requirements.txt` file in the `frontend` directory for the npm packages.
