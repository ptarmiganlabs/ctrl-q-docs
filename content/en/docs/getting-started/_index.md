---
title: Getting Started
description: Getting started with Ctrl-Q
# categories: [Examples, Placeholders]
# tags: [test, docs]
weight: 20
---

<!-- {{% pageinfo %}}
{{% /pageinfo %}} -->

## Download and install

There is no need to install Ctrl-Q. Just download and run.  
The GitHub release page has ready-to-run binaries for Windows, macOS and Linux.

The macOS binary is security scanned and signed by Apple, using their standard notarization process.
This means you won't get those annoying unsigned-app-warnings when using the app on macOS.

The Windows binary is signed by an official/commercial app signing certificate that can be verified when needed.  

## Logging

Logging is controlled by the --log-level option.

Valid values are (in order of increasing verbosity): error, warn, info, verbose, debug, silly.

Note: When using log level silly all websocket communication to/from the Sense server will be logged to the console. This means _lots_ of log output.
