
From node:22.13.0

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot
COPY package.json /usr/src/bot
RUN npm install -g npm@latest
RUN npm install
COPY . /usr/src/bot
EXPOSE 3000
CMD ["node" , "--expose-gc" , "app.js"]