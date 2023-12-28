FROM node:20-slim AS build
RUN npm config set registry https://registry.npmmirror.com

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install pnpm -g && \
    pnpm install --frozen-lockfile

# RUN pnpm --filter "./apps/**" build
RUN pnpm --filter=@apps/admin build
RUN pnpm deploy --filter=@apps/admin --prod /prod/admin
# RUN pnpm deploy --filter=@apps/gf-vben --prod /prod/gf-vben

FROM nginx:1.24.0-alpine as admin
COPY --from=build /prod/admin/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#FROM nginx:1.24.0-alpine as gf-vben
#COPY --from=build /prod/gf-vben /usr/share/nginx/html
#COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
#EXPOSE 80


