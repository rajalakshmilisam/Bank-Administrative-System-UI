FROM node:latest as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY .env.production .env

COPY . .
RUN rm -f .env.local

RUN npx update-browserslist-db@latest
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]