# Setup ————————————————————————————————————————————————————————————————————————

# Executables
NPM           = npm
NODE          = node
NODEMON       = nodemon

# Misc
.DEFAULT_GOAL = help
.PHONY       =  # Not needed here, but you can put your all your targets to be sure
                # there is no name conflict between your files and your targets.

## —— My first Makefile ———————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Yarn 🐱 / JavaScript —————————————————————————————————————————————————————
install: install-back install-front ## Installation du projet en local

install-front: ## Execution de npm install dans sur le dossier backend
	cd frontend; $(NPM) install

launch-front: ## Watch files and build assets when needed for the dev env
	cd frontend; $(NPM) start

front: install-front launch-front

install-back: ## Execution de npm install dans sur le dossier backend
	cd backend; $(NPM) install

launch-back: ## Watch files and build assets when needed for the dev env
	cd backend; $(NODEMON) server

api: install-back launch-back ## Lance l'installation de l'API et exécute le fichier server blabla
