Attention Health Dashboard 📊
An analytical dashboard developed to monitor social media consumption (Reels/Shorts) and its impact on attention span and stress levels. This project was built as part of the Systems Development (ADS) course at ETE.

🚀 Features
Data-Driven Insights: Analyzes metrics like watch time, age, and focus scores.

Automated Data Pipeline: Custom Python script to fetch and import datasets directly from Kaggle.

Modern Tech Stack: Django REST Framework (Backend) and React (Frontend).

🛠️ Tech Stack
Backend: Python, Django, Django REST Framework

Frontend: React.js

Database: SQLite (Development)

Data Tools: Pandas, KaggleHub

📦 Installation & Setup
1. Clone the repository
git clone https://github.com/ddabnll/attention-health-dashboard.git

cd Desafio

2. Backend Setup (Django)
Go to the backend folder and install the dependencies:

cd backend

pip install django djangorestframework django-cors-headers pandas kagglehub

Run the migrations to set up the database:

python manage.py migrate

3. Import Data
To populate the database with the latest dataset from Kaggle, run:

python import_data.py

4. Run the Servers
In one terminal, start the Django server:

python manage.py runserver

In a second terminal, go to the dashboard-consumo folder and start React:

cd ..

cd dashboard-consumo

npm install

npm start

📬 API Endpoints
GET /api/dados-consumo/ - Returns the full list of consumption data.

👤 Author
Daniel Bonilla - Systems Development Student at ETE.