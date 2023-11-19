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

```powershell
.\ctrl-q.exe task-custom-property-set `
--auth-type cert `
--host 192.168.100.109 `
--auth-cert-file ./cert/client.pem `
--auth-cert-key-file ./cert/client_key.pem `
--auth-user-dir LAB `
--auth-user-id goran `
--task-id 82bc3e66-c899-4e44-b52f-552145da5ee0 5748afa9-3abe-43ab-bb1f-127c48ced075 5520e710-91ad-41d2-aeb6-434cafbf366b `
--task-tag 'apiCreated' `
--custom-property-name Department `
--custom-property-value Finance Sales `
--overwrite `
--update-mode append
```

```
2023-11-19T19:24:46.202Z info: -----------------------------------------------------------
2023-11-19T19:24:46.202Z info: | Ctrl-Q
2023-11-19T19:24:46.202Z info: |
2023-11-19T19:24:46.202Z info: | Version      : 3.14.0
2023-11-19T19:24:46.202Z info: | Log level    : info
2023-11-19T19:24:46.202Z info: |
2023-11-19T19:24:46.202Z info: | Command      : task-custom-property-set
2023-11-19T19:24:46.202Z info: |              : update a custom property of one or more tasks
2023-11-19T19:24:46.217Z info: |
2023-11-19T19:24:46.217Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-19T19:24:46.217Z info: |
2023-11-19T19:24:46.217Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-19T19:24:46.217Z info: ----------------------------------------------------------
2023-11-19T19:24:46.217Z info:
2023-11-19T19:24:46.468Z info: Number of tasks that will be updated: 5
2023-11-19T19:24:46.468Z info:
2023-11-19T19:24:46.468Z info: -----------------------------------------------------------
2023-11-19T19:24:46.468Z info: Processing task "Reload Operations Monitor" with ID=fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c
2023-11-19T19:24:46.468Z info: Starting updating custom property "Department" of task "Reload Operations Monitor" with ID=fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c
2023-11-19T19:24:50.030Z info:
2023-11-19T19:24:50.233Z info:    ...Custom property "Department" on task "Reload Operations Monitor" successfully updated.
2023-11-19T19:24:50.233Z info:
2023-11-19T19:24:50.233Z info: -----------------------------------------------------------
2023-11-19T19:24:50.233Z info: Processing task "Reload of Test data - Seattle library checkouts & collection inventory" with ID=5520e710-91ad-41d2-aeb6-434cafbf366b
2023-11-19T19:24:50.233Z info: Starting updating custom property "Department" of task "Reload of Test data - Seattle library checkouts & collection inventory" with ID=5520e710-91ad-41d2-aeb6-434cafbf366b
2023-11-19T19:24:51.734Z info:
2023-11-19T19:24:51.858Z info:    ...Custom property "Department" on task "Reload of Test data - Seattle library checkouts & collection inventory" successfully updated.
2023-11-19T19:24:51.858Z info:
2023-11-19T19:24:51.858Z info: -----------------------------------------------------------
2023-11-19T19:24:51.858Z info: Processing task "Reload task of App ageing" with ID=5217e6b2-65ce-4535-ad2a-37b62e66d12c
2023-11-19T19:24:51.858Z info: Starting updating custom property "Department" of task "Reload task of App ageing" with ID=5217e6b2-65ce-4535-ad2a-37b62e66d12c
2023-11-19T19:24:52.796Z info:
2023-11-19T19:24:52.905Z info:    ...Custom property "Department" on task "Reload task of App ageing" successfully updated.
2023-11-19T19:24:52.905Z info:
2023-11-19T19:24:52.920Z info: -----------------------------------------------------------
2023-11-19T19:24:52.920Z info: Processing task "Reload of Test data - Seattle checkouts by title3" with ID=82bc3e66-c899-4e44-b52f-552145da5ee0
2023-11-19T19:24:52.920Z info: Starting updating custom property "Department" of task "Reload of Test data - Seattle checkouts by title3" with ID=82bc3e66-c899-4e44-b52f-552145da5ee0
2023-11-19T19:24:53.827Z info:
2023-11-19T19:24:53.952Z info:    ...Custom property "Department" on task "Reload of Test data - Seattle checkouts by title3" successfully updated.
2023-11-19T19:24:53.952Z info:
2023-11-19T19:24:53.952Z info: -----------------------------------------------------------
2023-11-19T19:24:53.952Z info: Processing task "Reload task of Lab 1_1" with ID=5748afa9-3abe-43ab-bb1f-127c48ced075
2023-11-19T19:24:53.952Z info: Starting updating custom property "Department" of task "Reload task of Lab 1_1" with ID=5748afa9-3abe-43ab-bb1f-127c48ced075
2023-11-19T19:24:54.890Z info:
2023-11-19T19:24:54.983Z info:    ...Custom property "Department" on task "Reload task of Lab 1_1" successfully updated.
```
