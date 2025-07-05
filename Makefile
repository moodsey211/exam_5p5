.PHONY: run-api test-api run-ui

run-api:
	docker compose -f docker/compose/development.yml run --service-ports --rm api

test-api:
	docker compose -f docker/compose/test.yml run --service-ports --rm api

run-ui:
	docker compose -f docker/compose/development.yml run --service-ports --rm ui