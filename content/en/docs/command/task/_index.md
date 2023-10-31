---
title: Tasks
description: >
    Reload, external program and user sync tasks.
weight: 70
tags: [task]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [List tasks as tree](#list-tasks-as-tree)
  - [Tree icons](#tree-icons)
  - [Text color](#text-color)
  - [Task tree details](#task-tree-details)
  - [Save tree to disk file](#save-tree-to-disk-file)
- [List tasks as table](#list-tasks-as-table)
  - [Show task table on screen](#show-task-table-on-screen)
  - [Save task to disk file in tabular format](#save-task-to-disk-file-in-tabular-format)
  - [Save task to disk file as JSON](#save-task-to-disk-file-as-json)

---

## List tasks as tree

This command provides a hierarchical tree view of reload tasks and external program tasks, similar to what is available in QlikView.

The tree view can be enhanced with colours (see [this page](/docs/getting-started/colors-formatting/)) and task details.

There are quite a few customisation options available when creating a task tree.  
Note that some options are used when creating task tables, these are not applicable for task trees. Ctrl-Q will show an error when invalid combinations of options are used.

Here [Windows Terminal](https://github.com/microsoft/terminal) is used to run Ctrl-Q.
Let's first take a look at the options for the`task-get` command:

```powershell
.\ctrl-q.exe task-get --help
```

```text
Usage: build task-get [options]

get info about one or more tasks

Options:
  --log-level <level>            log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                  Qlik Sense server IP/FQDN
  --port <port>                  Qlik Sense repository service (QRS) port (default: "4242")
  --schema-version <string>      Qlik Sense engine schema version (default: "12.612.0")
  --virtual-proxy <prefix>       Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>          connection to Qlik Sense engine is via https (default: true)
  --auth-user-dir <directory>    user directory for user to connect with
  --auth-user-id <userid>        user ID for user to connect with
  -a, --auth-type <type>         authentication type (choices: "cert", default: "cert")
  --auth-cert-file <file>        Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>    Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>   Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --task-type <type...>          type of tasks to list (choices: "reload", "ext-program", default: ["reload"])
  --task-id <ids...>             use task IDs to select which tasks to retrieve. Only allowed when --output-format=table
  --task-tag <tags...>           use tags to select which tasks to retrieve. Only allowed when --output-format=table
  --output-format <format>       output format (choices: "table", "tree", default: "tree")
  --output-dest <dest>           where to send task info (choices: "screen", "file", default: "screen")
  --output-file-name <name>      file name to store task info in (default: "")
  --output-file-format <format>  file type/format (choices: "excel", "csv", "json", default: "excel")
  --output-file-overwrite        overwrite output file without asking
  --text-color <show>            use colored text in task views (choices: "yes", "no", default: "yes")
  --tree-icons                   display task status icons in tree view
  --tree-details [detail...]     display details for each task in tree view (choices: "taskid", "laststart", "laststop", "nextstart", "appname", "appstream", default: "")
  --table-details [detail...]    which aspects of tasks should be included in table view (choices: "common", "extprogram", "lastexecution", "tag", "customproperty", "schematrigger",
                                 "compositetrigger", "comptimeconstraint", "comprule", default: "")
  -h, --help                     display help for command
```

Note:  
Task trees are currently an all-or-nothing feature.  
It is **not** possible to use the `--task-id` or `--task-tag` options when showing task trees.

### Tree icons

If `--tree-icons` is used when starting Ctrl-Q emojis will be used to indicate the last known state for each task.

The used emojis are

|     | Descriptions                                                                                            |
| --- | ------------------------------------------------------------------------------------------------------- |
| ⏰  | Shown at the top of the tree of scheduled tasks. All tasks below this node have a time-based scheduled. |
| ✅  | Finished successfully.                                                                                  |
| ❌  | Failed                                                                                                  |
| 🚫  | Skipped                                                                                                 |
| 🛑  | Aborted                                                                                                 |
| 💤  | Never started                                                                                           |
| ❔  | Unknown                                                                                                 |

### Text color

If `--text-color yes` is specified (`yes` is also the default value) colors will be used to make the created tree more readable.  
`--text-color no` will create a plain-text tree (no colors).

### Task tree details

The `--tree-details` option makes it possible to switch on/off individual task details. This can be useful to make the task tree easier to read.  
The allowed values for this option are `taskid`, `laststart`, `laststop`, `nextstart`, `appname`, `appstream`.

Let's say we want a task tree with the app name and next start time for the task:

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host 192.168.100.109 `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format tree `
--output-dest screen `
--tree-icons `
--text-color yes `
--tree-details nextstart appname
```

![Qlik Sense task tree 5](/img/task-tree-color-details-2_65.png "Qlik Sense task tree with task details and colors")

### Save tree to disk file

Under the hood the task tree is stored as a JSON structure.  
It's possible to save this JSON to disk:

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host 192.168.100.109 `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format tree `
--output-dest file `
--tree-details appname `
--output-file-name tasktree.json `
--output-file-format json
```

```text
2023-09-27T04:29:55.997Z info: -----------------------------------------------------------
2023-09-27T04:29:55.997Z info: | Ctrl-Q
2023-09-27T04:29:56.013Z info: |
2023-09-27T04:29:56.013Z info: | Version      : 3.13.1
2023-09-27T04:29:56.013Z info: | Log level    : info
2023-09-27T04:29:56.013Z info: |
2023-09-27T04:29:56.013Z info: | Command      : task-get
2023-09-27T04:29:56.013Z info: |              : get info about one or more tasks
2023-09-27T04:29:56.013Z info: |
2023-09-27T04:29:56.013Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T04:29:56.013Z info: |
2023-09-27T04:29:56.013Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T04:29:56.013Z info: ----------------------------------------------------------
2023-09-27T04:29:56.013Z info:
2023-09-27T04:29:56.247Z info: Successfully retrieved 25 tags from QSEoW
2023-09-27T04:29:57.482Z warn: Downstream task in task tree not found. From: node-16371e9f-7a54-49fc-b979-1a5171ac8199, to: c5cc047d-e520-4ccb-b88f-ac4f9d49d4be
2023-09-27T04:30:00.544Z info:
2023-09-27T04:30:00.544Z info: ✅ Writing task tree to disk file "tasktree.json".
```

Running the same command again, when the destination file already exists, results in a question to overwrite the file:

```text
2023-09-27T04:31:00.691Z info: -----------------------------------------------------------
2023-09-27T04:31:00.691Z info: | Ctrl-Q
2023-09-27T04:31:00.707Z info: |
2023-09-27T04:31:00.707Z info: | Version      : 3.13.1
2023-09-27T04:31:00.707Z info: | Log level    : info
2023-09-27T04:31:00.707Z info: |
2023-09-27T04:31:00.707Z info: | Command      : task-get
2023-09-27T04:31:00.707Z info: |              : get info about one or more tasks
2023-09-27T04:31:00.707Z info: |
2023-09-27T04:31:00.707Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T04:31:00.707Z info: |
2023-09-27T04:31:00.707Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T04:31:00.707Z info: ----------------------------------------------------------
2023-09-27T04:31:00.707Z info:
2023-09-27T04:31:00.816Z info: Successfully retrieved 25 tags from QSEoW
2023-09-27T04:31:01.800Z warn: Downstream task in task tree not found. From: node-6d2ae9de-0955-42a5-8d7a-28003e0196e7, to: c5cc047d-e520-4ccb-b88f-ac4f9d49d4be
2023-09-27T04:31:01.800Z info:
                                  Destination file "tasktree.json" exists. Do you want to overwrite it? (y/n) y
2023-09-27T04:31:02.738Z info:
2023-09-27T04:31:02.738Z info: ✅ Writing task tree to disk file "tasktree.json".
```

To forcibly overwrite the destination file the `--output-file-overwrite` option can be specified.

## List tasks as table

This command provides a tabular view of tasks.  
Tags, custom properties, schedules, triggers and references to other tasks are all included in the table.
This tabular task view can be shown on screen or saved to disk as Excel or CSV files.

The idea is that all information needed to recreate the tasks should be included in the table.  
In reality a few more fields are included, for example app name for the app associated with a task.

The table view can be enhanced with colours (see [this page](/docs/getting-started/colors-formattin)) and task details.

There are quite a few customisation options available when creating a task tree.  
Note that some options are used when creating task tables, these are not applicable for task trees. Ctrl-Q will show an error when invalid combinations of options are used.

### Show task table on screen

Show a list of tasks on screen, including main task fields as well as any tags defined for the tasks.

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host 192.168.100.109 `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format table `
--output-dest screen `
--task-type reload ext-program `
--table-details common tag extprogram
```

Note:  
It's possible to get more information about tasks by adding additional values to the `--table-details` option.  
Run `.\ctrl-q.exe task-get --help` to show a complete list of all options and their allowed values.

If `--table-details` is not specified all available information will be showed about the tasks.  
This will result in a *very* wide table!

```text
2023-09-27T04:31:54.395Z info: -----------------------------------------------------------
2023-09-27T04:31:54.395Z info: | Ctrl-Q
2023-09-27T04:31:54.395Z info: |
2023-09-27T04:31:54.395Z info: | Version      : 3.13.1
2023-09-27T04:31:54.395Z info: | Log level    : info
2023-09-27T04:31:54.395Z info: |
2023-09-27T04:31:54.411Z info: | Command      : task-get
2023-09-27T04:31:54.411Z info: |              : get info about one or more tasks
2023-09-27T04:31:54.411Z info: |
2023-09-27T04:31:54.411Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T04:31:54.411Z info: |
2023-09-27T04:31:54.411Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T04:31:54.411Z info: ----------------------------------------------------------
2023-09-27T04:31:54.411Z info:
2023-09-27T04:31:54.598Z info: Successfully retrieved 25 tags from QSEoW
2023-09-27T04:31:56.020Z info: # rows in table: 58
2023-09-27T04:31:56.020Z info: # reload tasks in table: 52
2023-09-27T04:31:56.020Z info: # external program tasks in table: 6
2023-09-27T04:31:56.130Z info:
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ # reload tasks: 52, # external program tasks: 6, # rows in table: 58                                                                                                                                                                                                                                                                                                                                                                                                             │
├──────────────┬──────────────────┬──────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────┬──────────────┬──────────────┬──────────────┬──────────────────────────────────────┬────────────────┬────────────────────┬───────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────┤
│ Task counter │ Task type        │ Task name                                                                │ Task id                              │ Task enabled │ Task timeout │ Task retries │ App id                               │ Partial reload │ Manually triggered │ Path                                                      │ Parameters                                                                  │ Tags                                                     │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 1            │ External program │ App snapshots end of September 2022                                      │ c5cc047d-e520-4ccb-b88f-ac4f9d49d4be │ true         │ 60           │ 1            │                                      │                │                    │ powershell.exe                                            │ -File \\pro2-win1\c$\tools\script\qs_archive_apps_to_stream_end_of_sept.ps1 │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 2            │ External program │ Ext program task chaining 1                                              │ 4ce41cf3-bc6a-4f66-ad00-ffdeb9a7e468 │ true         │ 15           │ 0            │                                      │                │                    │ powershell.exe                                            │ -File \\host1\c$\tools\script\ext_task_1.ps1                            │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 3            │ External program │ Node-RED ext program task demo 1                                         │ d6bfc66a-393b-4eea-8ecd-1b1629c91683 │ true         │ 30           │ 0            │                                      │                │                    │ powershell.exe                                            │                                                                             │ Ctrl-Q demo                                              │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 4            │ External program │ PowerShell export data connections                                       │ e7b8d484-5297-4caf-a727-38200905171e │ true         │ 15           │ 1            │                                      │                │                    │ powershell                                                │ -File \\host1\c$\tools\script\qs_export_data_connections.ps1            │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 5            │ External program │ PowerShell export tags (ext pgm task)                                    │ 1d5dc4c1-8bd3-455a-9e6a-873da103a950 │ true         │ 15           │ 0            │                                      │                │                    │ powershell                                                │ -File \\host1\c$\tools\script\qs_export_tags_cps.ps1                    │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 6            │ External program │ Sample external task                                                     │ 7d4617cd-a9d5-433a-8c82-742e58bfb38b │ true         │ 1440         │ 0            │                                      │                │                    │ C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe │ c:\tools\script\ext_task_1.ps1                                              │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 7            │ Reload           │ Butler test failing reloads 1 task                                       │ eb018d95-8c0c-4613-9081-82b3822ecca2 │ true         │ 1440         │ 0            │ 4788dc51-2bf6-45f0-a4ad-8bd8d40e1d3f │                │ true               │                                                           │                                                                             │ startTask1 / Ctrl-Q demo                                 │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 8            │ Reload           │ Manually triggered reload of Always failing reload (no delay)            │ 0d815a99-1ca3-4131-a398-6878bd735fd8 │ true         │ 1440         │ 0            │ deba4bcf-47e4-472e-97b2-4fe8d6498e11 │                │ true               │                                                           │                                                                             │ api2 / 👍😎 updateSheetThumbnail / Tag with spaces in it │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
...
...
```

The `--task-id` and `--task-tag` options take a list of task IDs and tags, respectively.  
When used only the tasks matching the specified task IDs and tags will be included in the created table.  
These options can be used both when showing the task table on screen and when storing it on disk.

Example command using these options. Note the double quotes around the task tags:

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host 192.168.100.109 `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format table `
--output-dest screen `
--table-details common tag `
--task-id e3b27f50-b1c0-4879-88fc-c7cdd9c1cf3e 09b3c78f-04dd-45e3-a4bf-1b074d6572fa `
--task-tag "Demo apps" "Finance" "Sales forecast"
```

### Save task to disk file in tabular format

Saving a task table to disk file (Excel and CSV file formats supported) is done via the `task-get` command, adding `--output-format table`, `--output-dest file`, `--output-file-format csv` and `--output-file-name <filename>` options.  
Here the most common task fileds together with task tags are included in the table written to a CSV file:

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host 192.168.100.109 `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format table `
--output-dest file `
--table-details common tag `
--output-file-format csv `
--output-file-name tasktable.csv
```

````text
2023-09-27T04:36:21.402Z info: -----------------------------------------------------------
2023-09-27T04:36:21.402Z info: | Ctrl-Q
2023-09-27T04:36:21.402Z info: |
2023-09-27T04:36:21.402Z info: | Version      : 3.13.1
2023-09-27T04:36:21.402Z info: | Log level    : info
2023-09-27T04:36:21.402Z info: |
2023-09-27T04:36:21.402Z info: | Command      : task-get
2023-09-27T04:36:21.402Z info: |              : get info about one or more tasks
2023-09-27T04:36:21.402Z info: |
2023-09-27T04:36:21.402Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T04:36:21.402Z info: |
2023-09-27T04:36:21.402Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T04:36:21.402Z info: ----------------------------------------------------------
2023-09-27T04:36:21.402Z info:
2023-09-27T04:36:21.512Z info: Successfully retrieved 25 tags from QSEoW
2023-09-27T04:36:22.497Z info:
2023-09-27T04:36:25.857Z info: ✅ Writing task table to disk file "tasktable.csv".```
````

### Save task to disk file as JSON

If task defintions should be read by some other system the task definitions can be saved as JSON.  
Here only the most basic task info included via the `--table-details` option.

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host 192.168.100.109 `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format table `
--output-dest file `
--table-details common `
--output-file-format json `
--output-file-name tasks.json
```

```text
2023-09-27T04:37:10.344Z info: -----------------------------------------------------------
2023-09-27T04:37:10.344Z info: | Ctrl-Q
2023-09-27T04:37:10.344Z info: |
2023-09-27T04:37:10.344Z info: | Version      : 3.13.1
2023-09-27T04:37:10.344Z info: | Log level    : info
2023-09-27T04:37:10.344Z info: |
2023-09-27T04:37:10.344Z info: | Command      : task-get
2023-09-27T04:37:10.344Z info: |              : get info about one or more tasks
2023-09-27T04:37:10.344Z info: |
2023-09-27T04:37:10.344Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T04:37:10.344Z info: |
2023-09-27T04:37:10.344Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T04:37:10.344Z info: ----------------------------------------------------------
2023-09-27T04:37:10.344Z info:
2023-09-27T04:37:10.438Z info: Successfully retrieved 25 tags from QSEoW
2023-09-27T04:37:11.422Z info:
2023-09-27T04:37:13.032Z info: ✅ Writing task table to disk file "tasks.json".
```

The resulting JSON file looks like this:

```json
[
    [
        "Task counter",
        "Task type",
        "Task name",
        "Task id",
        "Task enabled",
        "Task timeout",
        "Task retries",
        "App id",
        "Partial reload",
        "Manually triggered"
    ],
    [
        1,
        "Reload",
        "Manually triggered reload of Always failing reload (no delay)",
        "0d815a99-1ca3-4131-a398-6878bd735fd8",
        true,
        1440,
        0,
        "deba4bcf-47e4-472e-97b2-4fe8d6498e11",
        false,
        true
    ],
    [
        2,
        "Reload",
        "Manually triggered reload of App1 🏆",
        "b37f8034-faee-4e9b-bbca-5aba0cdf5df2",
        true,
        1440,
        0,
        "26634113-9163-44e4-a879-d87817d6e887",
        false,
        true
    ],
...
...
]
```
