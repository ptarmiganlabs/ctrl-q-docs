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
  - [Source file columns for task defintions](#source-file-columns-for-task-defintions)
  - [Source file columns for app import definitions](#source-file-columns-for-app-import-definitions)
  - [Example: Export tasks to CSV, then import tasks from same CSV](#example-export-tasks-to-csv-then-import-tasks-from-same-csv)
  - [Example: Import apps from QVF files and create associated reload tasks](#example-import-apps-from-qvf-files-and-create-associated-reload-tasks)
    - [Defining tasks to be created](#defining-tasks-to-be-created)
    - [Associating new tasks with imported and existing apps](#associating-new-tasks-with-imported-and-existing-apps)

---

All example below use Windows Terminal/PowerShell.

## Import tasks from file

Task definitions can be read from CSV or Excel files.  
The options are as follows:

```powershell
.\ctrl-q.exe task-import --help
```

```text
Usage: ctrl-q task-import [options]

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

```powershell
.\ctrl-q.exe task-get `
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
2024-03-12T09:33:25.950Z info: -----------------------------------------------------------
2024-03-12T09:33:25.950Z info: | Ctrl-Q
2024-03-12T09:33:25.950Z info: |
2024-03-12T09:33:25.950Z info: | Version      : 3.16.0
2024-03-12T09:33:25.950Z info: | Log level    : info
2024-03-12T09:33:25.950Z info: |
2024-03-12T09:33:25.950Z info: | Command      : task-get
2024-03-12T09:33:25.964Z info: |              : get info about one or more tasks
2024-03-12T09:33:25.964Z info: |
2024-03-12T09:33:25.964Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T09:33:25.964Z info: |
2024-03-12T09:33:25.964Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T09:33:25.964Z info: ----------------------------------------------------------
2024-03-12T09:33:25.964Z info:
2024-03-12T09:33:26.089Z info: Successfully retrieved 28 tags from QSEoW
2024-03-12T09:33:27.918Z info: ✅ Writing task table to disk file "tasks.csv".
```

Now let's import tasks from the `tasks.csv` file:

```powershell
.\ctrl-q.exe task-import `
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
2024-03-12T09:34:09.780Z info: -----------------------------------------------------------
2024-03-12T09:34:09.780Z info: | Ctrl-Q
2024-03-12T09:34:09.780Z info: |
2024-03-12T09:34:09.780Z info: | Version      : 3.16.0
2024-03-12T09:34:09.780Z info: | Log level    : info
2024-03-12T09:34:09.780Z info: |
2024-03-12T09:34:09.794Z info: | Command      : task-import
2024-03-12T09:34:09.794Z info: |              : create tasks based on definitions in a file on disk, optionally also importing apps from QVF files.
2024-03-12T09:34:09.794Z info: |
2024-03-12T09:34:09.794Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T09:34:09.794Z info: |
2024-03-12T09:34:09.794Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T09:34:09.794Z info: ----------------------------------------------------------
2024-03-12T09:34:09.794Z info:
2024-03-12T09:34:09.794Z info: Import tasks from definitions in file "tasks.csv"
2024-03-12T09:34:09.935Z info: Successfully retrieved 28 tags from QSEoW
2024-03-12T09:34:10.044Z info: Successfully retrieved 31 custom properties from QSEoW
2024-03-12T09:34:10.155Z info: -------------------------------------------------------------------
2024-03-12T09:34:10.155Z info: Creating tasks...
2024-03-12T09:34:10.294Z info: (1) Created new external program task "App snapshots end of September 2022", new task id: 88bdbd10-eb45-4490-ac14-596e7e9bdaf3.
2024-03-12T09:34:10.419Z info: (2) Created new external program task "Ext program task chaining 1", new task id: 32222dad-ec1b-4a74-bd39-430619bba874.
2024-03-12T09:34:10.529Z info: (3) Created new external program task "Ext program task chaining 1", new task id: 1be0d039-b68f-4916-9fa5-2aa9d27f8344.
2024-03-12T09:34:10.686Z info: (4) Created new external program task "Ext task 1", new task id: ca37875a-d977-4d0f-a034-f2d9e3aee85c.
2024-03-12T09:34:10.810Z info: (5) Created new external program task "Ext task 2", new task id: d6b324ee-73e9-43dc-80be-164bd16daef8.
2024-03-12T09:34:10.951Z info: (6) Created new external program task "New external program task 1", new task id: 2a9f7d8d-9f98-4cb5-af0b-c0b7551064c4.
2024-03-12T09:34:11.077Z info: (7) Created new external program task "Node-RED ext program task demo 1", new task id: 0deb6ea6-896a-4363-a28c-ff0e227d4fc8.
2024-03-12T09:34:11.186Z info: (8) Created new external program task "PowerShell export data connections", new task id: 7eecf18d-479b-4834-9b95-2b5f71cc0a7b.
2024-03-12T09:34:11.388Z info: (9) Created new external program task "PowerShell export tags (ext pgm task)", new task id: 44cef627-81ce-4a5e-ab83-13390d822d93.
2024-03-12T09:34:11.498Z info: (10) Created new external program task "Sample external task", new task id: cfe6f6fe-b557-4e11-af92-1ec7dc05221b.
2024-03-12T09:34:12.077Z info: (11) Created new external program task "[ctrl-q task chain 3] Ext program task chaining", new task id: a751e35a-8ffe-4ee9-bc5f-e863c1f7c1b0.
2024-03-12T09:34:12.186Z info: (12) Created new external program task "[ctrl-q task chain 3] Ext program task chaining", new task id: f45382b1-1b6d-4f32-9549-90fe0ba65aeb.
2024-03-12T09:34:12.498Z info: (13) Created new external program task "[ctrl-q task chain 4] Ext program task chaining", new task id: f03da04c-8d0a-48ee-8643-42d429c69e12.
2024-03-12T09:34:12.623Z info: (14) Created new external program task "[ctrl-q task chain 4] Ext program task chaining", new task id: e00e097a-0316-4fe5-a767-82b00910e774.
2024-03-12T09:34:12.888Z info: (15) Created new reload task "Butler test failing reloads 1 task", new task id: ff1359b8-ff1e-4fef-b871-c44b2afce877.
2024-03-12T09:34:13.139Z info: (16) Created new reload task "Butler test failing reloads 1 task", new task id: a2a21c75-6fcd-4341-b927-47fd7fc7074d.
2024-03-12T09:34:13.436Z info: (17) Created new reload task "Manually triggered reload of Always failing reload (no delay)", new task id: f97e71c4-7a73-4de9-ade8-93dc87abb5f5.
2024-03-12T09:34:13.716Z info: (18) Created new reload task "Manually triggered reload of Butler 7 Slack debug", new task id: 835c8937-d3c5-45a8-93b1-42f987dbf6e8.
2024-03-12T09:34:13.983Z info: (19) Created new reload task "Manually triggered reload of Butler regression test app 1", new task id: 2653f70f-3d12-46f2-b45d-5af48f1c1708.
2024-03-12T09:34:14.217Z info: (20) Created new reload task "Manually triggered reload of Butler regression test app 2", new task id: 81d5ac39-ac60-432e-9331-211454282d01.
2024-03-12T09:34:14.463Z info: (21) Created new reload task "Manually triggered reload of Butler regression test app 3", new task id: 921d36b5-d46e-46f2-9cb8-1c2ef1dad4fe.
...
...
2024-03-12T09:34:38.450Z info: -------------------------------------------------------------------
2024-03-12T09:34:38.450Z info: Creating composite events for the just created tasks...
2024-03-12T09:34:38.607Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When [ctrl-q 2] done" for task ID a751e35a-8ffe-4ee9-bc5f-e863c1f7c1b0. Result: 201/Created.
2024-03-12T09:34:38.747Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="Start ext pgm task when reload task done" for task ID a751e35a-8ffe-4ee9-bc5f-e863c1f7c1b0. Result: 201/Created.
2024-03-12T09:34:38.888Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When [ctrl-q task chain 3] done" for task ID f03da04c-8d0a-48ee-8643-42d429c69e12. Result: 201/Created.
2024-03-12T09:34:39.012Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When HR metrics done" for task ID 2079c888-537b-4bce-8252-8bac8517eff7. Result: 201/Created.
2024-03-12T09:34:39.137Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When Operations monitor has reloaded" for task ID 73e89949-51ea-4b64-b74a-1aa625e064e0. Result: 201/Created.
2024-03-12T09:34:39.263Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="When NYT comments done" for task ID 28541735-b57a-4b03-85fe-d09062a9adfa. Result: 201/Created.
2024-03-12T09:34:39.395Z info: CREATE COMPOSITE EVENT IN QSEOW: Event name="Task event trigger" for task ID e818fa3f-c8ca-4399-ab21-c61c05087fb9. Result: 201/Created.
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

```powershell
.\ctrl-q.exe task-import `
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
