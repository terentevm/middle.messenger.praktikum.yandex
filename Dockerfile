FROM node:16
WORKDIR .
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "app.js"]
