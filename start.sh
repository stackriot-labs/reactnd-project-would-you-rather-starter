#!/usr/bin/env bash

# Deploy the web app if the git remote was given
if [ $GIT_REMOTE ]; then
  if [ -e $SSHDIR/id_rsa ] && [ -e $SSHDIR/id_rsa.pub ]; then
    if ! [ -e $DEPLOY_USER_HOME/.ssh/id_rsa ]; then
        echo "Copying SSH key files..."
        cp $SSHDIR/id_rsa* $DEPLOY_USER_HOME/.ssh
        chmod 600 $DEPLOY_USER_HOME/.ssh/*
        chown -R $DEPLOY_USER: $DEPLOY_USER_HOME/.ssh
    else
      echo "Found $DEPLOY_USER_HOME/.ssh/id_rsa"
    fi
  else
    echo "SSH key files not found"
    exit 1
  fi

  if [ -z "$(ls "$WORKDIR")" ]; then
   echo "Deploying web app at $GIT_REMOTE to $WORKDIR"

   echo "ssh-keyscan $GIT_DOMAIN >> ~/.ssh/known_hosts \
     && git clone $GIT_REMOTE $WORKDIR" | su - $DEPLOY_USER --shell=/bin/bash \
     && CODE_DEPLOYED=1

     if ! [ $CODE_DEPLOYED ]; then
       echo "Could NOT deploy code."
       exit 1
     fi
 else
   echo "$WORKDIR contains files"
 fi

 # Run the web app's build command
 cd "$WORKDIR"
 if screen -dmS would-you-rather "serve -s build -p $PORT"; then
    echo "The project should now be running"
 else
    echo "The project is NOT running"
    exit 1
 fi
fi