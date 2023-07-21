# BE Scaffolding

This app was scaffolded by running `django-admin startproject`. [Learn more here.](https://docs.djangoproject.com/en/4.2/ref/django-admin/#startproject)

The version of django being used is: `Django = "~4.1.9"` [Learn more here.](https://docs.djangoproject.com/en/4.2/)

The version of python to use is `python = "^3.10"`. [Learn more here.](https://www.python.org/doc/versions/)

The package manager used is `poetry = "^1.2.2"`. [Learn more here.](https://python-poetry.org/docs/#:~:text=Poetry%20is%20a%20tool%20for,build%20your%20project%20for%20distribution.)

## Getting started

_Ensure you have a valid version of poetry and python installed, see above for details_

1. Type `poetry install` to gather all requirements
1. Run demo server with `poetry run python manage.py runserver`
1. Navigate to [http://localhost:8000](http://localhost:8000) to view the HTML interface for the django rest framework

## Notes

- Everything in this project is yours to blow away or build around, but we strongly suggest you stick with django
- A default superuser with username `admin` and password `password` is in the `db.sqlite3` example db
- A `.envrc` file will auto load the virtual environment for python if you're using `direnv`
- With `direnv`, you do not need `poetry run` before your python commands
- Additional info can be found in `pyproject.toml` and `intsureview_be/settings.py`
