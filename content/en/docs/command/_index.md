---
title: Commands
description: >
    Ctrl-Q commands.
weight: 30
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## List available commands

If unsure about which command to use, run `ctrl-q help` to get a list of commands available in the Ctrl-Q version you are using.

Using Windows Terminal/PowerShell:

```PowerShell
.\ctrl-q.exe help
```

Using macOS/Linux:

```bash
./ctrl-q help
```

```text
Usage: ctrl-q [options] [command]

Ctrl-Q is a command line utility for interacting with client-managed Qlik Sense Enterprise on Windows servers.
Among other things the tool does bulk import of apps and tasks, manipulates master items and scrambles in-app data.

Version: 3.16.0

Options:
  -V, --version                         output the version number
  -h, --help                            display help for command

Commands:
  app-export [options]                  export Qlik Sense apps to QVF files on disk.
  app-import [options]                  import apps/upload QVF files on disk to Sense based on definitions in Excel file.
  bookmark-get [options]                get info about one or more bookmarks
  connection-test [options]             test connection to Qlik Sense server.
  field-scramble [options]              scramble one or more fields in an app. A new app with the scrambled data is created.
  help [command]                        display help for command
  master-item-dim-delete [options]      delete master dimension(s)
  master-item-dim-get [options]         get info about one or more master dimensions
  master-item-import [options]          create master items based on definitions in a file on disk
  master-item-measure-delete [options]  delete master measure(s)
  master-item-measure-get [options]     get info about one or more master measures
  script-get [options]                  get script from Qlik Sense app
  sessions-delete [options]             delete proxy session(s) on a specific virtual proxy and proxy service
  sessions-get [options]                get info about proxy sessions on one or more virtual proxies
  task-custom-property-set [options]    update a custom property of one or more tasks
  task-get [options]                    get info about one or more tasks
  task-import [options]                 create tasks based on definitions in a file on disk, optionally also importing apps from QVF files.
  task-vis [options]                    visualise task network
  variable-delete [options]             delete one or more variables in one or more apps
  variable-get [options]                get variable definitions in one or more apps
  version [options]                     show version info
```
