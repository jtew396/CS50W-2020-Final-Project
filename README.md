# Pictures
Pictures is a mobile-responsive web application that is built with a Django backend and React frontend.

## Installation

Installing Django and project libraries
```bash
pip install django
pip install djangorestframework
pip install djangorestframework-jwt
pip install django-cors-headers
pip install django-markdown
pip install django-filter
```

Installing React and project modules using Homebrew
```bash
cd frontend
brew install node
npm install npm@latest -g
npm install react-bootstrap bootstrap
npm install --save react-router-dom
npm install moment --save
```

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

