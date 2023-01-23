#!/bin/bash

declare -i IS_SYNCED_BRANCH_TO_DEVELOP=$(git rev-list --left-only --count origin/develop...)
CURRENT_BRANCH_NAME=$(git branch --show-current)

if (( $IS_SYNCED_BRANCH_TO_DEVELOP == 0 )); then
   echo -e "OK. Branch [$CURRENT_BRANCH_NAME] atualizada com a [origin/develop]"
else
  echo -e "ERROR: Branch [$CURRENT_BRANCH_NAME] desatualizada com a [origin/develop]".
  exit 1
fi
