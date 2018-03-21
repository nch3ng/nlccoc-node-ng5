nvm install node

node --version

npm --version

nvm --version

export CRHOME_BIN=chromium-browser
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start

npm install
npm install angular-cli@latest -g
cd nlccoc-node-ng5 && ng build --prod && karma start karma.conf.js