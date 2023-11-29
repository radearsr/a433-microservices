// Menggunakan dotenv untuk mengelola variable environment
require("dotenv").config();

// Mengimport Express untuk membuat aplikasi express
const express = require("express");
const app = express();

// Mengimport untuk berinteraksi dengan RabbitMQ
const amqp = require("amqplib");
// Mengambil URL RabbitMQ dari env
const amqpServer = process.env.AMQP_URL;
// Mendefinisikan global variable
var channel, connection;

// Memanggil fungsi untuk menghubungkan ke RabbitMQ
connectToQueue();

async function connectToQueue() {
  try {
    // Membuat koneksi RabbitMQ dan channel
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    // Mengecek dan membuat antrian "order" jika belum ada
    await channel.assertQueue("order");
    // Mengonsumsi pesan dari antrian "order"
    channel.consume("order", (data) => {
      // Menampilkan pesan yang diterima dari antrian
      console.log(`Order received: ${Buffer.from(data.content)}`);
      // Menampilkan pesan bahwa pesanan akan segera dikirim
      console.log("** Will be shipped soon! **\n");
      // Mengirim konfirmasi bahwa pesan telah berhasil diproses
      channel.ack(data);
    });
  } catch (ex) {
    console.error(ex);
  }
}

// Menjalankan server express pada port yang ditentukan dalam env
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
