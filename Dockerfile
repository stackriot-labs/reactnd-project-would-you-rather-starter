FROM node

ENV DEPLOY_USER=node
ENV DEPLOY_USER_HOME=/home/$DEPLOY_USER
ENV WORKDIR=$DEPLOY_USER_HOME/would-you-rather \
    SSHDIR=/root/Downloads/ssh \
    GIT_DOMAIN=github.com \
    PORT=8003

COPY *.sh /usr/local/bin/
COPY .ssh/id_* "$SSHDIR"/

RUN apt-get update \
           && apt-get install -y apt-file vim mlocate man-db less \
           && apt-file update \
           && npm install -g create-react-app \
           && npm install -g serve \
           && mkdir "$WORKDIR" \
           && chown $DEPLOY_USER: "$WORKDIR" \
           && chmod +x /usr/local/bin/*.sh

WORKDIR "$WORKDIR"

VOLUME "$WORKDIR"

ENTRYPOINT start.sh