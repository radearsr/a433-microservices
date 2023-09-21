#! /bin/bash

echo "Building docker image..."
#Delay 3 second before execute code
sleep 3s
#Build docker image from Dockerfile in current directory with name item-app and tag v1
docker build -t item-app:v1 .

echo "Finish build image, listing all docker image..."
#Delay 3 second before execute code
sleep 3s
#Lists all docker images
docker images

echo "Renaming docker image to ghcr.io/radearsr/item-app:v1"
#Delay 3 second before execute code
sleep 3s
#Renaming Docker Image For Push To Github Package
docker tag item-app:v1 ghcr.io/radearsr/item-app:v1

echo "Login to github package using env GITHUB_TOKEN..."
#Delay 3 second before execute code
sleep 3s
#Login to Github Package (ghcr.io) with docker login
echo $GITHUB_TOKEN | docker login -u radearsr --password-stdin ghcr.io

echo "Push Docker Image To Github Package"
#Delay 3 second before execute code
sleep 3s
#Upload image to Github Package
docker push ghcr.io/radearsr/item-app:v1
