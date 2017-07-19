FROM node:8

# copy app and install dependencies
WORKDIR /opt/site
COPY package.json /opt/site
RUN npm install --production
COPY dist/index.js /opt/site/index.js

CMD ["node", "index.js"]
