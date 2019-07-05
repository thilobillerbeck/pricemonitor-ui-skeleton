# pricemonitor-ui AngularJS module skeleton

## Instructions
:warning: Warning: The `lib` and `example` code is compiled separately.

Only once or when dependencies are added:
```bash
yarn
```

To start compiling both `lib` and `example`
```bash
./utils/dev.sh
```
This will start a webserver and show the AngularJS application residing in `example`.

:pencil: It will re-compile on file changes

To build the `lib`
```bash
yarn build:lib
```

## Dependencies

This project depends on the `pricemonitor-core` and `pricemonitor-share` libraries which are hosted on AWS S3. To see all available versions, visit the [assets page](https://s3-eu-west-1.amazonaws.com/patagona.ui.assets).
