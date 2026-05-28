#!/data/data/com.termux/files/usr/bin/bash

curl -X POST http://localhost:3000/event \
-H "Content-Type: application/json" \
-d '{
"id":"lead1",
"event":"lead",
"payload":{
"email":"test@test.com",
"intent":"buy",
"behavior":"high_click",
"source":"landing",
"company_size":"medium",
"business":"shopify webshop"
}
}'
