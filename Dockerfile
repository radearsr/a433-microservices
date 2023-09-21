FROM node:14-alpine

WORKDIR /app

COPY . .

ENV NODE_ENV=production DB_HOST=item-db

RUN npm install --production --unsafe-perm && npm run build

CMD [ "npm", "start" ]

EXPOSE 8080