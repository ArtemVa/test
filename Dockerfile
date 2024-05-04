FROM node
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . ./

EXPOSE 5000
# Run the application.
CMD ["node", "index.js"]

