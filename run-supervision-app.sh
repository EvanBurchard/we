#! /bin/bash

# Script to run app.js with supervision and ignore folders
supervisor -i .tmp/,.git/,node_modules/,views/,assets/images/,assets/linker/templates,assets/templates,assets/js/angularjs,assets/app/main.js app.js
#supervisor -i .tmp/,.git/,node_modules/,views/ -- --debug=5555 app.js
