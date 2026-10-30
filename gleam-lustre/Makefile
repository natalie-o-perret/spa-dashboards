.PHONY: dev check build assets

dev: assets
	gleam run -m lustre/dev start

assets:
	gleam deps download
	cp build/packages/meridian_ui/priv/meridian-ui.css assets/meridian-ui.css

check:
	gleam format --check src test
	gleam check
	gleam test
	node --test test/*_test.mjs

# Use relative asset URLs so the app also works under the Pages subdirectory.
build: assets
	gleam run -m lustre/dev build
	cp index.html dist/index.html
