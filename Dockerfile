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

# Database
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_DATABASE=mydb
ENV DB_USER=myuser
ENV DB_PASSWORD=mypassword

# Discord
ENV DISCORD_CLIENT_ID=your_client_id
ENV DISCORD_CLIENT_SECRET=your_client_secret
ENV DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/auth

# Auth
ENV AUTHSECRET=
ENV SALT=

# Ratelimits
ENV USER_RATELIMIT=1000
ENV TOURNAMENT_RATELIMIT=1000

# Argument controlled ENVs
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_VERSION=${NEXT_PUBLIC_VERSION}
ENV NEXT_PUBLIC_REPO=${NEXT_PUBLIC_REPO}
ENV NEXT_PUBLIC_SHA=${NEXT_PUBLIC_SHA}

# Expose required ports
EXPOSE 3000

# Volumes
VOLUME [ "/app/public/assets/images/users" ]

# Build the application
RUN npm run build

# Start
CMD [ "npm", "run", "start" ]