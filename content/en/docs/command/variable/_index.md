---
title: Variables
description: >
    In-app variables.
weight: 80
tags: [variable]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [List variables in a Sense app](#list-variables-in-a-sense-app)
- [Delete variables in a Sense app](#delete-variables-in-a-sense-app)

---

## List variables in a Sense app

The command below lists certain variables (named `Ctrl-Q variable 1`, `TimestampFormat`, `var1` and `vVar1`) in apps matching appId `a3e0f5d2-000a-464f-998d-33d333b175d7` and app tags `Ctrl-Q variable 1` and `Ctrl-Q variable 2`.

If the `--variable` option is not included all variables will be included in the table.

Use `--output-format json` to get the results as JSON.

```powershell
.\ctrl-q.exe variable-get `
--host 192.168.100.109 `
--qrs-port 4242 `
--auth-user-dir LAB `
--auth-user-id goran `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--app-tag 'Ctrl-Q variable 1' 'Ctrl-Q variable 2' `
--id-type name `
--variable 'Ctrl-Q variable 1' 'TimestampFormat' 'var1' 'vVar1' `
--output-format table
```

```text
2023-09-27T04:27:16.696Z info: -----------------------------------------------------------
2023-09-27T04:27:16.696Z info: | Ctrl-Q
2023-09-27T04:27:16.711Z info: |
2023-09-27T04:27:16.711Z info: | Version      : 3.13.1
2023-09-27T04:27:16.711Z info: | Log level    : info
2023-09-27T04:27:16.711Z info: |
2023-09-27T04:27:16.711Z info: | Command      : variable-get
2023-09-27T04:27:16.711Z info: |              : get variable definitions in one or more apps
2023-09-27T04:27:16.711Z info: |
2023-09-27T04:27:16.711Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T04:27:16.711Z info: |
2023-09-27T04:27:16.711Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T04:27:16.711Z info: ----------------------------------------------------------
2023-09-27T04:27:16.711Z info:
2023-09-27T04:27:19.403Z info:
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ In-app variables                                                                                                                                                                                                                                                                                                                                                     │
├──────────────────────────────────────┬─────────────────────────────┬──────────────────────────────────────┬─────────────────┬───────────────────┬──────────┬───────────────────────────┬─────────────┬───────────────────┬──────────────────────────┬──────────────────────────┬────────────────────┬──────┬───────┬───────────────────────────────┬─────────────────┤
│ App ID                               │ App name                    │ Variable ID                          │ Variable name   │ Description       │ Type     │ Definition                │ Is reserved │ Is script created │ Created date             │ Modified date            │ Engine object type │ Size │ Title │ Privileges                    │ Tags            │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ f16fa63d-54c7-4c8d-81f1-2d084d46bcfe │ Minecraft Metrics           │ cd5eb1a8-bd19-42f6-8d58-55905297572b │ TimestampFormat │                   │ variable │ M/D/YYYY h:mm:ss[.fff] TT │ true        │ true              │                          │                          │                    │      │       │ read,update,delete            │                 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ e377d9b5-231a-4795-800f-3649983647dd │ LDAP lab                    │ c1a99293-51d0-426b-bdb7-a43b2d896dc9 │ TimestampFormat │                   │ variable │ M/D/YYYY h:mm:ss[.fff] TT │ true        │ true              │                          │                          │                    │      │       │ read,update,delete            │                 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ a3e0f5d2-000a-464f-998d-33d333b175d7 │ Sheet thumbnails demo app   │ 0155e35e-8054-4896-9dd7-d947405f3a90 │ vVar1           │ vVar1 description │ variable │ ='abc' & '123'            │             │                   │ 2021-06-03T22:04:52.283Z │ 2023-05-09T18:37:05.953Z │                    │ -1   │       │ read,update,delete,exportdata │ varTag1,varTag2 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ a3e0f5d2-000a-464f-998d-33d333b175d7 │ Sheet thumbnails demo app   │ 8b9ed9b7-7db9-420f-8c00-308e19befd54 │ TimestampFormat │                   │ variable │ M/D/YYYY h:mm:ss[.fff] TT │ true        │ true              │                          │                          │                    │      │       │ read,update,delete            │                 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ a3e0f5d2-000a-464f-998d-33d333b175d7 │ Sheet thumbnails demo app   │ 548828d1-4e83-4e57-a0ed-b94119fc46ad │ var1            │                   │ variable │ This is variable 1        │             │ true              │                          │                          │                    │      │       │ read,update,delete            │                 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ d1ace221-b80e-4754-98ea-3d0a9ebc9632 │ Residential energy analysis │ 185378fa-4835-47db-b142-ecffb4ffe951 │ TimestampFormat │                   │ variable │ M/D/YYYY h:mm:ss[.fff] TT │ true        │ true              │                          │                          │                    │      │       │ read,update,delete            │                 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ c840670c-7178-4a5e-8409-ba2da69127e2 │ Meetup.com                  │ 3773a685-d3ce-453f-9e7a-d88514207dbe │ TimestampFormat │                   │ variable │ M/D/YYYY h:mm:ss[.fff] TT │ true        │ true              │                          │                          │                    │      │       │ read,update,delete            │                 │
└──────────────────────────────────────┴─────────────────────────────┴──────────────────────────────────────┴─────────────────┴───────────────────┴──────────┴───────────────────────────┴─────────────┴───────────────────┴──────────────────────────┴──────────────────────────┴────────────────────┴──────┴───────┴───────────────────────────────┴─────────────────┘
```

## Delete variables in a Sense app

There are three kinds of variables in Sense:

1. Variables created in the load script using `let` or `set` statements. These variables will get the property "Is script created" set to `true` in the output table created by Ctrl-Q.
2. Variables created in the Sense app development UI. These will have a blank (=undefined) value in "Is script created".
3. Protected variables of different kinds, these have special meanings in the load script. Examples include [system variables](https://help.qlik.com/en-US/sense/February2023/Subsystems/Hub/Content/Sense_Hub/Scripting/SystemVariables/system-variables.htm), [error variables](https://help.qlik.com/en-US/sense/February2023/Subsystems/Hub/Content/Sense_Hub/Scripting/ErrorVariables/ErrorVariables.htm) and [Number interpretation variables](https://help.qlik.com/en-US/sense/February2023/Subsystems/Hub/Content/Sense_Hub/Scripting/NumberInterpretationVariables/number-interpretation-variables.htm).  
   These have the property "Is reserved" set to `true` in the variable table created by Ctrl-Q's `variable-get` command.  
   All the variables that are automatically inserted at the beginning of new apps are of this kind, see image below.

![Qlik sense variables with special meaning](/img/qlik-sense-special-variables-1.png)

The protected variables [cannot be deleted](https://help.qlik.com/en-US/sense-developer/February2023/Subsystems/EngineAPI/Content/Sense_EngineAPI/WorkingWithAppsAndVisualizations/CreateVariables/remove-variable.htm) using the app development UI or by Ctrl-Q, neither can script-created variables.  
To remove script created variables you must first remove them from the app's load script and then reload the app. Those variables re

The example below deletes certain variables in several apps. The `--dry-run` option means Ctrl-Q will not delete any variables, but rather show what would be deleted.

If all variables should be deleted the `--delete-all` option can be used.  
Note that if `--delete-all` is used `--id-type` and `--variable` must **not** be used.

```powershell
.\ctrl-q.exe  variable-delete `
--auth-type cert `
--host 192.168.100.109 `
--auth-user-dir LAB `
--auth-user-id goran `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 2933711d-6638-41d4-a2d2-6dd2d965208b `
--app-tag 'Ctrl-Q variable 1' 'Ctrl-Q variable 2' `
--id-type name `
--variable a1 a2 a3 vVar1 `
--dry-run
```

```text
2023-09-27T04:28:20.183Z info: -----------------------------------------------------------
2023-09-27T04:28:20.183Z info: | Ctrl-Q
2023-09-27T04:28:20.198Z info: |
2023-09-27T04:28:20.198Z info: | Version      : 3.13.1
2023-09-27T04:28:20.198Z info: | Log level    : info
2023-09-27T04:28:20.198Z info: |
2023-09-27T04:28:20.198Z info: | Command      : variable-delete
2023-09-27T04:28:20.198Z info: |              : delete one or more variables in one or more apps
2023-09-27T04:28:20.198Z info: |
2023-09-27T04:28:20.198Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T04:28:20.198Z info: |
2023-09-27T04:28:20.198Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T04:28:20.198Z info: ----------------------------------------------------------
2023-09-27T04:28:20.198Z info:
2023-09-27T04:28:20.326Z info: ------------------------
2023-09-27T04:28:20.326Z info: Deleting variables in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI"
2023-09-27T04:28:20.967Z warn: Variable "a1" does not exist in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI"
2023-09-27T04:28:20.967Z warn: Variable "a2" does not exist in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI"
2023-09-27T04:28:20.967Z warn: Variable "a3" does not exist in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI"
2023-09-27T04:28:20.982Z warn: Variable "vVar1" does not exist in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI"
2023-09-27T04:28:20.982Z info: ------------------------
2023-09-27T04:28:20.982Z info: Deleting variables in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2023-09-27T04:28:21.480Z warn: Variable "a1" does not exist in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2023-09-27T04:28:21.480Z warn: Variable "a2" does not exist in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2023-09-27T04:28:21.496Z warn: Variable "a3" does not exist in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2023-09-27T04:28:21.496Z warn: Variable "vVar1" does not exist in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2023-09-27T04:28:21.496Z info: ------------------------
2023-09-27T04:28:21.496Z info: Deleting variables in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab"
2023-09-27T04:28:21.918Z warn: Variable "a1" does not exist in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab"
2023-09-27T04:28:21.918Z warn: Variable "a2" does not exist in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab"
2023-09-27T04:28:21.933Z warn: Variable "a3" does not exist in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab"
2023-09-27T04:28:21.933Z warn: Variable "vVar1" does not exist in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab"
2023-09-27T04:28:21.933Z info: ------------------------
2023-09-27T04:28:21.933Z info: Deleting variables in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app"
2023-09-27T04:28:22.544Z info: DRY RUN: Delete of variable "a1" in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app" would happen here
2023-09-27T04:28:22.544Z info: DRY RUN: Delete of variable "a2" in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app" would happen here
2023-09-27T04:28:22.558Z warn: Variable "a3" does not exist in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app"
2023-09-27T04:28:22.558Z info: DRY RUN: Delete of variable "vVar1" in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app" would happen here
2023-09-27T04:28:22.558Z info: ------------------------
2023-09-27T04:28:22.558Z info: Deleting variables in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2023-09-27T04:28:23.090Z warn: Variable "a1" does not exist in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2023-09-27T04:28:23.090Z warn: Variable "a2" does not exist in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2023-09-27T04:28:23.105Z warn: Variable "a3" does not exist in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2023-09-27T04:28:23.105Z warn: Variable "vVar1" does not exist in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2023-09-27T04:28:23.105Z info: ------------------------
2023-09-27T04:28:23.121Z info: Deleting variables in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
2023-09-27T04:28:23.514Z warn: Variable "a1" does not exist in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
2023-09-27T04:28:23.514Z warn: Variable "a2" does not exist in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
2023-09-27T04:28:23.529Z warn: Variable "a3" does not exist in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
2023-09-27T04:28:23.529Z warn: Variable "vVar1" does not exist in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
```
