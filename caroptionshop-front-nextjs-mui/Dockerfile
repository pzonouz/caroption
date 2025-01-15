FROM node
WORKDIR /app
RUN npm install -g -verbose pnpm 
COPY package.json /app
RUN pnpm install
COPY . /app
EXPOSE 3000
CMD ["npm", "run", "dev"]
