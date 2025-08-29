FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_WITH_SERVER
ENV VITE_WITH_SERVER=$VITE_WITH_SERVER

RUN npm run build

FROM nginx:alpine

COPY --from=builder /src/build/client /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]