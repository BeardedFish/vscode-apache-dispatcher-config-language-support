# Development

The `Apache Dispatcher Config Language Support for Visual Studio Code` extension is broken into two parts:
- Client
- Server

The source code for the client can be found in the [client directory](./client/). The source code for the server can be found in the [server directory](./server/).

## How To Build

If this is the first time you are building the `Apache Dispatcher Config Language Support for Visual Studio Code` extension, you will first need to install the dependencies. This can be achieved by running the following command:

```
npm run install-dependencies
```

Once all the dependencies are installed, you can build the production artifacts by running the following command:

```
npm run build
```

## How to Test

Assuming the commands in the [How To Build](#how-to-build) section were executed, execute the following command in the root directory:

```
npm run test
```

The tests for this project are defined in the [test directory](./test/).

You can then package the extension via the [vsce](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce) command-line tool.
