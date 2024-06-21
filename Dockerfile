FROM node:latest as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
COPY .env.production .env
RUN npx update-browserslist-db@latest
RUN npm run build 
# RUN npm install -g serve
# CMD ["serve", "-s", "build"]

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html