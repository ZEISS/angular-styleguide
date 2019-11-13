#!/usr/bin/env bash

#
# Create a layout dump for a given spec.
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

SPECFILE=$1;
[[ ${SPECFILE} =~ ^(.+)\.gspec ]] && SPECNAME=${BASH_REMATCH[1]}

galen dump "layout-tests/specs/$1" \
    --url "http://localhost:4200" \
    --size "1280x720" \
    --export "layout-tests/dumps/${SPECNAME}"
