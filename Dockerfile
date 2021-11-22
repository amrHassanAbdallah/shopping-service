
FROM node:12.12.0-alpine
RUN mkdir -p /opt/app/build
WORKDIR /opt/app
COPY . .
RUN npm install


CMD npm run migrate
RUN npm run tsc

RUN adduser -S app
CMD chown -R app /opt/app
USER app
EXPOSE 3000

CMD [ "npm", "run", "prod" ]