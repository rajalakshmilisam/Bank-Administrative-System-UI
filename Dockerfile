FROM node:latest as builder
WORKDIR /app
COPY package*.json .
RUN npm install
# COPY .env.production .env
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
COPY . .
RUN rm -f .env.local
RUN rm -f .env.production


RUN npx update-browserslist-db@latest
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]