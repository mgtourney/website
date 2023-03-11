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
ARG PUBLIC_VERSION=D1.0.0
ARG PUBLIC_REPO=Unknown
ARG PUBLIC_SHA=Unknown

# Environment Variables
ENV PUBLIC_URL=http://localhost:3000
ENV PUBLIC_NAME=Magnesium

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
ENV PUBLIC_VERSION=${PUBLIC_VERSION}
ENV PUBLIC_REPO=${PUBLIC_REPO}
ENV PUBLIC_SHA=${PUBLIC_SHA}

# Expose required ports
EXPOSE 3000

# Volumes
VOLUME [ "/app/public/assets/images/users" ]

# Start
CMD [ "npm", "run", "prod" ]