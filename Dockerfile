# Use the latest NodeJS LTS running on an Alpine base image.
FROM node:lts-alpine

# Set our working directory to /app
WORKDIR /app

# Copy dep files and install
COPY package*.json .
RUN npm install

# Copy everything into the container
COPY . . 

# Build arguments and their defaults
ARG NODE_ENV=DEV
ARG NEXT_PUBLIC_VERSION=D1.0.0
ARG NEXT_PUBLIC_REPO=Unknown
ARG NEXT_PUBLIC_SHA=Unknown

# Environment Variables
ENV NEXT_PUBLIC_URL=http://localhost:3000
ENV NEXT_PUBLIC_NAME=Magnesium

# Argument controlled ENVs
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_VERSION=${NEXT_PUBLIC_VERSION}
ENV NEXT_PUBLIC_REPO=${NEXT_PUBLIC_REPO}
ENV NEXT_PUBLIC_SHA=${NEXT_PUBLIC_SHA}

# Expose required ports
EXPOSE 3000

# Build the application
RUN npm run build

# Start
CMD [ "npm", "run", "start" ]