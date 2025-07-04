.PHONY: run-api test-api

run-api:
	docker compose -f docker/compose/development.yml run --service-ports --rm api

test-api:
	docker compose -f docker/compose/test.yml run --service-ports --rm api

# if you encounter any error running this command please run `export DISPLAY=:1` before running `sudo xhost +local:docker`
test-api-ui:
	@docker run \
		-it \
		--rm \
		--network host \
		-v ~/.Xauthority:/root/.Xauthority:ro \
		-v /tmp/.X11-unix:/tmp/.X11-unix:ro \
		-v ./src/tests/api:/e2e \
		-e NODE_ENV=development \
		-e DISPLAY \
		-w /e2e \
		--entrypoint cypress \
		cypress/included:latest \
		open --project .