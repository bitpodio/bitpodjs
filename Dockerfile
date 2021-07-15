FROM nikolaik/python-nodejs:python3.8-nodejs12-alpine
#FROM node:current-alpine
RUN apk --no-cache add git curl

ARG PUBLIC_PATH

ARG PUBLIC_DOMAIN

ARG SITE_ID

ARG BITPOD__USERINFO_ENDPOINT_URL

ENV app="/home/app" PUBLIC_PATH=$PUBLIC_PATH PUBLIC_DOMAIN=$PUBLIC_DOMAIN SITE_ID=$SITE_ID BITPOD__USERINFO_ENDPOINT_URL=$BITPOD__USERINFO_ENDPOINT_URL

WORKDIR "$app"

COPY ["package.json","yarn.lock", "$app/"]

RUN yarn install

COPY ["/","$app/"]

RUN yarn build

EXPOSE 3000

CMD yarn start
