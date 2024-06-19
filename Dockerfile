FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npx update-browserslist-db@latest
RUN npm run build
RUN npm install -g http-server
CMD [ "http-server", "build" ]