# 1. Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Build the Vite app
RUN npm run build

# 2. Production Stage
FROM node:18-alpine

# Install lightweight static file server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist .

# Expose desired port
EXPOSE 8080

# Serve the app
CMD ["serve", "-s", ".", "-l", "8080"]