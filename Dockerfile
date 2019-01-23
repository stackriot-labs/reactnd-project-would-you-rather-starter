FROM node

ENV DEPLOY_USER=node
ENV DEPLOY_USER_HOME=/home/$DEPLOY_USER \
    WORKDIR=$DEPLOY_USER_HOME/would-you-rather \
    SSHDIR=/root/Downloads/ssh \
    PROJECTDIR=/root/Downloads/project \
    GIT_DOMAIN=github.com \
    PORT=8002

RUN apt-get update \
           && apt-get install -y apt-file vim mlocate man-db less \
           && apt-file update \
           && npm install -g create-react-app
           && npm install -g serve

COPY *.sh /usr/local/bin/

ENTRYPOINT start.sh