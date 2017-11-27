FROM node:8-alpine

EXPOSE 9009



WORKDIR /src

COPY package.json /src/package.json
COPY package-lock.json /src/package-lock.json

RUN npm install

COPY config /src/config
COPY app.js /src/app.js
COPY app /src/app
COPY util /src/util
COPY public /src/public
COPY openapi.yaml /src/openapi.yaml

CMD ["node", "app.js"]