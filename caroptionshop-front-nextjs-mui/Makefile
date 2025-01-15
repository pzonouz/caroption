docker-run:
	docker run -d --rm --name caroption-front -p3000:3000 -v "/home/peyman/tmp/projects/caroptionshop/caroptionshop-admin-panel-front-nextjs-mui:/app" --network caroption caroption-front

docker-stop:
	docker stop caroption-front

docker-rm:
	docker rm caroption-front

docker-build:
	docker build -t caroption-front .

test:
	jest

.PHONY:test
.PHONY:clean
.PHONY:all
