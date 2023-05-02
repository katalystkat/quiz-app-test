# Application Front
FROM node:14-alpine
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# Application Back
FROM node:14-alpine
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
