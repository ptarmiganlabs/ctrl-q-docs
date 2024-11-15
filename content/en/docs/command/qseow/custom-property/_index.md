---
title: Custom properties
description: >
    Commands to retrieve and manipulate custom properties.
weight: 30
tags: [custom-property]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Set custom property of reload task](#set-custom-property-of-reload-task)
- [Syntax](#syntax)
- [Example](#example)

---

## Set custom property of reload task

Setting custom properties of reload tasks can be very time consuming if there are lots of tasks and/or custom propertis.  
Ctrl-Q makes it possible to update many takes at once with a single command.

Note:

1. ONE custom property can be updated each time Ctrl-Q is executed.  
   If several custom properties should be updated Ctrl-Q must be started several times.
2. The custom property to be updated must exist before Ctrl-Q is executed. Create the custom property in the QMC first.
3. The custom property values to be set must exist before Ctrl-Q is executed. Create the custom property in the QMC first.
4. Task IDs and task tags can be useed to specifiy which tasks' custom properties should be updated.
   1. The `--task-id` and `--task-tag` options are additive, i.e. the union of tasks matching the task IDs and tags will be updated.
5. The `--update-mode` option controls how custom properties are updated.
   1. Setting the option to `append` will add the specified values to any other values already set for the custom property.
   2. Setting the option to `replace` will delete any already set values for the custom property and then add the specified values.

In the example below 5 tasks will be updated: 3 based on task IDs and 2 based on the task tag "apiCreated".  
The values "Finance" and "Sales" will be added to the custom property "Department".  
Existing custom property values are preserved (i.e. the new values are appended to any already existing values) by appending new values rather than replacing (`--update-mode append` option).  
If a task already has values for this custom property new values will be added without asking first (`--overwrite` option)

## Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow task-custom-property-set --help
Usage: ctrl-q qseow task-custom-property-set [options]

update a custom property of one or more tasks

Options:
  --log-level <level>                  log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                        Qlik Sense server IP/FQDN
  --port <port>                        Qlik Sense repository service (QRS) port (usually 4242 for cert auth, 443 for jwt auth) (default: "4242")
  --schema-version <string>            Qlik Sense engine schema version (default: "12.612.0")
  --virtual-proxy <prefix>             Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>                https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>          user directory for user to connect with
  --auth-user-id <userid>              user ID for user to connect with
  -a, --auth-type <type>               authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>              Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>          Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>         Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>                     JSON Web Token (JWT) to use for authentication with Qlik Sense server
  --task-type <type...>                type of tasks to list (choices: "reload", default: ["reload"])
  --task-id <ids...>                   use task IDs to select which tasks to retrieve
  --task-tag <tags...>                 use tags to select which tasks to retrieve
  --custom-property-name <name>        name of custom property that will be updated
  --custom-property-value <values...>  one or more values name of custom property that will be updated
  --overwrite                          overwrite existing custom property values without asking
  --update-mode <mode>                 append or replace value(s) to existing custom property (choices: "append", "replace", default: "append")
  --dry-run                            do a dry run, i.e. do not modify any reload tasks - just show what would be updated
  -h, --help                           display help for command
```

## Example

```text
.\ctrl-q.exe qseow task-custom-property-set `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --task-id 82bc3e66-c899-4e44-b52f-552145da5ee0 5748afa9-3abe-43ab-bb1f-127c48ced075 5520e710-91ad-41d2-aeb6-434cafbf366b `
   --task-tag 'apiCreated' `
   --custom-property-name Department `
   --custom-property-value Finance Sales `
   --overwrite `
   --update-mode append
```

```text
2024-11-15T14:38:18.983Z info: -----------------------------------------------------------
2024-11-15T14:38:18.986Z info: | Ctrl-Q
2024-11-15T14:38:18.987Z info: |
2024-11-15T14:38:18.987Z info: | Version      : 4.0.0
2024-11-15T14:38:18.987Z info: | Log level    : info
2024-11-15T14:38:18.988Z info: |
2024-11-15T14:38:18.988Z info: | Command      : task-custom-property-set
2024-11-15T14:38:18.988Z info: |              : update a custom property of one or more tasks
2024-11-15T14:38:18.988Z info: |
2024-11-15T14:38:18.989Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T14:38:18.989Z info: |
2024-11-15T14:38:18.989Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T14:38:18.989Z info: ----------------------------------------------------------
2024-11-15T14:38:18.989Z info:
2024-11-15T14:38:19.619Z info: Number of tasks that will be updated: 5
2024-11-15T14:38:19.619Z info:
2024-11-15T14:38:19.619Z info: -----------------------------------------------------------
2024-11-15T14:38:19.620Z info: Processing task "Reload of Test data - Seattle checkouts by title3" with ID=82bc3e66-c899-4e44-b52f-552145da5ee0
2024-11-15T14:38:19.621Z info: Starting updating custom property "Department" of task "Reload of Test data - Seattle checkouts by title3" with ID=82bc3e66-c899-4e44-b52f-552145da5ee0
2024-11-15T14:38:19.969Z info:    ...Custom property "Department" on task "Reload of Test data - Seattle checkouts by title3" successfully updated.
2024-11-15T14:38:19.970Z info:
2024-11-15T14:38:19.970Z info: -----------------------------------------------------------
2024-11-15T14:38:19.970Z info: Processing task "Reload task of Lab 1_1" with ID=5748afa9-3abe-43ab-bb1f-127c48ced075
2024-11-15T14:38:19.971Z info: Starting updating custom property "Department" of task "Reload task of Lab 1_1" with ID=5748afa9-3abe-43ab-bb1f-127c48ced075
2024-11-15T14:38:20.206Z info:    ...Custom property "Department" on task "Reload task of Lab 1_1" successfully updated.
2024-11-15T14:38:20.206Z info:
2024-11-15T14:38:20.206Z info: -----------------------------------------------------------
2024-11-15T14:38:20.206Z info: Processing task "Reload of Test data - Seattle library checkouts & collection inventory" with ID=5520e710-91ad-41d2-aeb6-434cafbf366b
2024-11-15T14:38:20.206Z info: Starting updating custom property "Department" of task "Reload of Test data - Seattle library checkouts & collection inventory" with ID=5520e710-91ad-41d2-aeb6-434cafbf366b
2024-11-15T14:38:20.434Z info:    ...Custom property "Department" on task "Reload of Test data - Seattle library checkouts & collection inventory" successfully updated.
2024-11-15T14:38:20.434Z info:
2024-11-15T14:38:20.434Z info: -----------------------------------------------------------
2024-11-15T14:38:20.436Z info: Processing task "Reload Operations Monitor" with ID=fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c
2024-11-15T14:38:20.436Z info: Starting updating custom property "Department" of task "Reload Operations Monitor" with ID=fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c
2024-11-15T14:38:20.662Z info:    ...Custom property "Department" on task "Reload Operations Monitor" successfully updated.
2024-11-15T14:38:20.662Z info:
2024-11-15T14:38:20.663Z info: -----------------------------------------------------------
2024-11-15T14:38:20.663Z info: Processing task "Reload task of App ageing" with ID=5217e6b2-65ce-4535-ad2a-37b62e66d12c
2024-11-15T14:38:20.663Z info: Starting updating custom property "Department" of task "Reload task of App ageing" with ID=5217e6b2-65ce-4535-ad2a-37b62e66d12c
2024-11-15T14:38:20.901Z info:    ...Custom property "Department" on task "Reload task of App ageing" successfully updated.
```
