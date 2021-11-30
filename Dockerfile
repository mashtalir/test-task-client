FROM node:16

RUN mkdir -p /usr/src/app/client/
WORKDIR /usr/src/app/client/

COPY . /usr/src/app/client/

RUN npm install

EXPOSE 3000
ENTRYPOINT ["npm", "start"]