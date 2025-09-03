# Makefile

.PHONY: help serve

help:
	@echo "Commands:"
	@echo "  serve: Run a local web server"

serve:
	@echo "Starting server on http://localhost:8000"
	@python3 -m http.server 8000
