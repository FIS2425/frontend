FROM node:22-alpine AS build
 
WORKDIR /frontend
 
COPY . .
 
RUN npm ci --no-audit && npm run build
 
FROM nginx:stable-alpine-slim
 
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /frontend/dist/ /usr/share/nginx/html/
 
EXPOSE 80
