#!/bin/bash
yarn test

if [ $? -eq 0 ]; then
  echo "[SUCCESS] => tests pass"
else
  echo "[ERROR] => Tests failed. Please fix before push."
  exit 1
fi