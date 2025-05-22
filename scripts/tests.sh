#!/bin/bash
yarn test

if [ $? -eq 0 ]; then
  echo "[SUCCESS] => tests pass"
else
  echo ""
  echo ""
  echo "[ERROR] => Tests failed. Please fix before push."
  echo ""
  echo ""
fi