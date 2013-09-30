# Cakefile

{exec} = require "child_process"

REPORTER = "spec"

task "test", "run all tests", ->
  exec "NODE_ENV=test
    ./node_modules/.bin/mocha
    --reporter #{REPORTER}
    --require test/init.js test/*/*.test.js
    --colors
    --ui bdd
  ", (err, output) ->
    console.error err if err
    console.log output


  # NODE_ENV=test ./node_modules/.bin/mocha --require test/init.js test/*/*.test.js