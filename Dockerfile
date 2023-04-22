FROM node:18-alpine3.16 as common-build-stage

WORKDIR /app

COPY ./package.json .

RUN yarn

COPY . .

EXPOSE 3333
EXPOSE 9229

# Development build stage
FROM common-build-stage as development-build-stage

RUN mv ./scripts/api/init.sh /init.sh  && chmod +x /init.sh

ENV NODE_ENV development

ENTRYPOINT ["/init.sh"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

RUN yarn build

CMD ["yarn", "start"] 
