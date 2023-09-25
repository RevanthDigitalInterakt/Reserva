#!/bin/bash

OUTPUT_SYNC=""
OUTPUT_CHANGELOG=""
OUTPU_LINT=""
HAS_ERROR=false
# Name of the main branch for comparison (could be main, master, trunk, etc.)
BRANCH1="trunk"

# Get the name of the current branch
BRANCH2=$(git symbolic-ref --short HEAD)

# Name of the file to be checked
FILE_NAME="CHANGELOG.md"


#------ Check sync trunk ------#
if [ -z "$BRANCH2" ]; then
  echo "Could not determine the current branch. Make sure you are in a branch."
  exit 1
fi


#------ Check Changelog ------#
# Update the local information of the branches
git fetch origin

# Try to find the latest commit in the trunk branch and the current branch (check remote first, then local)
LAST_TRUNK_COMMIT=$(git rev-parse origin/$BRANCH1 2>/dev/null || git rev-parse $BRANCH1 2>/dev/null)
LAST_BRANCH_COMMIT=$(git rev-parse $BRANCH2 2>/dev/null || git rev-parse $BRANCH2 2>/dev/null)

# Check if the current branch is synced of the trunk
if [ $(git merge-base $BRANCH1 $BRANCH2) == "$LAST_TRUNK_COMMIT" ]; then
  OUTPUT_SYNC="[SUCCESS] => The branch $BRANCH2 is synced of $BRANCH1."

else 
  OUTPUT_SYNC="[ERROR] => The branch $BRANCH2 is not synced with $BRANCH1."
  HAS_ERROR=true
fi

git fetch origin

git diff --name-only $BRANCH1..$BRANCH2 | grep "^$FILE_NAME$" > /dev/null 2>&1

STATUS=$?

if [ $STATUS -eq 0 ]; then
  OUTPUT_CHANGELOG="[SUCCESS] => $FILE_NAME updated"
else
  OUTPUT_CHANGELOG="[ERROR] => It is mandatory to update your $FILE_NAME"
    HAS_ERROR=true
fi


#------ Check lint ------#
declare -i LIMIT_ERROR=221
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
echo $OUTPUT_SYNC
echo ""
echo $OUTPUT_CHANGELOG
echo ""
echo $OUTPU_LINT
echo ""
echo ""

if [ "$HAS_ERROR" = true ]; then
  exit 1
else
  echo ""
  echo "Unit tests in progress."
  echo ""
fi

