# Project Architecture

This project follows a **Decoupled Client-Server Architecture**.

## Components
- **Backend (Django):** Handles data persistence, business logic, and provides a REST API. It includes a custom pipeline (`import_data.py`) to fetch and process datasets from Kaggle.
- **Frontend (React):** A modern SPA (Single Page Application) that consumes the API and visualizes data using Chart.js.

## Data Flow
1. Python Script -> Kagglehub (Download) -> SQLite (Storage)
2. Django API -> JSON Response
3. React Frontend -> Axios Fetch -> Interactive Dashboard