dev: node_modules
	NODE_ENV=development node index.js

build: node_modules
	node index.js

deploy: bin/deploy.sh clean build
	GIT_DEPLOY_DIR=build \
	GIT_DEPLOY_BRANCH=gh-pages \
	./bin/deploy.sh

node_modules: package.json
	npm install

clean:
	rm -rf build

.PHONY: clean deploy dev
