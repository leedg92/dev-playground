FROM node:20-alpine

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 3000

# 개발 서버 실행 (Hot Reload 활성화)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"] 