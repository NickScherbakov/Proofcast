# Makefile для Proofcast

# Переменные
NODE_VERSION := 18
DOCKER_REGISTRY := ghcr.io
IMAGE_PREFIX := proofcast

# Помощь по командам
.PHONY: help
help: ## Показать доступные команды
	@echo "Доступные команды:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Установка зависимостей
.PHONY: install
install: ## Установить зависимости
	npm install

.PHONY: install-dev
install-dev: ## Установить зависимости для разработки
	npm install --include=dev

# Линтинг и форматирование
.PHONY: lint
lint: ## Проверить код через ESLint
	npm run lint

.PHONY: lint-fix
lint-fix: ## Исправить проблемы линтинга
	npm run lint:fix

# Тестирование
.PHONY: test
test: ## Запустить тесты
	npm test

.PHONY: test-watch
test-watch: ## Запустить тесты в режиме watch
	npm test -- --watch

# Разработка
.PHONY: dev
dev: ## Запустить в режиме разработки
	npm run dev

.PHONY: demo
demo: ## Запустить демо
	npm run demo

.PHONY: mock-servers
mock-servers: ## Запустить mock серверы
	npm run mock-servers

.PHONY: health-check
health-check: ## Проверить health endpoints
	npm run health-check

# Docker команды
.PHONY: docker-build
docker-build: ## Собрать Docker образы
	npm run docker:build

.PHONY: docker-up
docker-up: ## Запустить через Docker Compose
	npm run docker:up

.PHONY: docker-down
docker-down: ## Остановить Docker контейнеры
	npm run docker:down

.PHONY: docker-logs
docker-logs: ## Показать логи Docker контейнеров
	npm run docker:logs

.PHONY: docker-clean
docker-clean: ## Очистить Docker resources
	docker system prune -f
	docker volume prune -f

# Сборка и деплой
.PHONY: build
build: lint test docker-build ## Полная сборка проекта

.PHONY: clean
clean: ## Очистить артефакты
	rm -rf node_modules
	rm -rf dist
	rm -rf build
	docker system prune -f

# Git операции
.PHONY: git-status
git-status: ## Показать статус Git
	git status

.PHONY: git-add-all
git-add-all: ## Добавить все изменения в Git
	git add .

# Проверки перед коммитом
.PHONY: pre-commit
pre-commit: lint test ## Проверки перед коммитом

# CI/CD
.PHONY: ci
ci: install-dev lint test ## Полный CI pipeline

# По умолчанию - показать help
.DEFAULT_GOAL := help
