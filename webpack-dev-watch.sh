#!/usr/bin/bash

npx webpack --entry ./assets/js/app.js --env dev --mode development --output-path ./dist/ --node-env dev --watch
