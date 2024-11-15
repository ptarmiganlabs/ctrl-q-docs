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

Version: 4.0.0

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  help [command]  display help for command
  qscloud
  qseow
```

The `help` command and `--help` option can both be used to get more information about a command.  

For example, to get more information about the `qseow` command, either of these commands can be used (Windows):

- `.\ctrl-q.exe help qseow`
- `.\ctrl-q.exe qseow --help`

```text
Usage: ctrl-q qseow [options] [command]

Options:
  -h, --help                                display help for command

Commands:
  user-activity-bucket-cp-create [options]  create custom property and populate it with values ("activity buckets") indicating how long ago users last logged into Sense
  master-item-import [options]              create master items based on definitions in a file on disk
  master-item-measure-get [options]         get info about one or more master measures
  master-item-measure-delete [options]      delete master measure(s)
  master-item-dim-get [options]             get info about one or more master dimensions
  master-item-dim-delete [options]          delete master dimension(s)
  variable-get [options]                    get variable definitions in one or more apps
  variable-delete [options]                 delete one or more variables in one or more apps
  field-scramble [options]                  scramble one or more fields in an app. A new app with the scrambled data is created.
  script-get [options]                      get script from Qlik Sense app
  bookmark-get [options]                    get info about one or more bookmarks
  task-get [options]                        get info about one or more tasks
  task-custom-property-set [options]        update a custom property of one or more tasks
  task-import [options]                     create tasks based on definitions in a file on disk, optionally also importing apps from QVF files.
  app-import [options]                      import apps/upload QVF files on disk to Sense based on definitions in Excel file.
  app-export [options]                      export Qlik Sense apps to QVF files on disk.
  connection-test [options]                 test connection to Qlik Sense server.
  version [options]                         show version info
  task-vis [options]                        visualise task network
  session-get [options]                     get info about proxy sessions on one or more virtual proxies
  session-delete [options]                  delete proxy session(s) on a specific virtual proxy and proxy service
  help [command]                            display help for command
```
