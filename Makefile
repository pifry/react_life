create_app:
	docker-compose run create npx create-react-app my_app
	sudo chown -R $(USERNAME):$(USERNAME) my_app 

update_dependencies: my_app/package.json
	docker-compose run dev npm install

runserver: update_dependencies
	docker-compose run dev npm start

test: update_dependencies
	docker-compose run dev npm test

clean:
	rm -rf my_app

PHONY: clean
