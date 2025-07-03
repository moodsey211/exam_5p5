.PHONY: run-api

run-api:
	docker compose -f docker/compose/development.yml run --service-ports --rm api