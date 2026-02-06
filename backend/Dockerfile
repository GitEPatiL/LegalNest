FROM node:18-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create data directory for JSON storage if it doesn't exist
RUN mkdir -p src/data

# Set permissions for data directory
RUN chmod 777 src/data

# Exposure port (defaults to 5001 as configured, but Render sets PORT env)
EXPOSE 5001

# Start command
CMD ["npm", "start"]
