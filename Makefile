.PHONY: help up down clean logs build rebuild ps restart shell up-prod down-prod up-prod-local down-prod-local check-prod

# Default target
help:
	@echo "Available commands:"
	@echo "  make up          - Build and start containers with hot reload (dev)"
	@echo "  make up-prod     - Build and start production containers (server)"
	@echo "  make up-prod-local - Build and start production containers locally (with port 3000)"
	@echo "  make down        - Stop and remove containers"
	@echo "  make down-prod   - Stop and remove production containers"
	@echo "  make clean       - Stop containers, remove volumes and images"
	@echo "  make logs        - View container logs"
	@echo "  make build       - Build image"
	@echo "  make rebuild     - Rebuild image without cache"
	@echo "  make ps          - Show running containers"
	@echo "  make restart     - Restart containers"
	@echo "  make shell       - Open shell in container"

# Commands
up:
	docker compose down || true
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

# Production commands
up-prod:
	docker compose -f docker-compose.prod.yml down || true
	docker rm -f reformly-web || true
	docker compose -f docker-compose.prod.yml up --build -d

down-prod:
	docker compose -f docker-compose.prod.yml down

# Production local testing commands
up-prod-local:
	docker compose -f docker-compose.prod.local.yml down || true
	docker rm -f reformly-web || true
	docker compose -f docker-compose.prod.local.yml up --build -d

down-prod-local:
	docker compose -f docker-compose.prod.local.yml down

# Diagnostic commands
check-prod:
	@echo "=== Container Status ==="
	@docker ps | grep reformly-web || echo "Container not running"
	@echo ""
	@echo "=== Container IP ==="
	@docker inspect reformly-web 2>/dev/null | grep -A 5 "NetworkSettings" | grep "IPAddress" || echo "Cannot get IP"
	@echo ""
	@echo "=== Testing from inside container ==="
	@docker exec reformly-web wget -qO- http://localhost:3000/onboarding 2>/dev/null | head -c 200 || echo "Connection failed"
	@echo ""
	@echo "=== Network info ==="
	@docker network ls | grep reformly || echo "No reformly network found"
