#!/usr/bin/env bash

set -e

MODULE_NAME="$1"

if [ -z "$MODULE_NAME" ]; then
  echo -e "New module name (eg. 'pricemonitor.feed'):\n"
  read -r -p "> " -e MODULE_NAME
  echo
fi

if [ -z "$MODULE_NAME" ]; then
  echo "Usage: $0 NEW_MODULE_NAME" 1>&2; 
  exit 1
fi

MODULE_NAME_UNDERSCORE=$(echo "$MODULE_NAME" | sed 's/\./-/g')
MODULE_NAME_POINT=$(echo "$MODULE_NAME" | sed 's/-/\./g')
NEW_MODULE_FOLDER="../$MODULE_NAME_UNDERSCORE"

if [ -d "$NEW_MODULE_FOLDER" ]; then
  echo "Folder '$NEW_MODULE_FOLDER' already exists. Please remove it before executing this command. Exiting" 1>&2;
  exit 1
fi

echo "Installing dependencies before copying"
yarn

echo "Copying '../pricemonitor-skeleton' to '$NEW_MODULE_FOLDER'"
cp -r ../pricemonitor-skeleton "$NEW_MODULE_FOLDER"

FILES=$(find $NEW_MODULE_FOLDER -type f | grep -v 'node_modules')

for x in $FILES; do
  sed -i "s/pricemonitor-skeleton/${MODULE_NAME_UNDERSCORE}/g" "$x"
  sed -i "s/pricemonitor\.skeleton/${MODULE_NAME_POINT}/g" "$x"
done

cp "$NEW_MODULE_FOLDER/utils/README.module.md" "$NEW_MODULE_FOLDER/README.md"

echo "Finished!"