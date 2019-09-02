#!/usr/bin/env bash

#
# Run layout tests on Browserstack (Local).
#
# Prerequisites:
#
# 1. Set environment variables BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY.
# 2. Run Browserstack Local client
# 3. Run ng serve
#
galen test layout-tests/tests/app-browserstack.test \
  --parallel-suites 1 \
  --htmlreport "layout-tests/reports" \
  -Dbrowserstack.username=$BROWSERSTACK_USERNAME  \
  -Dbrowserstack.key=$BROWSERSTACK_ACCESS_KEY
