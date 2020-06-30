FROM alpine:latest

RUN apk update && \
    apk add nodejs npm git nano && \
    git clone https://github.com/discord-bio/bot /home/bot && \
    cd /home/bot && \
    npm i && \
    npm i -g typescript && \
    cp config.example.json config.json

CMD sh
