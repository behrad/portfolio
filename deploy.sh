#!/bin/bash

set -e  # اگر خطایی رخ دهد، اسکریپت متوقف می‌شود

REMOTE_HOST="behrad"
PROJECT_DIR="behrad"

echo "==> Building project with pnpm..."
pnpm build

echo "==> Syncing out directory using rsync..."
rsync -avz --delete out/ $REMOTE_HOST:$PROJECT_DIR/out/

echo "==> Running deployment on remote server..."
ssh $REMOTE_HOST << EOF
    set -e

    echo "==> Setting read permissions on output..."
    sudo chmod -R a+r $PROJECT_DIR/out

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

