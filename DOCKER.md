# Docker Instructions

## Quick Start

### Production

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop
docker-compose down
```

Application will be available at http://localhost:3000

### Development

```bash
# Start dev container
docker-compose --profile dev up web-dev --build

# In background
docker-compose --profile dev up -d web-dev --build
```

Application will be available at http://localhost:3001

## Useful Commands

```bash
# View logs
docker-compose logs -f web

# Rebuild without cache
docker-compose build --no-cache

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes
docker-compose down -v

# Enter container
docker exec -it reformly-web sh

# Check status
docker-compose ps
```

## Docker Files Structure

- `Dockerfile` - Production build (multi-stage, optimized)
- `Dockerfile.dev` - Development build (with hot-reload)
- `docker-compose.yml` - Configuration for both modes
- `.dockerignore` - Exclusions when building image

## Troubleshooting

### Port Already in Use

If port 3000 is busy, change in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # External:Internal
```

### Permission Issues

If you encounter permission issues, make sure files are accessible:
```bash
chmod -R 755 .
```

### Docker Cleanup

```bash
# Remove all unused images
docker image prune -a

# Remove all unused containers
docker container prune

# Full cleanup (be careful!)
docker system prune -a --volumes
```
