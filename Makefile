.PHONY: help up down clean logs build rebuild ps restart shell

# Default target
help:
	@echo "Available commands:"
	@echo "  make up          - Build and start containers with hot reload"
	@echo "  make down        - Stop and remove containers"
	@echo "  make clean       - Stop containers, remove volumes and images"
	@echo "  make logs        - View container logs"
	@echo "  make build       - Build image"
	@echo "  make rebuild     - Rebuild image without cache"
	@echo "  make ps          - Show running containers"
	@echo "  make restart     - Restart containers"
	@echo "  make shell       - Open shell in container"

# Commands
up:
	docker compose up --build -d

up-fast:
	docker compose up -d

down:
	docker compose down

clean:
	docker compose down -v
	docker compose rm -f
	docker image prune -f

logs:
	docker compose logs -f web

build:
	docker compose build web

rebuild:
	docker compose build --no-cache web

restart:
	docker compose restart web

ps:
	docker compose ps

shell:
	docker exec -it reformly-web sh
