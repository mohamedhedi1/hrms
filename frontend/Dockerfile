# Stage 1: Build the Angular app
FROM node:20.11.0-slim AS build
ARG build_env=development
# Set the working directory
WORKDIR /app
# Copy the source code to the working directory
COPY . .

# Install dependencies
RUN npm install

RUN npm install -g @angular/cli
# Build the Angular application
RUN ng build --configuration=$build_env


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
# Copy the built application from Stage 1 to replace the default nginx contents
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html


# Expose port 80

EXPOSE 80
