#!/bin/bash
cd ~/TITANIUM_OS
redis-server &
sleep 2
pm2 start server.js --name api
pm2 start worker.js --name engine
pm2 save
echo "✅ SYSTEM ONLINE"
echo "API: http://localhost:3000"
