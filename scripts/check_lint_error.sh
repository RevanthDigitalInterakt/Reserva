#!/bin/bash

OUTPU_LINT=""
HAS_ERROR=false

#------ Check lint ------#
declare -i LIMIT_ERROR=258
declare -i TOTAL_ERROR=$(yarn run --silent lint | grep 'problems' | grep -o '[0-9]\+' | head -1)

if (( LIMIT_ERROR < TOTAL_ERROR )); then
  OUTPU_LINT="[ERROR] => Your code contains $TOTAL_ERROR errors. The limit is $LIMIT_ERROR".
  HAS_ERROR=true
else
  OUTPU_LINT="[SUCCESS] => lint pass"
fi

#------- output ------#
echo ""
echo ""
echo $OUTPU_LINT
echo ""
echo ""

if [ "$HAS_ERROR" = true ]; then
  exit 1
fi

