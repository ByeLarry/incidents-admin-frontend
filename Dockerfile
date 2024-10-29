FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build && ls -la /app/dist

FROM httpd:2.4

COPY --from=builder /app/dist/incidents-admin-frontend/browser /usr/local/apache2/htdocs/

COPY httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 4200  

CMD ["httpd-foreground"]
