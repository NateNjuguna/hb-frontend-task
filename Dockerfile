# Configure NodeJS Engine version
FROM node:8.11.4
# Make and move to a working directory
WORKDIR /opt/hb-frontend-task
# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install
# Copy source
COPY . /opt/hb-frontend-task
#Run the application
EXPOSE 3000
CMD npm start
