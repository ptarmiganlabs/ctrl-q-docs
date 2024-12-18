---
title: Tasks
description: >
    Import tasks into Qlik Sense
weight: 30
tags: [task]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Import tasks from file](#import-tasks-from-file)
  - [Syntax](#syntax)
  - [Source file columns for task defintions](#source-file-columns-for-task-defintions)
  - [Source file columns for app import definitions](#source-file-columns-for-app-import-definitions)
  - [Example: Export tasks to CSV, then import tasks from same CSV](#example-export-tasks-to-csv-then-import-tasks-from-same-csv)
  - [Example: Import apps from QVF files and create associated reload tasks](#example-import-apps-from-qvf-files-and-create-associated-reload-tasks)
    - [Defining tasks to be created](#defining-tasks-to-be-created)
    - [Associating new tasks with imported and existing apps](#associating-new-tasks-with-imported-and-existing-apps)

---

All examples below use Windows Terminal/PowerShell.

## Import tasks from file

Task definitions can be read from CSV or Excel files and then imported into Qlik Sense.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow task-import --help
Usage: ctrl-q qseow task-import [options]

create tasks based on definitions in a file on disk, optionally also importing apps from QVF files.

Options:
  --log-level <level>                log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                      Qlik Sense server IP/FQDN
  --port <port>                      Qlik Sense repository service (QRS) port (usually 4242 for cert auth, 443 for jwt auth) (default: "4242")
  --schema-version <string>          Qlik Sense engine schema version (default: "12.612.0")
  --virtual-proxy <prefix>           Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>              https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>        user directory for user to connect with
  --auth-user-id <userid>            user ID for user to connect with
  -a, --auth-type <type>             authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>            Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>        Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>       Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>                   JSON Web Token (JWT) to use for authentication with Qlik Sense server
  -t, --file-type <type>             source file type (choices: "excel", "csv", default: "excel")
  --file-name <filename>             file containing task definitions
  --sheet-name <name>                name of Excel sheet where task info is found
  --update-mode <mode>               create new or update existing tasks (choices: "create", default: "create")
  --limit-import-count <number>      import at most x number of tasks from the source file. Defaults to 0 = no limit (default: 0)
  --sleep-app-upload <milliseconds>  Wait this long before continuing after each app has been uploaded to Sense. Defaults to 1000 = 1 second (default: 1000)
  --import-app                       import Sense app QVFs from specified directory
  --import-app-sheet-name <name>     name of Excel sheet where app definitions are found
  --dry-run                          do a dry run, i.e. do not create any reload tasks - just show what would be done
  -h, --help                         display help for command
```

The options are *almost* the same irrespective of source file type:

The `--sheet-name` is only used/valid/relevant when `--file-type` is set to `excel`.  
Why? Because there are no sheets/tabs in CSV files.

### Source file columns for task defintions

The source file format is quite relaxed, but a few rules apply:

- The first column in the source file *must* be the task number.
  - This value uniquely identifies each task that should be imported and should be incremented by one for each task.
  - If this first column is empty the whole row will be ignored.
- All other columns, mandatory and optional, beyond the first one may be placed in any order.
  - For mandatory columns the names listed below *must* be used (but they can be placed in any order in the file, except the first column).
  - All mandatory columns must be present in the source file, even if they are not used/empty.
    For example, there may not be any tasks with schema/scheduled triggers, but the schema trigger columns must still be present in the source file.
- "Counter" columns are used to indicate that rows in the file are associated.
  - All rows involved in defining a certain task have the same "Task counter" value.
  - All rows involved in defining a certain schema or composite event have the same "Event counter" value.
  - All rows involved in defining a certain composite event rule have the same "Rule counter" value.
- The file format used when *exporting* task tables to disk is a superset of the format used for task *import*.
  It's thus a good idea to first do a task export, look at the file format and then adopt as needed before importing.

The *mandatory* columns in the task definition file are:

| Column name                  | Comment | Description                                                                                                                                                                                                                           | Valid values                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Task counter                 | 1       | Counter starting at 1. Increments one step for each task. All rows associated with a specific task should have the same value in this column.                                                                                         | Integer > 0                                                                                                                                                                                                                                                                                                                                                                                       |
| Task type                    | 1       | Type of task. In the future Ctrl-Q may support more task types.                                                                                                                                                                       | Reload / External program                                                                                                                                                                                                                                                                                                                                                                                            |
| Task name                    | 1       | Name of the task that will be created.                                                                                                                                                                                                | Any string. Emojis allowed 🤪.                                                                                                                                                                                                                                                                                                                                                                       |
| Task id                      | 1       | When creating new tasks a new task ID will always be created. This column is instead used to create task chains: it links a composite trigger in a downstream task with an upstream task via this column's value.                     | Any string, but to make it easier to verify task chains it's recommended to use integers or an easy to understand format in this column. <br>For example "3" or "new-task-3". <br> If no downstream task will link to the task being defined, this column can be left empty. |
| Task enabled                 | 1       | Should the created task be enabled or not.                                                                                                                                                                                            | 1 / 0 / blank. 1=enabled, 0 or blank=disabled                                                                                                                                                                                                                                                                                                                                                     |
| Task timeout                 | 1       | Timeout for the created task, i.e. number of seconds the task is allowed to run before it's aborted.                                                                                                                                  | Seconds                                                                                                                                                                                                                                                                                                                                                                                           |
| Task retries                 | 1       | Number of retries to make if the task execution fails.                                                                                                                                                                                | Integer >= 0                                                                                                                                                                                                                                                                                                                                                                                      |
| App id                       | 1       | The Sense app the task should be associated with.                                                                                                                                                                                     | If a valid GUID is specified it's assumed to be an app id. The task will be associated with that app. If the app id starts with `newapp-` it is a reference to an app that is imported during the current Ctrl-Q execution. The integer following `newapp-` is the value in the `App counter` column in the Excel definitions file.                                                               |
| Partial reload               | 1       | Should the task do a partial or full reload of the app?                                                                                                                                                                               | 1 / 0 / blank. 1=true, 0 or blank=false                                                                                                                                                                                                                                                                                                                                                           |
| Manually triggered           | 1       | Is the task manually triggered or not?                                                                                                                                                                                                | 1 / 0 / blank. 1=true, 0 or blank=false                                                                                                                                                                                                                                                                                                                                                           |
| Tags                         | 1       | Tags to set on the created task.                                                                                                                                                                                                      | Format is "tag1 / tag2 / tag with spaces in it", i.e. separate tag names by "space-forward slash-space".                                                                                                                                                                                                                                                                                          |
| Custom properties            | 1       | Custom properties to set on the created task.                                                                                                                                                                                         | Format is "CustPropName1=Value1 / CustPropName2=Value2" |
| Event counter                | 2       | Counter identifying events associated with the task defined in the previous line. One task can have zero or more events associated with it. | Integer > 0 |
| Event type                   | 2       | Which event type does this line specify? Schema events deal with time-based execution of the task. Composite events are used to build task chains. | Schema / Composite |
| Event name                   | 2       | Name of the event. | Any string |
| Event enabled                | 2       | Is event enabled. | 1 / 0 / blank. 1=enabled, 0 or blank=disabled |
| Schema increment option      | 3       | Type of schema event. For reference only, not used when Sense evaluates schema events. | once / hourly / daily / weekly / monthly / custom |
| Schema increment description | 3       | Structured description of the schema increment option. For reference only, not used when Sense evaluates schema events. | Integers separated by space, e.g. "0 0 1 0" for weekly |
| Daylight savings time        | 3       | Control how the schema event should deal with dayligt savings time. | ObserveDaylightSavingTime / PermanentStandardTime / PermanentDaylightSavingTime |
| Schema start                 | 3       | First valid time for the schema event. The event will not fire before this moment. | A valid timestamp string, e.g. 2022-10-19T10:19:30.000 |
| Schema expiration            | 3       | Last valid time for the schema event. The event will not fire after this moment. | A valid timestamp string or 9999-01-01T00:00:00.000 to signify "never"  |
| Schema filter description    | 3       | Used to control when a schema event is allower to trigger. More info [here](https://community.qlik.com/t5/Integration-Extension-APIs/Interval-and-time-explanation-for-creating-a-new-SchemaEvent/m-p/1784892/highlight/true#M13886). | Default: "\* _ - _ \* \* \*" |
| Schema time zone             | 3       | Time zone the schema event is evaluated in | E.g. "Europe/Paris" |
| Time contstraint seconds     | 4       | Used for composite events. Defines a window in which all dependent tasks have to complete. | Integer >= 0 |
| Time contstraint minutes     | 4       | Used for composite events. Defines a window in which all dependent tasks have to complete. | Integer >= 0 |
| Time contstraint hours       | 4       | Used for composite events. Defines a window in which all dependent tasks have to complete. | Integer >= 0 |
| Time contstraint days        | 4       | Used for composite events. Defines a window in which all dependent tasks have to complete. | Integer >= 0 |
| Rule counter                 | 4       | Counter identifying rules that define upstream task executions the current task is depending on. | Integer > 0 |
| Rule state                   | 4       | Is the rule waiting for success or failure of upstream task? | TaskSuccessful / TaskFail |
| Rule task name               |         | Name of the rule | Any string |
| Rule task id                 | 4       | Reference to the upstream task. | Any string (if referring to a task within the same file), **or** a valid id of a task that already exists in Sense.<br>Two options exist: If the "Rule task id" has the same value as the "Task id" of another task in the source file, those two tasks will be linked via this rule. If the "Rule task id" refers to an existing task id in Sense, the new rule will link to that existing task. |

Meaning of "Comment" column above:

1: These columns are required for all lines where top-level task information is defined.  
2: These columns are required for all lines where general event info (shared for schema and composite events) is defined. There may be zero or more such lines for a specific task.  
3: These columns are required for all lines where schema events info are defined.  
4: These columns are required for all lines where composite events ("task chains") are defined.

{{% alert title="💡 Tip" color="primary" %}}
Example task definition files are available on [this page](/docs/example/dissecting-task-definition-file/).
{{% /alert %}}

### Source file columns for app import definitions

If apps should be imported (by means of the `--import-app` option) an Excel file must be provided with info about what app QVF files should be imported, as well as details about each app import.  
A sheet name (where the app details are found) in the Excel file must also be specified using the `--import-app-sheet-name` option.

The columns (case sensitive!) in the app import definition file are:

| Column name                    | Description                                                                                                                                                                                                                                                                                  | Valid values                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App counter                    | Counter starting at 1. Increments one step for each app.                                                                                                                                                                                                                                     | Integer > 0                                                                                                                                                                                                                                                                                                                                                                        |
| App name                       | Name of the app that will be created based on the specified QVF file.                                                                                                                                                                                                                        | Any string. Emojis allowed.                                                                                                                                                                                                                                                                                                                                                        |
| QVF directory                  | Directory where app QVF files are stored                                                                                                                                                                                                                                                     | Any valid path, absolute or relative.                                                                                                                                                                                                                                                                                                                                              |
| QVF name                       | Name of QVD file, including extension.                                                                                                                                                                                                                                                       | Any valid file name.                                                                                                                                                                                                                                                                                                                                                               |
| Exclude data connections       | Should data connections stored in the QVF file be excluded during app import or not.                                                                                                                                                                                                         | true / false                                                                                                                                                                                                                                                                                                                                                                       |
| App tags                       | Tags to set on the imported app. | Format is "tag1 / tag2 / tag with spaces in it", i.e. separate tag names by "space-forward slash-space". |
| App custom properties          | Custom properties to set on the imported app. | Format is "CustPropName1=Value1 / CustPropName2=Value2" |
| Owner user directory           | If app owner should be set for this app, specify the user directory name here. Both user directory and user id must be correctly defined for the app owner to be updated. | Any user directory currently defined in the QMC, or `Internal` for Sense internal accounts. |
| Owner user id                  | If app owner should be set for this app, specify the user id here. Both user directory and user id must be correctly defined for the app owner to be updated. | Any user ID defined in the user directory defined in `Owner user directory` column (above). |
| Publish to stream              | If this app should be published, specify stream id or name here. If the id is not associated with a stream or the specified stream name does not exist the app will not be published                                                                                                         | Any existing stream name or id associated with an existing stream.                                                                                                                                                                                                                                                                                                                 |
| Publish options <br>(optional) | Specify publish options here, for example if an already published app with the same name should be overwritten or not. <br>The default behaviour is `publish-replace`, which will be used when no "Publish options" column is present in the Excel sheet or that column exists but is empty. | `publish-replace`: If there already exists a published app with the same name in the specified stream, replace that app with the new one. <br> `publish-another`: If there already exists a published app with the same name in the specified stream, publish tnother one. <br>`delete-publish`: First delete an already existing app (if there is one), then publish the new app. |

The publish options are described in more detail [here](https://github.com/ptarmiganlabs/ctrl-q/discussions/234#discussioncomment-6173760).

### Example: Export tasks to CSV, then import tasks from same CSV

This example will

1. Export ca 50 tasks to a CSV file
2. Import tasks from the just created CSV file

The CSV file created during the task export will contain some columns that are not needed during task import (last execution timestamp for each task and similar).  
That's fine though, during the task import Ctrl-Q will only look at the required columns and simply disregard all other columns.

Export tasks to CSV file:

```text
.\ctrl-q.exe qseow task-get `
  --auth-type cert `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --output-format table `
  --output-dest file `
  --output-file-name tasks.csv `
  --output-file-format csv
```

```text
2024-11-15T17:01:55.650Z info: -----------------------------------------------------------
2024-11-15T17:01:55.653Z info: | Ctrl-Q
2024-11-15T17:01:55.653Z info: |
2024-11-15T17:01:55.653Z info: | Version      : 4.0.0
2024-11-15T17:01:55.653Z info: | Log level    : info
2024-11-15T17:01:55.653Z info: |
2024-11-15T17:01:55.653Z info: | Command      : task-get
2024-11-15T17:01:55.653Z info: |              : get info about one or more tasks
2024-11-15T17:01:55.655Z info: |
2024-11-15T17:01:55.655Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T17:01:55.656Z info: |
2024-11-15T17:01:55.656Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T17:01:55.656Z info: ----------------------------------------------------------
2024-11-15T17:01:55.656Z info:
2024-11-15T17:01:56.048Z info: Successfully retrieved 29 tags from QSEoW
2024-11-15T17:01:59.710Z info: ✅ Writing task table to disk file "tasks.csv".
```

Now let's import tasks from the `tasks.csv` file:

```powershell
.\ctrl-q.exe qseow task-import `
  --auth-type cert `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-cert-file ./cert/client.pem `
  --auth-cert-key-file ./cert/client_key.pem `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --file-type csv `
  --file-name tasks.csv
```

It's worth noting that all the created tasks will be linked into the task chains that existed when the tasks where first *exported* into the CSV file.  
This happens because the composite event rules that were exported into the CSV file (i.e. "start the task when task A and task B have successfully finished reloaded") contain task IDs that point to already existing reload tasks in Sense.  
When that's the case the newly created tasks (based on the info in the CSV file) will link to those existing tasks.

This way a newly created task (based on info in the CSV file) can still be configured to start after some already existing task finish reloading.

Note how Ctrl-Q first creates the reload tasks and any associated schedule triggers in a first step, then add any composite triggers in the second step.  
This is needed as a composite trigger may refer to an already existing and/or a newly created task (or multiple tasks of course), i.e. all tasks must first be created. Only then is it possible to create composite triggers.

```text
2024-11-15T17:02:27.877Z info: -----------------------------------------------------------
2024-11-15T17:02:27.881Z info: | Ctrl-Q
2024-11-15T17:02:27.881Z info: |
2024-11-15T17:02:27.882Z info: | Version      : 4.0.0
2024-11-15T17:02:27.882Z info: | Log level    : info
2024-11-15T17:02:27.883Z info: |
2024-11-15T17:02:27.883Z info: | Command      : task-import
2024-11-15T17:02:27.883Z info: |              : create tasks based on definitions in a file on disk, optionally also importing apps from QVF files.
2024-11-15T17:02:27.883Z info: |
2024-11-15T17:02:27.885Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T17:02:27.885Z info: |
2024-11-15T17:02:27.885Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T17:02:27.885Z info: ----------------------------------------------------------
2024-11-15T17:02:27.885Z info:
2024-11-15T17:02:27.889Z info: Import tasks from definitions in file "tasks.csv"
2024-11-15T17:02:28.247Z info: Successfully retrieved 29 tags from QSEoW
2024-11-15T17:02:28.403Z info: Successfully retrieved 36 custom properties from QSEoW
2024-11-15T17:02:28.478Z info: -------------------------------------------------------------------
2024-11-15T17:02:28.478Z info: Creating tasks...
2024-11-15T17:02:28.805Z info: (1) Created new external program task "App snapshots end of September 2022", new task id: c433730d-031b-4ad6-a3fa-efb20df6c294.
2024-11-15T17:02:28.984Z info: (2) Created new external program task "Ext program task chaining 1", new task id: 41c99884-85da-45d8-8cdb-3cfa868d9591.
2024-11-15T17:02:29.167Z info: (3) Created new external program task "Ext program task chaining 1", new task id: 4743c805-db3e-47f1-afef-9689c6b4e086.
2024-11-15T17:02:29.331Z info: (4) Created new external program task "Ext program task chaining 1", new task id: 301a83e5-c7bb-4c6e-9dd4-970ceeeb7848.
2024-11-15T17:02:29.542Z info: (5) Created new external program task "Ext task 1", new task id: 31558ba5-cfca-424b-9161-0ac805e5c114.
2024-11-15T17:02:29.721Z info: (6) Created new external program task "Ext task 2", new task id: 73dbe993-4645-4143-9b60-721a10f229f0.
2024-11-15T17:02:29.889Z info: (7) Created new external program task "New external program task 1", new task id: 991e53fd-7179-4b88-b76a-58ef28b165ec.
2024-11-15T17:02:30.060Z info: (8) Created new external program task "New external program task 1", new task id: 2e6c35eb-06db-4aef-ad08-dfbd8e14e3ff.
2024-11-15T17:02:30.231Z info: (9) Created new external program task "Node-RED ext program task demo 1", new task id: 41fe623f-2cb9-4a1e-b1aa-5235c5970f82.
2024-11-15T17:02:30.403Z info: (10) Created new external program task "PowerShell export data connections", new task id: 3f9f2738-5e00-41b9-ad3b-872b3b98f47e.
2024-11-15T17:02:30.574Z info: (11) Created new external program task "PowerShell export tags (ext pgm task)", new task id: 845ae177-fae9-4908-91a7-8270c752a7a8.
2024-11-15T17:02:30.738Z info: (12) Created new external program task "Sample external task", new task id: 782a0202-8a84-4ce3-9c02-ad5a9ebec013.
2024-11-15T17:02:31.638Z info: (13) Created new external program task "[ctrl-q task chain 3] Ext program task chaining", new task id: 56c5900d-60b4-45b9-b0a9-8628b3689008.
2024-11-15T17:02:31.805Z info: (14) Created new external program task "[ctrl-q task chain 3] Ext program task chaining", new task id: 951178cd-c96c-4a64-80e4-058dc49079f4.
2024-11-15T17:02:32.291Z info: (15) Created new external program task "[ctrl-q task chain 4] Ext program task chaining", new task id: 7e58312c-dbd6-499c-8ff4-6720a8e0e667.
2024-11-15T17:02:32.511Z info: (16) Created new external program task "[ctrl-q task chain 4] Ext program task chaining", new task id: a70fbc1d-c257-450d-a7c9-c44b2bf59dbd.
2024-11-15T17:02:32.983Z info: (17) Created new reload task "Butler test failing reloads 1 task", new task id: 38196f68-f1f3-4b19-8e12-ce2ccf20f481.
2024-11-15T17:02:33.367Z info: (18) Created new reload task "Butler test failing reloads 1 task", new task id: 5993e407-4497-4b8d-a2ad-5767b5635bd5.
2024-11-15T17:02:33.793Z info: (19) Created new reload task "Manually triggered reload of Always failing reload (no delay)", new task id: 2109d58b-2e09-4299-8b9d-09a23bde755a.
2024-11-15T17:02:34.160Z info: (20) Created new reload task "Manually triggered reload of Butler 7 Slack debug", new task id: 2a5845d7-edd7-4214-90c9-a478aafae9ca.
2024-11-15T17:02:34.520Z info: (21) Created new reload task "Manually triggered reload of Butler regression test app 1", new task id: 9d450ba3-1d8b-4bd5-ba76-2c510003eb70.
...
...
2024-03-12T09:34:38.450Z info: -------------------------------------------------------------------
2024-03-12T09:34:38.450Z info: Creating composite events for the just created tasks...
2024-11-15T17:03:27.785Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When [ctrl-q 2] done" for task ID 56c5900d-60b4-45b9-b0a9-8628b3689008. Result: 201/Created.
2024-11-15T17:03:28.188Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="Start ext pgm task when reload task done" for task ID 56c5900d-60b4-45b9-b0a9-8628b3689008. Result: 201/Created.
2024-11-15T17:03:28.568Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When [ctrl-q task chain 3] done" for task ID 7e58312c-dbd6-499c-8ff4-6720a8e0e667. Result: 201/Created.
2024-11-15T17:03:29.018Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When HR metrics done" for task ID 6158da08-c1e3-4e90-a780-0fd871975913. Result: 201/Created.
2024-11-15T17:03:29.376Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When Operations monitor has reloaded" for task ID e43f5a5d-3e46-492a-85c0-851e863ebf9d. Result: 201/Created.
2024-11-15T17:03:29.781Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When NYT comments done" for task ID 56132d4c-5358-40a2-9f7d-3d1c87f53679. Result: 201/Created.
...
...
```

### Example: Import apps from QVF files and create associated reload tasks

This example will

1. Import 3 apps from QVF files. Definitions of which files to import are stored in an Excel file.
   1. Tags and custom properties will be set for the apps.
   2. New app owners will be set.
   3. The apps will be published to streams.
2. Create reload tasks based on definitions in same Excel file (but on a different sheet).
3. The reload tasks will be associated with the previously imported apps.
4. The reload tasks will be linked in a task chain.
5. Some imported tasks will be triggered by already existing Sense tasks while others will be triggered by newly created tasks.
6. There will be a 2 second delay after each QVF file has finished uploading, to reduce load on the Sense server.

The task import command looks like this in PowerShell:

```text
.\ctrl-q.exe qseow task-import `
  --auth-type cert `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-cert-file ./cert/client.pem `
  --auth-cert-key-file ./cert/client_key.pem `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --file-type excel `
  --file-name tasks.xlsx `
  --sheet-name "Ctrl-Q task import 1" `
  --import-app `
  --import-app-sheet-name "App import" `
  --sleep-app-upload 2000
```

```text
2024-11-15T17:05:18.127Z info: -----------------------------------------------------------
2024-11-15T17:05:18.130Z info: | Ctrl-Q
2024-11-15T17:05:18.130Z info: |
2024-11-15T17:05:18.130Z info: | Version      : 4.0.0
2024-11-15T17:05:18.132Z info: | Log level    : info
2024-11-15T17:05:18.132Z info: |
2024-11-15T17:05:18.133Z info: | Command      : task-import
2024-11-15T17:05:18.133Z info: |              : create tasks based on definitions in a file on disk, optionally also importing apps from QVF files.
2024-11-15T17:05:18.133Z info: |
2024-11-15T17:05:18.134Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T17:05:18.134Z info: |
2024-11-15T17:05:18.134Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T17:05:18.134Z info: ----------------------------------------------------------
2024-11-15T17:05:18.134Z info:
2024-11-15T17:05:18.137Z info: Import tasks from definitions in file "tasks.xlsx"
2024-11-15T17:05:18.517Z info: Successfully retrieved 29 tags from QSEoW
2024-11-15T17:05:18.666Z info: Successfully retrieved 36 custom properties from QSEoW
2024-11-15T17:05:18.701Z info: -------------------------------------------------------------------
2024-11-15T17:05:18.701Z info: Importing apps...
2024-11-15T17:05:18.701Z info: (1) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-11-15T17:05:25.076Z info: (1, delete-publish) App "App 3" published to stream "Ctrl-Q demo apps", the existing app (if one exists) with the same name in this stream has been deleted. Id of published app: 0de10164-c255-4b8f-bb8f-4458fa43623a
2024-11-15T17:05:25.078Z info: (2) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-11-15T17:05:34.034Z info: (2, publish-replace) App "App 3" published to stream "Ctrl-Q demo apps", replacing the existing app with the same name. Id of published app: 0de10164-c255-4b8f-bb8f-4458fa43623a
2024-11-15T17:05:34.034Z info: (3) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-11-15T17:05:40.133Z warn: (3) PUBLISH APP publish-replace: More than one app with the same name "App 1" in the target stream "Ctrl-Q demo apps". Impossible to know which one to replace. Skipping publishing for this app. The uploaded app is still present in the QMC (id=859b42dc-ea4f-4ae9-b61b-1d67341308c4).
2024-11-15T17:05:40.133Z error: (3) Failed publishing app "App 1" to stream "Ctrl-Q demo apps"
2024-11-15T17:05:40.133Z info: (4) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-11-15T17:05:45.507Z info: (4, publish-another) App "App 1" published to stream "Ctrl-Q demo apps". Id of published app: ddd17a51-86c8-489b-b13c-194e9a61dc53
2024-11-15T17:05:45.508Z info: (5) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-11-15T17:05:50.770Z warn: (5) PUBLISH APP publish-replace: More than one app with the same name "App 1" in the target stream "Ctrl-Q demo apps". Impossible to know which one to replace. Skipping publishing for this app. The uploaded app is still present in the QMC (id=b676ea6d-fd75-4fdf-a3b7-2f318a043876).
2024-11-15T17:05:50.770Z error: (5) Failed publishing app "App 1" to stream "Ctrl-Q demo apps"
2024-11-15T17:05:50.771Z info: (6) Importing app "App 2" from file "C:/tools/ctrl-q/testdata/App import 2.qvf"
2024-11-15T17:05:55.354Z warn: Stream "Stream does not exist" does not exist.
2024-11-15T17:05:55.354Z error: (6) Failed publishing app "App 2" to stream "Stream does not exist". The uploaded app is still present in the QMC (id=5fb8db40-f4b2-49fe-8d72-acd12d8c82bd).
2024-11-15T17:05:55.354Z info: (7) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-11-15T17:06:02.763Z info: (7, publish-replace) App "App 3" published to stream "Ctrl-Q demo apps", replacing the existing app with the same name. Id of published app: 0de10164-c255-4b8f-bb8f-4458fa43623a
2024-11-15T17:06:02.765Z info: -------------------------------------------------------------------
2024-11-15T17:06:02.765Z info: Creating tasks...
2024-11-15T17:06:03.175Z info: (1) Created new reload task "Reload task of App 1", new task id: 21c439b1-23a5-48e5-a63e-c95da4e7ede9.
2024-11-15T17:06:03.570Z info: (2) Created new reload task "Manually triggered reload of Always failing reload (no delay)", new task id: 9d6b758a-9954-4430-9d3e-d0ab41ee3db3.
2024-11-15T17:06:03.962Z info: (3) Created new reload task "Manually triggered reload of App1 🏆", new task id: 25ecd53b-ffcf-4131-89ef-2e5a105312a3.
2024-11-15T17:06:04.310Z info: (4) Created new reload task "Manually triggered reload of Butler 7 Slack debug", new task id: 569cbcb8-631c-4ee5-9c50-939755a6668c.
2024-11-15T17:06:05.323Z info: (5) Created new reload task "Reload task of Lab 1_1", new task id: 4677a482-b527-4fe8-a3d4-dd22dfb03d98.
2024-11-15T17:06:05.323Z info: -------------------------------------------------------------------
2024-11-15T17:06:05.324Z info: Creating composite events for the just created tasks...
2024-11-15T17:06:05.535Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="Trigger when upstream tasks are done" for task ID 4677a482-b527-4fe8-a3d4-dd22dfb03d98. Result: 201/Created.
```

Some comments about the above command:

- The certificates used to authenticate with Sense are stored in the `cert` subdirectory, right under where Ctrl-Q is started from.  
  That's the default locataion, meaning that the options `--auth-cert-file` and `--auth-cert-key-file` are really not needed in this example.
- The app and task definitions are found in a Excel file (`--file-type` option) named `tasks.xlsx`.
- Task definitions are found in the Excel file's sheet named `Ctrl-Q task import`.
- The `--import-app` tells Ctrl-Q to import certain apps before tasks defined in the `Ctrl-Q task import 1` sheet are created. This parameter is optional. If it is **not** included no apps will be imported.
- The `--import-app-sheet-name` tells Ctrl-Q that a list of apps to be imported (and import parameters for each app) is found the `App import` sheet of the Excel file.

> NOTE 1: A sample defintions Excel file is [available in the GitHub repository](https://github.com/ptarmiganlabs/ctrl-q/blob/main/testdata/tasks.xlsx?raw=true).
> NOTE 2: The structure of the Excel sheet specified by the `--import-app-sheet-name` is described [above](#source-file-columns-for-app-import-definitions).

#### Defining tasks to be created

The format is the same as when importing tasks only (and no apps).  
More info [here](#source-file-columns-for-task-defintions).

#### Associating new tasks with imported and existing apps

A few special cases apply when tasks are created **and** apps also imported.

In this situation it's important that tasks can be associated with either the newly imported apps *or* already existing apps.  
Similarly, for composite task triggers (used to create task chains) it's important that either newly created tasks *or* already existing tasks can be referenced.

Let's say the following three QVF files should be imported into Sense.  
Note the `App counter` column, with values 1, 2 and 3.

![QVF app files that should be imported into Qlik Sense](/img/ctrl-q-app-import-1.png "QVF app files that should be imported into Qlik Sense")

Now let's look at the tasks to be created.
In the image below the main info (task name etc) for each of the four tasks is shown.  
Note that the `Task id` column has both proper GUIDs and simple integers in it.  
This will be important when defining composite triggers.

![Reload tasks should be created in Qlik Sense](/img/ctrl-q-task-import-1.png "Reload tasks should be created in Qlik Sense")

Finally let's look at the composite triggers associated with the last of the four tasks.  
That composite trigger relies on two tasks, one that should fail (`TaskFail`) to trigger the composite trigger and one that should succeed (`TaskSuccessful`).

The important part here is the last column, `Rule task id`:

- If that column contains a valid GUID it is assumed to be a reference to an *existing* task.
- If the column contains an integer it is assumed to be a reference to a *newly created* task. <br>
  Which task? The one with the same integer number in the `Task id` column (see previous paragraph).

This way it's possible to chain new reload tasks to both already existing tasks and new ones.

![Reload tasks should be created in Qlik Sense](/img/ctrl-q-task-import-2.png "Reload tasks should be created in Qlik Sense")
