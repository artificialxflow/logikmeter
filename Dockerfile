# Stage 1: Dependencies
FROM node:18.20.5-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.8.2

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:18.20.5-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.8.2

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
RUN pnpm build

# Stage 3: Runner
FROM node:18.20.5-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install pnpm
RUN npm install -g pnpm@10.8.2

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set environment variables
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"] 