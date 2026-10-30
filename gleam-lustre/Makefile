.PHONY: dev check build

dev:
	gleam run -m lustre/dev start

check:
	gleam format --check src test
	gleam check
	gleam test
	node --test test/*_test.mjs

# Use relative asset URLs so the app also works under the Pages subdirectory.
build:
	gleam run -m lustre/dev build
	cp index.html dist/index.html
