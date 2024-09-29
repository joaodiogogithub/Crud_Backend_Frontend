FROM node:20-alpine as build

WORKDIR /app

COPY ./ ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g pnpm && pnpm install

ARG VITE_API_URL

ENV VITE_API_URL $VITE_API_URL

RUN pnpm build

FROM nginx:1.17-alpine

COPY --from=build /app/dist/ /var/www

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80/tcp
EXPOSE 443/tcp

CMD ["nginx", "-g", "daemon off;"]

