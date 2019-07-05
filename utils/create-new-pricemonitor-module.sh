#!/usr/bin/env bash

set -e

printmsg() {
    echo -e "\n############## $1"
}


PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd )"

MODULE_NAME="$1"

if [ -z "$MODULE_NAME" ]; then
  printmsgsubl subk "New module name (eg. 'pricemonitor.feed'):\n"
  read -r -p "> " -e MODULE_NAME
  echo
fi

if [ -z "$MODULE_NAME" ]; then
  printmsg "Usage: $0 NEW_MODULE_NAME" 1>&2;
  exit 1
fi

MODULE_NAME_UNDERSCORE=$(echo "$MODULE_NAME" | sed 's/\./-/g')
MODULE_NAME_POINT=$(echo "$MODULE_NAME" | sed 's/-/\./g')
NEW_MODULE_FOLDER="../$MODULE_NAME_UNDERSCORE"

if [ -d "$NEW_MODULE_FOLDER" ]; then
  printmsg "Folder '$NEW_MODULE_FOLDER' already exists. Please remove it before executing this command. Exiting" 1>&2;
  exit 1
fi

printmsg "Copying '$PROJECT_ROOT' to '$NEW_MODULE_FOLDER'"
cp -r "$PROJECT_ROOT" "$NEW_MODULE_FOLDER"

cd "$NEW_MODULE_FOLDER"

printmsg "Cleaning up"
yarn clean
printmsg "Installing dependencies"
yarn

FILES=$(find . -type f | grep -v 'node_modules')

for x in $FILES; do
  sed -i "s/pricemonitor-skeleton/${MODULE_NAME_UNDERSCORE}/g" "$x"
  sed -i "s/pricemonitor\.skeleton/${MODULE_NAME_POINT}/g" "$x"
done

git remote remove origin

printmsg "Removed git remote origin. You can now add your own repository remote, e.g. 'git remote add origin git@github.com:...'"
printmsg "Your module folder is: '$(pwd)'"
