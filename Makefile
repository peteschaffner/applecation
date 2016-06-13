
build: node_modules
	node index.js

node_modules: package.json
	npm install

clean:
	rm -rf build/*

.PHONY: build clean
