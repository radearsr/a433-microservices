// Menggunakan dotenv untuk mengelola variable environment
require("dotenv").config();

// Mengimport Express untuk membuat aplikasi express
const express = require("express");
const app = express();

// Mengimport body-parser untuk menangani data JSON
const bp = require("body-parser");
app.use(bp.json());

// Mengimport untuk berinteraksi dengan RabbitMQ
const amqp = require("amqplib");
// Mengambil URL RabbitMQ dari env
const amqpServer = process.env.AMQP_URL;
// Mendefinisikan global variable
var channel, connection;

// Memanggil fungsi untuk menghubungkan ke RabbitMQ
connectToQueue();

async function connectToQueue() {
  // Membuat koneksi RabbitMQ dan channel
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  try {
    // Melakukan pengecekan dan membuat antrian "order" jika belum ada
    const queue = "order";
    await channel.assertQueue(queue);
    console.log("Connected to the queue!");
  } catch (ex) {
    console.error(ex);
  }
}

// Enpoint untuk menagani permintaan POST ke /order
app.post("/order", (req, res) => {
  // Mendapatkan data JSON dari req body
  const { order } = req.body;
  // Memanggil fungsi createOrder untuk mengirim order ke antrian RabbitMQ
  createOrder(order);
  // Mengirim response dengan data pesanan
  res.send(order);
});

const createOrder = async (order) => {
  // Mendefinisikan nama antrian yang akan digunakan
  const queue = "order";
  // Mengirim pesan ke antrian RabbitMQ dengan menggunakan channel
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
  console.log("Order succesfully created!");
  // Menangani sinyal SIGINT (Ctrl + C) untuk menutup koneksi RabbitMQ sebelum keluar
  process.once("SIGINT", async () => {
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });
};

// Menjalankan server express pada port yang ditentukan dalam env
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
