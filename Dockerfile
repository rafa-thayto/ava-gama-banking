FROM keymetrics/pm2:latest
ENV NODE_ENV production
WORKDIR /usr/src/api
CMD ["pm2-docker", "package.json"]