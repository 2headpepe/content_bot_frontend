# Используем официальный образ Node.js в качестве базового
FROM node:18

# Создаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Экспонируем порт 3000 для доступа к приложению
EXPOSE 3000

# Запускаем Next.js приложение
CMD ["npm", "run", "start"]