# Menggunakan Image Nodejs 14 alpine
FROM node:14-alpine

# Menentukan working direktori didalam kontainer ke /app
WORKDIR /app

# Copy isi dari direktori saat ini ke dalam kontainer di /app
COPY . .

# Mendefinisikan variable environment
ENV AMQP_URL="amqp://admin:admin@localhost:5672"
ENV PORT=3000

# Install Dependensi Nodejs
RUN npm install

# Menjalankan nodejs server dengan perintah npm start saat kontainer dimulai
CMD [ "npm", "start" ]

# Mengexpose port 3000
EXPOSE 3000