.PHONY: test

test: .installed
	mocha --compilers coffee:coffee-script/register -R spec

install: .installed

.installed:
	npm install mocha
	npm install coffee
	npm install coffee-script
	npm install chai
	export PATH=node_modules/.bin:$PATH
	touch .installed

poi:
	ruby tooling/csv2json.rb points.js
