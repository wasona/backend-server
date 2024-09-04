up:
	git pull
	yarn install
	yarn build
	sudo systemctl restart backend-server.service
down:
	sudo systemctl stop backend-server.service
