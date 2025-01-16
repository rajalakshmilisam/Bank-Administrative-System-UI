FROM node:latest AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN pwd
RUN ls

FROM nginx:alpine
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build/* /usr/share/nginx/html/
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
RUN echo "window.env = {};" > /usr/share/nginx/html/env-config.js
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
RUN pwd
RUN ls
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]