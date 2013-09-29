#! /bin/bash

# Script to run app.js with supervision and ignore folders
supervisor -i .tmp/,.git/,node_modules/,views/ app.js