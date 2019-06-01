#!/usr/bin/env bash

rm -r dist

yarn

yarn dev:lib &
pid="$!"

yarn dev:example
kill "$pid"
