#!/bin/bash

set -e  # اگر خطایی رخ دهد، اسکریپت متوقف می‌شود

ZIP_NAME="behrad.zip"
REMOTE_HOST="behrad"
REMOTE_DIR="~"
PROJECT_DIR="behrad"

echo "==> Zipping out directory..."
rm -f $ZIP_NAME
zip -r $ZIP_NAME out/

echo "==> Uploading zip to server..."
scp $ZIP_NAME $REMOTE_HOST:$REMOTE_DIR

echo "==> Running deployment on remote server..."
ssh $REMOTE_HOST << EOF
    set -e

    echo "==> Cleaning old project directory..."
    rm -rf $PROJECT_DIR/out

    echo "==> Unzipping project..."
    unzip $ZIP_NAME -d $PROJECT_DIR

    cd $PROJECT_DIR

    echo "==> Building Docker image..."
    sudo docker build -t behrad .

    echo "==> Stopping old container..."
    sudo docker stop behrad || true

    echo "==> Removing old container..."
    sudo docker rm behrad || true

    echo "==> Starting new container..."
    sudo docker run -d -p 80:80 --network my-shared-network --restart unless-stopped --name behrad behrad

    echo "==> Deployment finished."
EOF

echo "==> Done!"

