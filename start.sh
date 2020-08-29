#!/usr/bin/env bash

# Deploy the web app if the git remote was given
if [ $GIT_REMOTE ]; then
  if [ -z "$(ls "$WORKDIR")" ]; then
   echo "Deploying web app at $GIT_REMOTE to $WORKDIR"

   if [ ! -d $DEPLOY_USER_HOME/.ssh ]; then
    mkdir $DEPLOY_USER_HOME/.ssh \
       && chmod 700 $DEPLOY_USER_HOME/.ssh \
       && ENV_CREATED=1

       if [ $ENV_CREATED ]; then
         echo "Created .ssh for $DEPLOY_USER"
       else
         echo "Could NOT create environment for $DEPLOY_USER"
         exit 1
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
      echo "Found $DEPLOY_USER_HOME/.ssh/id_rsa"
    fi
  else
    echo "SSH key files not found"
    exit 1
  fi

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
fi

# Run the web app's build command
cd "$WORKDIR"

if yarn install; then
    echo "The project has been built!"
    echo "IMPORTANT: Please press Ctrl-P+Q to send the server to the background in order to keep it running."
else
    echo "The project was NOT built"
    exit 1
fi

if [ $GIT_REMOTE ]; then
    # Make and run the production build
    yarn build
    serve -s "$WORKDIR"/build -p $PORT
else
    # Launch the dev server
    yarn start
fi

