#!/usr/bin/env bash

#
# Check one spec on a local browser.
#
# Prerequisites:
#
# 1. Set browser and headless mode in galen.config (default: Firefox)
# 2. Download webdrivers for that browser (not needed on Firefox)
# 3. Run ng serve
#

if (( $# != 1 ))
then
  echo "Usage: $(basename "$0") <my.gspec>"
  exit 1
fi

npm run galen -- check "layout-tests/specs/$1" \
    --url "http://localhost:4200" \
    --size "1280x720" \
    --include "desktop" \
    --htmlreport "layout-tests/reports"
#    --javascript "some.js"
#    --exclude "toexclude"
#    --section "Some section name"
#    --htmlreport "htmlreport-dir"
#    --testngreport "testng-report.xml"
#    --jsonreport "jsonreport-dir"
#    --junitreport "junit-report.xml"
#    --config "path/to/galen.config"
