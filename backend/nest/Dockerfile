# Development Stage
FROM node:20.11.0-slim as development

RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y openssl

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .
RUN npx prisma generate
# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
