#! /bin/bash

cd ../ && tar --exclude='./server/node_modules/' -cvzf dist.tar.gz dist/ server/ package.json && gcloud compute scp ./dist.tar.gz nlccoc:~/ && gcloud compute ssh nlccoc -- "sudo mkdir /var/www/nlccoc && sudo tar zxvf ~/dist.tar.gz -C /var/www/nlccoc && cd /var/www/nlccoc && sudo npm install --unsafe-perm"