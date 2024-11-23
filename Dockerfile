FROM node:latest as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build /usr/share/nginx/html

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

RUN echo "window.env = {};" > /usr/share/nginx/html/env-config.js

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
