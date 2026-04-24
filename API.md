# API Documentation

The backend exposes a RESTful API to communicate with the frontend.

## Base URL
Default: `http://localhost:8000/api/`

## Endpoints

### 1. Get Consumption Data
- **URL:** `/dados-consumo/`
- **Method:** `GET`
- **Description:** Returns a list of all social media usage records imported from the dataset.
- **Response Example:**
  ```json
  [
    {
      "id": 1,
      "platform": "Instagram",
      "watch_time": 120,
      "stress_level": 5
    }
  ]