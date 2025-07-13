# Makefile for React Development with Docker
# 프로젝트: 개인 개발 실험실 (React Frontend)

# 변수 정의
COMPOSE_FILE = docker-compose.yml
SERVICE_NAME = react-app
IMAGE_NAME = dev-playground-react

# 기본 타겟 (help 출력)
.DEFAULT_GOAL := help

# PHONY 타겟 선언 (실제 파일이 아닌 명령어임을 명시)
.PHONY: help setup install build dev dev-build dev-logs stop clean logs shell lint test

# 도움말 출력
help:
	@echo "🚀 개인 개발 실험실 - React Frontend 개발 명령어"
	@echo ""
	@echo "📦 설치 및 설정:"
	@echo "  make setup     - 프로젝트 초기 설정 (npm install)"
	@echo "  make install   - 의존성 설치"
	@echo ""
	@echo "🏗️  빌드:"
	@echo "  make build     - Docker 이미지 빌드"
	@echo "  make build-nc  - Docker 이미지 빌드 (캐시 없이)"
	@echo ""
	@echo "🔧 개발 환경:"
	@echo "  make dev       - 개발 서버 시작 (백그라운드)"
	@echo "  make dev-build - 빌드 후 개발 서버 시작 (백그라운드)"
	@echo "  make dev-logs  - 개발 서버 시작 (로그 출력)"
	@echo "  make dev-logs-build - 빌드 후 개발 서버 시작 (로그 출력)"
	@echo ""
	@echo "📋 모니터링:"
	@echo "  make logs      - 컨테이너 로그 확인"
	@echo "  make logs-f    - 컨테이너 로그 실시간 확인"
	@echo "  make status    - 컨테이너 상태 확인"
	@echo ""
	@echo "🛠️  유틸리티:"
	@echo "  make shell     - 컨테이너 내부 접속"
	@echo "  make lint      - ESLint 실행"
	@echo "  make stop      - 개발 서버 중지"
	@echo "  make restart   - 개발 서버 재시작"
	@echo "  make clean     - 컨테이너 및 이미지 정리"
	@echo "  make clean-all - 모든 Docker 리소스 정리"

# 프로젝트 초기 설정
setup:
	@echo "🔧 프로젝트 초기 설정 중..."
	npm install
	@echo "✅ 설정 완료!"

# 의존성 설치
install:
	@echo "📦 의존성 설치 중..."
	npm install

# Docker 이미지 빌드
build:
	@echo "🏗️  Docker 이미지 빌드 중..."
	docker-compose build

# Docker 이미지 빌드 (캐시 없이)
build-nc:
	@echo "🏗️  Docker 이미지 빌드 중 (캐시 없이)..."
	docker-compose build --no-cache

# 개발 서버 시작 (백그라운드)
dev:
	@echo "🚀 개발 서버 시작 중 (백그라운드)..."
	docker-compose up -d
	@echo "✅ 개발 서버가 시작되었습니다!"

# 빌드 후 개발 서버 시작 (백그라운드)
dev-build:
	@echo "🏗️  빌드 후 개발 서버 시작 중..."
	docker-compose up -d --build
	@echo "✅ 개발 서버가 시작되었습니다!"

# 개발 서버 시작 (로그 출력)
dev-logs:
	@echo "🚀 개발 서버 시작 중 (로그 출력)..."
	docker-compose up

# 빌드 후 개발 서버 시작 (로그 출력)
dev-logs-build:
	@echo "🏗️  빌드 후 개발 서버 시작 중 (로그 출력)..."
	docker-compose up --build

# 컨테이너 로그 확인
logs:
	@echo "📋 컨테이너 로그 확인 중..."
	docker-compose logs $(SERVICE_NAME)

# 컨테이너 로그 실시간 확인
logs-f:
	@echo "📋 컨테이너 로그 실시간 확인 중..."
	docker-compose logs -f $(SERVICE_NAME)

# 컨테이너 상태 확인
status:
	@echo "📊 컨테이너 상태 확인 중..."
	docker-compose ps

# 컨테이너 내부 접속
shell:
	@echo "🐚 컨테이너 내부 접속 중..."
	docker-compose exec $(SERVICE_NAME) sh

# ESLint 실행
lint:
	@echo "🔍 ESLint 실행 중..."
	docker-compose exec $(SERVICE_NAME) npm run lint

# 개발 서버 중지
stop:
	@echo "⏹️  개발 서버 중지 중..."
	docker-compose down
	@echo "✅ 개발 서버가 중지되었습니다"

# 개발 서버 재시작
restart:
	@echo "🔄 개발 서버 재시작 중..."
	docker-compose restart
	@echo "✅ 개발 서버가 재시작되었습니다"

# 컨테이너 및 이미지 정리
clean:
	@echo "🧹 컨테이너 및 이미지 정리 중..."
	docker-compose down --rmi local --volumes --remove-orphans
	@echo "✅ 정리 완료!"

# 모든 Docker 리소스 정리 (주의: 다른 프로젝트에도 영향)
clean-all:
	@echo "⚠️  모든 Docker 리소스 정리 중..."
	@echo "이 명령은 다른 프로젝트에도 영향을 줄 수 있습니다."
	@read -p "계속하시겠습니까? (y/N): " confirm && [ "$$confirm" = "y" ]
	docker system prune -a --volumes
	@echo "✅ 모든 Docker 리소스가 정리되었습니다" 