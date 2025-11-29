lint-backend:
	cd backend && pylint .

install-backend:
	cd backend && pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

install: install-backend install-frontend

dev:
	make -j2 dev-backend dev-frontend

dev-backend:
	cd backend && python manage.py runserver

dev-frontend:
	cd frontend && npm start