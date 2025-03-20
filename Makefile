infra-up:
	docker-compose up --build 

infra-down:
	docker-compose down 

infra-cleanup:
	@if [ -n "$$(docker ps -a -q)" ]; then docker rm $$(docker ps -a -q); else echo "No containers to remove."; fi

infra-restart: infra-down infra-up