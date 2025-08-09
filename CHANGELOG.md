# Changelog

Все важные изменения в этом проекте будут документированы в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
и этот проект следует принципам [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-08-09

### Добавлено
- Структурирована архитектура проекта
- Добавлены Dockerfile для каждого сервиса (core, verifier, ui)
- Созданы mock серверы для разработки и тестирования
- Добавлены базовые unit тесты с Mocha
- Настроен ESLint и линтинг кода
- Созданы GitHub Actions для CI/CD pipeline
- Добавлена поддержка health check'ов для всех сервисов
- Улучшена документация и README

### Исправлено
- Исправлены пути конфигурационных файлов
- Переименованы служебные файлы (.eslintrc.js, .gitignore)
- Исправлена структура docker-compose.yml с build context
- Добавлены отсутствующие npm скрипты

### Улучшено
- Обновлен package.json с дополнительными скриптами
- Улучшена структура директорий (config/, docs/, .github/)
- Добавлены security настройки в Docker контейнеры

## [1.0.0] - 2025-08-10

### Added
- Initial release of Proofcast core functionality
- Zero-knowledge proof generation and verification system
- Policy engine for configurable causality rules
- JavaScript SDK for integration
- Demo application showcasing basic functionality
- Docker support for containerized deployment
- Configuration samples for various components
- Comprehensive documentation including architecture and ZK-traceability details

### Security
- Implemented secure key management
- Added tamper-evident storage for proofs
- Created verification endpoints with authentication