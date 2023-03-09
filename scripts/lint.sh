#!/bin/bash

declare -i LIMIT_ERROR=724
declare -i TOTAL_ERROR=$(yarn run --silent lint | grep 'problems' | grep -o '[0-9]\+' | head -1)

if (( LIMIT_ERROR >= TOTAL_ERROR )); then
   echo -e "OK. O lint encontrou $TOTAL_ERROR erros. O limite é $LIMIT_ERROR."
else
  yarn lint . --ext .ts --ext .tsx --cache

  echo ERROR: Seu código tem mais erros de lint que o permitido.
  exit 1
fi
