# Weather Forecast Application

The application allows users to search for cities and view current weather conditions as well as a 5-day weather forecast. The application also stores the three most recently viewed cities and logs user actions through a Node.js backend.

## Features

### Frontend

* Search cities using a searchable dropdown
* Display current weather information
* Display a 5-day weather forecast
* Save 3 most viewed cities using Local Storage
* Suggest recently viewed cities
* Responsive design for different screen sizes

### Backend

* Log user actions to the console
* Display selected city and timestamp
* REST API built with Express.js

## Technologies Used

### Frontend

* React
* Bootstrap
* SCSS

### Backend

* Node.js
* Express.js

### Weather API

* Open-Meteo API

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd weather-app
```

### Run the backend

```bash
cd backend
npm install
npm start
```

The backend server will run on:

```text
http://localhost:3001
```

### Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend application will run on:

```text
http://localhost:5173
```

## API Endpoint

### Log city selection

```http
POST /api/log/city-selected
```

## Implemented Requirements

* Responsive layout
* Searchable city dropdown
* Storage of 3 most viewed cities
* Suggestions of recently viewed cities
* Current weather conditions
* 5-day weather forecast
* Backend logging of user actions

## Author

Mariia Kulyk