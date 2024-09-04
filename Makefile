build:
	git pull
	yarn install
	tsc
up:
	sudo systemctl start backend-server.service
down:
	sudo systemctl stop backend-server.service
