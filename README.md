#  Airline Voucher Seat Assignment Application

A modern web application built for an airline promotional campaign. This tool allows crew members to randomly assign 3 unique seat numbers to voucher winners based on specific aircraft layouts, preventing duplicate assignments for the same flight and date.

##  Features

- **Random Seat Generation**: Smart logic to generate 3 unique seats based on aircraft type (ATR, Airbus 320, Boeing 737 Max).
- **Duplicate Prevention**: Backend validation and database constraints to prevent multiple assignments for the same flight number on the same date.
- **Modern UI**: Fully responsive interface built with React 19 and Tailwind CSS v4, supporting both Light and Dark modes.
- **Service-Oriented Architecture**: Business logic is encapsulated in dedicated Service classes.
- **Robust Validation**: Uses Laravel Form Requests for clean and secure input handling.

## Screenshoot



##  Tech Stack

### Backend
- **Framework**: Laravel 13 (Latest Stable)
- **Database**: SQLite (Self-contained)
- **Architecture**: Service Pattern, API Resources, Form Requests
- **Testing**: PHPUnit / Laravel Feature Tests

### Frontend
- **Library**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (Modern CSS-first approach)
- **API Client**: Axios

---

##  Setup Instructions

### 1. Prerequisites
- **PHP 8.2+**
- **Composer**
- **Node.js 20+** & **npm**

### 2. Backend Setup (Laravel)
```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Configure environment
cp .env.example .env
# Note: DB_CONNECTION is set to sqlite by default. 
# The application will automatically create database.sqlite in /database folder.

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start Laravel server
php artisan serve
```
*API will be running at:* `http://127.0.0.1:8000`

### 3. Frontend Setup (React)
```bash
# Navigate to frontend directory
cd frontend

# Install JS dependencies
npm install

# Start development server
npm run dev
```
*Web app will be running at:* `http://localhost:5173`

---


### ⚠️ Important: CORS & Environment Configuration

To prevent **Cross-Origin Resource Sharing (CORS)** errors when the React application (running on port 5173) communicates with the Laravel API (running on port 8000), ensure your `backend/.env` is configured as follows:

1. Open `backend/.env` and update these lines:
   ```env
   # Set this to your React frontend URL
   FRONTEND_URL=http://localhost:5173
   
   # If you are using Laravel Sanctum (default in Laravel 11+)
   SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
   ```

2. (Optional) If you still encounter CORS issues, check `backend/config/cors.php` and ensure it accepts the frontend origin:
   ```php
   'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],
   ```

**Note:** In development, you can also set `'allowed_origins' => ['*']` in `config/cors.php` for testing purposes, but using the `FRONTEND_URL` variable is the best practice for production-ready code.
```


## 🧪 Running Tests

This project includes feature tests to ensure the reliability of the seat generation logic and duplicate prevention.

```bash
cd backend
php artisan test
```

---

## 🐳 Docker Setup (Optional)

For a containerized environment, you can use the provided Docker configuration:

```bash
docker-compose up --build
```
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:8000`

---

##  API Endpoints

### 1. Check Availability
`POST /api/check`
- **Body**: `{ "flightNumber": "GA102", "date": "2025-07-12" }`
- **Response**: `{ "exists": false }`

### 2. Generate Vouchers
`POST /api/generate`
- **Body**: `{ "name": "Sarah", "id": "98123", "flightNumber": "GA102", "date": "2025-07-12", "aircraft": "Airbus 320" }`
- **Response**: `{ "success": true, "seats": ["3B", "7C", "14D"] }`

---

## 📂 Project Structure Highlights

- `backend/app/Services/SeatGeneratorService.php`: Contains the logic for aircraft-specific seat maps and random generation.
- `backend/app/Http/Requests/`: Custom Form Requests for input validation.
- `backend/app/Http/Resources/`: API Resources for consistent JSON output.
- `frontend/src/App.jsx`: Main React logic with integrated API calls and state management.
- `frontend/src/index.css`: Tailwind CSS v4 configuration with custom theme variables.

---

## 📐 Seat Layout Reference

| Aircraft Type | Row Range | Seats per Row |
| :--- | :--- | :--- |
| **ATR** | 1-18 | A, C, D, F |
| **Airbus 320** | 1-32 | A, B, C, D, E, F |
| **Boeing 737 Max** | 1-32 | A, B, C, D, E, F |
