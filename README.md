#  Airline Voucher Seat Assignment Application

A modern web application built for an airline promotional campaign. This tool allows crew members to randomly assign 3 unique seat numbers to voucher winners based on specific aircraft layouts, preventing duplicate assignments for the same flight and date.

##  Features

- **Random Seat Generation**: Smart logic to generate 3 unique seats based on aircraft type (ATR, Airbus 320, Boeing 737 Max).
- **Duplicate Prevention**: Backend validation and database constraints to prevent multiple assignments for the same flight number on the same date.
- **Modern UI**: Fully responsive interface built with React 19 and Tailwind CSS v4, supporting both Light and Dark modes.
- **Service-Oriented Architecture**: Business logic is encapsulated in dedicated Service classes.
- **Robust Validation**: Uses Laravel Form Requests for clean and secure input handling.

## Screenshoot

##  Application Preview

Below are the screenshots of the application in action, covering both the Frontend UI and Backend API testing.

###  Frontend (React + Tailwind v4)

#### 1. Landing Page
Clean and modern interface for crew members to input flight details.
![Landing Page](https://github.com/user-attachments/assets/3722a31f-250e-4d02-9b16-18b4079dcde7)

#### 2. Success State
Vouchers successfully generated with 3 unique random seats displayed in a stylish "ticket-style" layout.
![Success State](https://github.com/user-attachments/assets/c8894d5b-6377-488e-884e-ba741ab61554)

#### 3. Failed State (Duplicate Prevention)
Clear error message when attempting to generate vouchers for a flight and date that already has assignments.
![Failed State](https://github.com/user-attachments/assets/99b101d0-5f58-4206-9f0e-a01c3a4839a7)

---

###  Backend API (Laravel 13 - Postman Testing)

#### 1. API Check - Success
Checking if vouchers exist for a specific flight and date (returns `false`).
![API Check Success](https://github.com/user-attachments/assets/37a45e46-2122-4a8b-85ed-7791eaeb7791)

#### 2. API Check - Validation Error
Proper error handling when required fields are missing or format is invalid.
![API Check Failed](https://github.com/user-attachments/assets/5eacc847-6d90-423c-a6d5-d5422814d28d)

#### 3. API Generate - Success
Voucher successfully created and stored in SQLite database with randomized seats.
![API Insert Success](https://github.com/user-attachments/assets/ed5521e9-d9a7-4e98-b495-c356a19d3781)

#### 4. API Generate - Duplicate Error
Backend preventing duplicate entries for the same flight and date combination.
![API Insert Duplicate](https://github.com/user-attachments/assets/ea7de308-126e-4c03-8b8c-0258dab77ae1)

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
