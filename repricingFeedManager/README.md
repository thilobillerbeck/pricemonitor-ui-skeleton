# pricemonitor-ui AngularJS module skeleton

This project contains a seed project for the development of [Patagona Pricemonitor](https://patagona.de/) AngularJS modules.

To ease the development process it only contains the necessary bootstrap code:
- an `example` folder
    - to test the library (`lib`) and provide an example
    - this folder will not be used when using this library and is only for development purposes
- a `lib` folder
    - contains all your library code
    - all components are defined here
    
When starting to develop a Pricemonitor module you use this project as a starting point.

:pencil: This repository only contains the seed project. When developing a specific module you clone/copy this repo and adapt it accordingly, see [`utils/create-new-pricemonitor-module.sh`](utils/create-new-pricemonitor-module.sh).

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

## ToDos
- Add CI/CD
- Explain `utils/create-new-pricemonitor-module.sh`