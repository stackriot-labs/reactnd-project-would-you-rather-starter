#!/usr/bin/env bash

    cat >> $DEPLOY_USER_HOME/.profile <<EOS
export DEPLOY_USER=$DEPLOY_USER
export DEPLOY_USER_HOME=$DEPLOY_USER_HOME
export WORKDIR=$WORKDIR
export GIT_REMOTE=$GIT_REMOTE
export PORT=$PORT

cd $WORKDIR
EOS

if [ $NEWUID ]; then
  echo "Setting $DEPLOY_USER uid to $NEWUID"
  usermod --uid $NEWUID $DEPLOY_USER
fi

# Deploy the web app if the git remote was given
if [ $GIT_REMOTE ]; then
  if [ -z "$(ls "$WORKDIR")" ]; then
   echo "Deploying web app at $GIT_REMOTE to $WORKDIR"

   if [ ! -d $DEPLOY_USER_HOME/.ssh ]; then
    mkdir -p $DEPLOY_USER_HOME/.ssh \
       && chmod 700 $DEPLOY_USER_HOME/.ssh \
       && ENV_CREATED=1

       if [ $ENV_CREATED ]; then
         echo "Created .ssh for $DEPLOY_USER"
       else
         echo "Could NOT create environment for $DEPLOY_USER"
       fi
   else
    echo "Found .ssh for $DEPLOY_USER"
   fi

   if [ -e $SSHDIR/id_rsa ]; then
    if ! [ -e $DEPLOY_USER_HOME/.ssh/id_rsa ]; then
        echo "Copying SSH key files..."
        cp $SSHDIR/id_rsa* $DEPLOY_USER_HOME/.ssh
        chmod 600 $DEPLOY_USER_HOME/.ssh/*
        chown -R $DEPLOY_USER: $DEPLOY_USER_HOME/.ssh
    else
      touch $DEPLOY_USER_HOME/.ssh/id_rsa
      touch $DEPLOY_USER_HOME/.ssh/id_rsa.pub
      echo "Found $DEPLOY_USER_HOME/.ssh/id_rsa"
    fi
  else
    echo "SSH key files not found"
  fi

  echo "ssh-keyscan $GIT_DOMAIN >> ~/.ssh/known_hosts || true \
     && git clone $GIT_REMOTE $WORKDIR" | su - $DEPLOY_USER --shell=/bin/bash \
     && CODE_DEPLOYED=1

     if ! [ $CODE_DEPLOYED ]; then
       echo "Could NOT deploy code."
     fi
 else
   echo "$WORKDIR contains files"
 fi
fi

# Run the web app's build command
cd "$WORKDIR"

echo "yarn install" | su - $DEPLOY_USER --shell=/bin/bash && APP_INSTALLED=1

if [ $APP_INSTALLED ]; then
    echo "The project has been built!"
    echo "IMPORTANT: Please press Ctrl-P+Q to send the server to the background in order to keep it running."
else
    echo "The project was NOT built"
fi

if [ $GIT_REMOTE ]; then
    # Make and run the production build
    echo "yarn build \
    && serve -s "$WORKDIR"/build -p $PORT" | su - $DEPLOY_USER --shell=/bin/bash
else
    # Launch the dev server
    echo "yarn start" | su - $DEPLOY_USER --shell=/bin/bash 
fi

