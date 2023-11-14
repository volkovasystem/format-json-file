#!/usr/bin/env bash

BUILD_MODULE_FILE_PATH="$MODULE_ROOT_DIRECTORY_PATH/.build/$MODULE_NAMESPACE_VALUE.js";
MODULE_FILE_PATH="$MODULE_ROOT_DIRECTORY_PATH/$MODULE_NAMESPACE_VALUE.js";

[[ -f "$BUILD_MODULE_FILE_PATH" ]] &&	\
mv --force "$BUILD_MODULE_FILE_PATH" "$MODULE_FILE_PATH";

return 0;
