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
- [List tasks as network graph](#list-tasks-as-network-graph)
  - [Node types](#node-types)
  - [User interface](#user-interface)
    - [Collapsing/expanding node clusters](#collapsingexpanding-node-clusters)
    - [Legend and network graph configuration](#legend-and-network-graph-configuration)

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
  --task-type <type...>          type of tasks to include (choices: "reload", "ext-program")
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
  --table-details [detail...]    which aspects of tasks should be included in table view. Not choosing any details will show all (choices: "common", "lastexecution", "tag", "customproperty",
                                 "schematrigger", "compositetrigger", default: "")
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
2023-11-19T20:21:00.767Z info: -----------------------------------------------------------
2023-11-19T20:21:00.782Z info: | Ctrl-Q
2023-11-19T20:21:00.782Z info: |
2023-11-19T20:21:00.782Z info: | Version      : 3.14.0
2023-11-19T20:21:00.782Z info: | Log level    : info
2023-11-19T20:21:00.782Z info: |
2023-11-19T20:21:00.782Z info: | Command      : task-get
2023-11-19T20:21:00.782Z info: |              : get info about one or more tasks
2023-11-19T20:21:00.782Z info: |
2023-11-19T20:21:00.782Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-19T20:21:00.782Z info: |
2023-11-19T20:21:00.782Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-19T20:21:00.782Z info: ----------------------------------------------------------
2023-11-19T20:21:00.782Z info:
2023-11-19T20:21:00.860Z info: Successfully retrieved 26 tags from QSEoW
2023-11-19T20:21:03.610Z info:
2023-11-19T20:21:03.610Z info: ✅ Writing task tree to disk file "tasktree.json".
```

Running the same command again, when the destination file already exists, results in a question to overwrite the file:

```text
2023-11-19T20:21:23.129Z info: -----------------------------------------------------------
2023-11-19T20:21:23.129Z info: | Ctrl-Q
2023-11-19T20:21:23.129Z info: |
2023-11-19T20:21:23.129Z info: | Version      : 3.14.0
2023-11-19T20:21:23.129Z info: | Log level    : info
2023-11-19T20:21:23.129Z info: |
2023-11-19T20:21:23.129Z info: | Command      : task-get
2023-11-19T20:21:23.129Z info: |              : get info about one or more tasks
2023-11-19T20:21:23.129Z info: |
2023-11-19T20:21:23.129Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-19T20:21:23.129Z info: |
2023-11-19T20:21:23.129Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-19T20:21:23.129Z info: ----------------------------------------------------------
2023-11-19T20:21:23.129Z info:
2023-11-19T20:21:23.207Z info: Successfully retrieved 26 tags from QSEoW
2023-11-19T20:21:24.630Z info:
                                  Destination file "tasktree.json" exists. Do you want to overwrite it? (y/n) y
2023-11-19T20:21:27.180Z info:
2023-11-19T20:21:27.180Z info: ✅ Writing task tree to disk file "tasktree.json".
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
--table-details common tag 
```

Note:  
It's possible to get more information about tasks by adding additional values to the `--table-details` option.  
Run `.\ctrl-q.exe task-get --help` to show a complete list of all options and their allowed values.

If `--table-details` is not specified all available information will be showed about the tasks.  
This will result in a *very* wide table!

```text
2023-11-19T20:21:56.546Z info: -----------------------------------------------------------
2023-11-19T20:21:56.546Z info: | Ctrl-Q
2023-11-19T20:21:56.546Z info: |
2023-11-19T20:21:56.546Z info: | Version      : 3.14.0
2023-11-19T20:21:56.546Z info: | Log level    : info
2023-11-19T20:21:56.546Z info: |
2023-11-19T20:21:56.546Z info: | Command      : task-get
2023-11-19T20:21:56.546Z info: |              : get info about one or more tasks
2023-11-19T20:21:56.546Z info: |
2023-11-19T20:21:56.546Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-19T20:21:56.546Z info: |
2023-11-19T20:21:56.546Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-19T20:21:56.546Z info: ----------------------------------------------------------
2023-11-19T20:21:56.546Z info:
2023-11-19T20:21:56.640Z info: Successfully retrieved 26 tags from QSEoW
2023-11-19T20:21:58.078Z info: # rows in table: 76
2023-11-19T20:21:58.078Z info: # reload tasks in table: 68
2023-11-19T20:21:58.078Z info: # external program tasks in table: 8
2023-11-19T20:21:58.187Z info:
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ # reload tasks: 68, # external program tasks: 8, # rows in table: 76

                                                                         │
├──────────────┬──────────────────┬──────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────┬──────────────┬──────────────┬──────────────┬──────────────────────────────────────┬────────────────┬────────────────────┬───────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────┤
│ Task counter │ Task type        │ Task name                                                                │ Task id                              │ Task enabled │ Task timeout │ Task retries │ App id                               │ Partial reload │ Manually triggered │ Ext program path                                          │ Ext program parameters
              │ Tags                                                     │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 1            │ External program │ App snapshots end of September 2022                                      │ c5cc047d-e520-4ccb-b88f-ac4f9d49d4be │ true         │ 60           │ 1            │                                      │                │                    │ powershell.exe                                            │ -File \\pro2-win1\c$\tools\script\qs_archive_apps_to_stream_end_of_sept.ps1 │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 2            │ External program │ Ext program task chaining 1                                              │ 4ce41cf3-bc6a-4f66-ad00-ffdeb9a7e468 │ true         │ 15           │ 0            │                                      │                │                    │ powershell.exe                                            │ -File \\pro2-win1\c$\tools\script\ext_task_1.ps1
              │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 3            │ External program │ Node-RED ext program task demo 1                                         │ d6bfc66a-393b-4eea-8ecd-1b1629c91683 │ true         │ 30           │ 0            │                                      │                │                    │ powershell.exe                                            │
              │ Ctrl-Q demo                                              │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 4            │ External program │ PowerShell export data connections                                       │ e7b8d484-5297-4caf-a727-38200905171e │ true         │ 15           │ 1            │                                      │                │                    │ powershell                                                │ -File \\pro2-win1\c$\tools\script\qs_export_data_connections.ps1            │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 5            │ External program │ PowerShell export tags (ext pgm task)                                    │ 1d5dc4c1-8bd3-455a-9e6a-873da103a950 │ true         │ 15           │ 0            │                                      │                │                    │ powershell                                                │ -File \\pro2-win1\c$\tools\script\qs_export_tags_cps.ps1                    │                                                          │
├──────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────────────────┼────────────────┼────────────────────┼───────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ 6            │ External program │ Sample external task                                                     │ 7d4617cd-a9d5-433a-8c82-742e58bfb38b │ true         │ 1440         │ 0            │                                      │                │                    │ C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe │ -File \\pro2-win1\c$\tools\script\ext_task_1.ps1
              │                                                          │
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
2023-11-19T20:23:43.715Z info: -----------------------------------------------------------
2023-11-19T20:23:43.715Z info: | Ctrl-Q
2023-11-19T20:23:43.715Z info: |
2023-11-19T20:23:43.715Z info: | Version      : 3.14.0
2023-11-19T20:23:43.715Z info: | Log level    : info
2023-11-19T20:23:43.715Z info: |
2023-11-19T20:23:43.715Z info: | Command      : task-get
2023-11-19T20:23:43.715Z info: |              : get info about one or more tasks
2023-11-19T20:23:43.715Z info: |
2023-11-19T20:23:43.731Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-19T20:23:43.731Z info: |
2023-11-19T20:23:43.731Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-19T20:23:43.731Z info: ----------------------------------------------------------
2023-11-19T20:23:43.731Z info:
2023-11-19T20:23:43.810Z info: Successfully retrieved 26 tags from QSEoW
2023-11-19T20:23:48.232Z info:
2023-11-19T20:23:48.232Z info: ✅ Writing task table to disk file "tasktable.csv".
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
2023-11-19T20:24:09.307Z info: -----------------------------------------------------------
2023-11-19T20:24:09.307Z info: | Ctrl-Q
2023-11-19T20:24:09.307Z info: |
2023-11-19T20:24:09.307Z info: | Version      : 3.14.0
2023-11-19T20:24:09.307Z info: | Log level    : info
2023-11-19T20:24:09.307Z info: |
2023-11-19T20:24:09.307Z info: | Command      : task-get
2023-11-19T20:24:09.307Z info: |              : get info about one or more tasks
2023-11-19T20:24:09.307Z info: |
2023-11-19T20:24:09.307Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-19T20:24:09.307Z info: |
2023-11-19T20:24:09.307Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-19T20:24:09.307Z info: ----------------------------------------------------------
2023-11-19T20:24:09.307Z info:
2023-11-19T20:24:09.400Z info: Successfully retrieved 26 tags from QSEoW
2023-11-19T20:24:12.057Z info:
2023-11-19T20:24:12.057Z info: ✅ Writing task table to disk file "tasks.json".
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

## List tasks as network graph

This command provides an interactive network graph view of reload tasks and external program tasks.

First Ctrl-Q will retrieve information about all reload and external program tasks from the Qlik Sense repository service (QRS).  
This includes information about last execution results for the tasks.

A web server is then started on the local computer where Ctrl-Q is running, serving a web page with the network graph in it.  
A link to the web page is shown in the console where Ctrl-Q is running.  
In the example below the link is `http://localhost:3000`.

{{% alert title="Beta feature" color="warning" %}}
Graph visualisation of Qlik Sense tasks is a beta feature.

Only a basic set of features are available at this point.  
Performance is ok for small to medium sized Qlik Sense sites, but will slower for larger sites (many hundreds or thousands of tasks).  
{{% /alert %}}

On Windows using PowerShell it can look like this:

```powershell
PS C:\tools\ctrl-q> .\ctrl-q.exe task-vis --host 192.168.100.109 --auth-type cert --auth-user-dir LAB --auth-user-id goran
2023-12-26T21:38:09.003Z info: -----------------------------------------------------------
2023-12-26T21:38:09.003Z info: | Ctrl-Q
2023-12-26T21:38:09.003Z info: |
2023-12-26T21:38:09.003Z info: | Version      : 3.15.0
2023-12-26T21:38:09.003Z info: | Log level    : info
2023-12-26T21:38:09.003Z info: |
2023-12-26T21:38:09.003Z info: | Command      : task-vis
2023-12-26T21:38:09.003Z info: |              : visualise task network
2023-12-26T21:38:09.003Z info: |
2023-12-26T21:38:09.003Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-12-26T21:38:09.003Z info: |
2023-12-26T21:38:09.003Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-12-26T21:38:09.003Z info: ----------------------------------------------------------
2023-12-26T21:38:09.003Z info:
2023-12-26T21:38:10.941Z info: Using vis.js to visualize tasks, more info at https://github.com/visjs/vis-network
2023-12-26T21:38:10.941Z info:
2023-12-26T21:38:10.941Z info: Task visualization server listening on http://localhost:3000
2023-12-26T21:38:10.941Z info: Press Ctrl-C to quit.
```

Ctrl-clicking (on Windows. Use Cmd-Clik on macOS) on the link will open the network graph in a browser:

![Qlik Sense task network graph](./ctrl-q-task-network-graph-1.png "Qlik Sense task network graph")

### Node types

| Node type | Shape | Description |
| --------- | ----- | ----------- |
| Schema trigger | Triangle | A schema trigger is a time-based task trigger.<br>Orange if enabled, gray when disabled |
| Composite trigger | Hexagon | If a task's composite trigger has two or more upstream triggers the composite trigger will be shown as a hexagon.<br>Orange if enabled, gray when disabled.<br><br>If the composite trigger only has one upstream task the composite trigger will not be shown in the graph. In this case the arrow from the upstream task will go directly to the downstream task. |
| Reload task | Rectangle | A reload task.<br>Green when last reload finished successfully, red when last reload failed, gray when task is disabled, blue when task has never been started. |
| External program task | Elipse | An external program task.<br>Green when last run finished successfully, red when last run failed, gray when task is disabled, blue when task has never been started. |

### User interface

The user interface consists of a toolbar at the top of the page and the network graph itself.

The toolbar has a fixed position and size at the top of the page, while the network graph will resize to fit the available space below the toolbar.

#### Collapsing/expanding node clusters

Networks with many tasks can be hard to read.  
To make it easier to read such networks Ctrl-Q offers the possibility to collapse/expand node clusters and/or leaf nodes.

- A node cluster is a group of nodes that are connected to each other.
- A leaf node is a node that does not have any downstream nodes.

Here is an example where the "Cluster leaves" button has been clicked a few times.  
Note the circular task chain that becomes very easy to see when the leaf nodes are collapsed:

![Qlik Sense task network graph](./ctrl-q-task-network-graph-collapsed-1.png "Qlik Sense task network graph")

Expanding the leaf nodes again makes is done by clicking the "Uncluster all" button.

#### Legend and network graph configuration

The "Legend" button will toggle the floating (also moveable!) legend window on/off.

The "Network config" button will toggle a network configuration pane to the left on/off:

![Qlik Sense task network graph](./ctrl-q-task-network-config-1.png "Configuration of Qlik Sense task network graph")

The network configuration pane makes it possible to fine-tune the parameters used when creating the network graph.  
Things like gravity, spring stiffness, overlap stragegy etc. can be adjusted.

If the network graph is hard to read it can be worth trying different values for these parameters.  


{{% alert title="Tip" color="primary" %}}
If things don't work out as expected the "Refresh" button in the top toolbar will reload tasks from Qlik Sense and reset all visualisation parameters to their default values.
{{% /alert %}}