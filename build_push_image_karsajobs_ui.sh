#! /bin/bash

echo "Membuild Image Docker karsajobs-ui..."
#Menghentikan 3 detik sebelum lanjut eksekusi script
sleep 3s
#Membuild docker image dari Dockerfile didirectori saat ini dengan nama ghcr.io/radearsr/karsajobs:latest
docker build -t ghcr.io/radearsr/karsajobs-ui:latest .

echo "Selesai build image, menampilkan semua image docker..."
#Menghentikan 3 detik sebelum lanjut eksekusi script
sleep 3s
#Menampilkan semua image docker
docker images

echo "Login ke github package menggunakan env GITHUB_TOKEN..."
#Menghentikan 3 detik sebelum lanjut eksekusi script
sleep 3s
#Login ke Github Package (ghcr.io) dengan perintah docker login
echo $GITHUB_TOKEN | docker login -u radearsr --password-stdin ghcr.io

echo "Push Image Docker ke Github Package"
#Menghentikan 3 detik sebelum lanjut eksekusi script
sleep 3s
#Upload image ke Github Package
docker push ghcr.io/radearsr/karsajobs-ui:latest
