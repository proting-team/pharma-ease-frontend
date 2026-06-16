# Stage 1: Base & Dependencies
FROM node:24-alpine AS base

WORKDIR /app

# Copy package files dengan ownership node sejak awal
COPY --chown=node:node package*.json ./

# Set user sebelum install agar cache & file milik node, bukan root
USER node

# Mount cache ke home node, bukan /root (karena sudah USER node)
RUN --mount=type=cache,target=/home/node/.npm,uid=1000,gid=1000 npm ci

# Copy source code dengan ownership node
COPY --chown=node:node . .


# Stage 2: Development Environment (Dynamic behavior)
FROM base AS development

# Tidak perlu COPY ulang — semua sudah di-inherit dari base
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]


# Stage 3: Build Production
FROM base AS build-stage

# User node sudah di-set dari base
RUN npm run build


# Stage 4: Production Nginx (Delivery Ready)
FROM nginx:stable-alpine AS production

COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy full nginx configuration to replace default master config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]



