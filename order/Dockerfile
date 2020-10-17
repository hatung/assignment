FROM node:12-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
#COPY templates ./templates/
#COPY views ./views/


# Install app dependencies
RUN npm install


#COPY . .

#RUN npm run build

#FROM builder as prod
COPY . .
RUN npm run build

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./


EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]