build:
	git pull
	yarn install
	yarn run tsc
dev:
	make build
	node dist/app.js
up:
	sudo systemctl start backend-server.service
down:
	sudo systemctl stop backend-server.service
