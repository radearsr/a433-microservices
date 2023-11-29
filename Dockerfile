# Menggunakan Image Nodejs 14 alpine
FROM node:14-alpine

# Menentukan working direktori didalam kontainer ke /app
WORKDIR /app

# Copy isi dari direktori saat ini ke dalam kontainer di /app
COPY . .

# Mendefinisikan variable environment
ENV AMQP_URL="amqp://localhost:5672"
ENV PORT=3001

# Install Dependensi Nodejss
RUN npm install

# Menjalankan nodejs server dengan perintah npm start saat kontainer dimulai
CMD [ "npm", "start" ]

# Mengexpose port 3001
EXPOSE 3001