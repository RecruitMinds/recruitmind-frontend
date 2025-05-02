FROM node:22-alpine AS base

#######################
# Install dependencies
#######################
FROM base AS deps
WORKDIR /app

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN corepack enable pnpm && pnpm install --frozen-lockfile


#######################
# Build the application
#######################
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code
COPY . .

# Build the application
RUN corepack enable pnpm && pnpm run build


#######################
# Production server
#######################
FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only necessary files from builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]