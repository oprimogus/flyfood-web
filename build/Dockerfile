FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.29.0-alpine AS production-stage

# Copia os arquivos buildados para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração personalizada do Nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]