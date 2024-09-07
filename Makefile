build:
	git pull
	yarn install
	tsc
dev:
	git pull
	yarn install
	tsc
	node dist/app.js
up:
	sudo systemctl start backend-server.service
down:
	sudo systemctl stop backend-server.service
