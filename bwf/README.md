# Bet with friend - Backend using Python-django

This is `Bet With Friend` projects Backend using Django Rest API and SQLite3 as Database.

### Setup Backend

* Navigate to the backend project directory
```bash
cd bwf
```

* Create and activate a virtual environment
```bash
python -m venv venv
venv\Scripts\activate
```

* Install dependencies
```bash
pip install -r requirements.txt
```

* create .env file and add your secret key and details
```bash
DEBUG=True
SECRET_KEY=your_secret_key
``` 

* Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

* Run the development server
```bash
python manage.py runserver
```

Thank You!