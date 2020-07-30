FROM node
WORKDIR /nodeapp
COPY package.json /nodeapp
RUN npm install
COPY . /nodeapp
CMD ["npm", "run", "start"]