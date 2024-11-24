# Этап 1: Сборка Angular-приложения
FROM node:18 AS build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . .

# Сборка проекта
RUN npm run build --prod

# Этап 2: Настройка веб-сервера nginx
FROM nginx:alpine AS production-stage

# Копируем собранное приложение из предыдущего этапа
COPY --from=build-stage /app/dist/conduitclone/browser /usr/share/nginx/html

# Копируем файл конфигурации nginx (если требуется)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Указываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
