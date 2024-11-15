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
  - [Syntax](#syntax)
  - [Example](#example)
- [Delete variables in a Sense app](#delete-variables-in-a-sense-app)
  - [Syntax](#syntax-1)
  - [Example](#example-1)

---

## List variables in a Sense app

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow variable-get --help
Usage: ctrl-q qseow variable-get [options]

get variable definitions in one or more apps

Options:
  --log-level <level>           log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                 Qlik Sense server IP/FQDN
  --engine-port <port>          Qlik Sense server engine port (usually 4747 for cert auth, 443 for jwt auth) (default: "4747")
  --qrs-port <port>             Qlik Sense repository service (QRS) port (usually 4747 for cert auth, 443 for jwt auth) (default: "4242")
  --schema-version <string>     Qlik Sense engine schema version (default: "12.612.0")
  --app-id <id...>              Qlik Sense app ID(s) to get variables from
  --app-tag <tag...>            Qlik Sense app tag(s) to get variables
  --virtual-proxy <prefix>      Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>         https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>   user directory for user to connect with
  --auth-user-id <userid>       user ID for user to connect with
  -a, --auth-type <type>        authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>       Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>   Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>  Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>              JSON Web Token (JWT) to use for authentication with Qlik Sense server
  --id-type <type>              type of identifier passed in the --variable option (choices: "id", "name", default: "name")
  --variable <ids...>           variables to retrieve. If not specified all variables will be retrieved
  --output-format <format>      output format (choices: "json", "table", default: "json")
  -h, --help                    display help for command
```

### Example

The command below lists certain variables (named `Ctrl-Q variable 1`, `TimestampFormat`, `var1` and `vVar1`) in apps matching appId `a3e0f5d2-000a-464f-998d-33d333b175d7` and app tags `Ctrl-Q variable 1` and `Ctrl-Q variable 2`.

If the `--variable` option is not included all variables will be included in the table.

Use `--output-format json` to get the results as JSON.

```text
.\ctrl-q.exe qseow variable-get `
    --host pro2-win1.lab.ptarmiganlabs.net `
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
2024-11-15T16:15:45.620Z info: -----------------------------------------------------------
2024-11-15T16:15:45.623Z info: | Ctrl-Q
2024-11-15T16:15:45.623Z info: |
2024-11-15T16:15:45.623Z info: | Version      : 4.0.0
2024-11-15T16:15:45.623Z info: | Log level    : info
2024-11-15T16:15:45.625Z info: |
2024-11-15T16:15:45.625Z info: | Command      : variable-get
2024-11-15T16:15:45.625Z info: |              : get variable definitions in one or more apps
2024-11-15T16:15:45.625Z info: |
2024-11-15T16:15:45.626Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T16:15:45.626Z info: |
2024-11-15T16:15:45.626Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T16:15:45.626Z info: ----------------------------------------------------------
2024-11-15T16:15:45.626Z info:
2024-11-15T16:15:46.050Z info: Found 5 apps to process
2024-11-15T16:15:46.236Z info: Getting variables from app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe, "Minecraft Metrics"
2024-11-15T16:15:46.614Z info: Getting variables from app e377d9b5-231a-4795-800f-3649983647dd, "LDAP lab"
2024-11-15T16:15:47.080Z info: Getting variables from app a3e0f5d2-000a-464f-998d-33d333b175d7, "Sheet thumbnails demo app"
2024-11-15T16:15:47.758Z info: Getting variables from app d1ace221-b80e-4754-98ea-3d0a9ebc9632, "Residential energy analysis"
2024-11-15T16:15:48.239Z info: Getting variables from app c840670c-7178-4a5e-8409-ba2da69127e2, "Meetup.com"
2024-11-15T16:15:48.893Z info:
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ In-app variables                                                                                                                                                                                                                                                                                                                                                     │
├──────────────────────────────────────┬─────────────────────────────┬──────────────────────────────────────┬─────────────────┬───────────────────┬──────────┬───────────────────────────┬─────────────┬───────────────────┬──────────────────────────┬──────────────────────────┬────────────────────┬──────┬───────┬───────────────────────────────┬─────────────────┤
│ App ID                               │ App name                    │ Variable ID                          │ Variable name   │ Description       │ Type     │ Definition                │ Is reserved │ Is script created │ Created date             │ Modified date            │ Engine object type │ Size │ Title │ Privileges                    │ Tags            │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ f16fa63d-54c7-4c8d-81f1-2d084d46bcfe │ Minecraft Metrics           │ cd5eb1a8-bd19-42f6-8d58-55905297572b │ TimestampFormat │                   │ variable │ M/D/YYYY h:mm:ss[.fff] TT │ true        │ true              │                          │                          │                    │      │       │ read,update,delete            │                 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ e377d9b5-231a-4795-800f-3649983647dd │ LDAP lab                    │ 56c3db7d-050f-4cf0-8249-59fd817ae782 │ vVar1           │                   │ variable │ asfdsdf                   │             │                   │ 2022-05-17T07:17:14.422Z │ 2024-03-12T09:05:08.439Z │                    │ -1   │       │ read,update,delete,exportdata │                 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ e377d9b5-231a-4795-800f-3649983647dd │ LDAP lab                    │ c1a99293-51d0-426b-bdb7-a43b2d896dc9 │ TimestampFormat │                   │ variable │ M/D/YYYY h:mm:ss[.fff] TT │ true        │ true              │                          │                          │                    │      │       │ read,update,delete            │                 │
├──────────────────────────────────────┼─────────────────────────────┼──────────────────────────────────────┼─────────────────┼───────────────────┼──────────┼───────────────────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼──────┼───────┼───────────────────────────────┼─────────────────┤
│ a3e0f5d2-000a-464f-998d-33d333b175d7 │ Sheet thumbnails demo app   │ 0155e35e-8054-4896-9dd7-d947405f3a90 │ vVar1           │ vVar1 description │ variable │ ='abc' & '123'            │             │                   │ 2021-06-03T22:04:52.283Z │ 2023-10-31T06:12:00.194Z │                    │ -1   │       │ read,update,delete,exportdata │ varTag1,varTag2 │
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

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow variable-delete --help
Usage: ctrl-q qseow variable-delete [options]

delete one or more variables in one or more apps

Options:
  --log-level <level>           log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                 Qlik Sense server IP/FQDN
  --engine-port <port>          Qlik Sense server engine port (usually 4747 for cert auth, 443 for jwt auth) (default: "4747")
  --qrs-port <port>             Qlik Sense repository service (QRS) port (usually 4242 for cert auth, 443 for jwt auth) (default: "4242")
  --schema-version <string>     Qlik Sense engine schema version (default: "12.612.0")
  --app-id <id...>              Qlik Sense app ID(s) to get variables from
  --app-tag <tag...>            Qlik Sense app tag(s) to get variables
  --virtual-proxy <prefix>      Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>         https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>   user directory for user to connect with
  --auth-user-id <userid>       user ID for user to connect with
  -a, --auth-type <type>        authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>       Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>   Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>  Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>              JSON Web Token (JWT) to use for authentication with Qlik Sense server
  --id-type <type>              type of identifier passed in the --variable option (choices: "id", "name", default: "name")
  --variable <ids...>           variables to retrieve. If not specified all variables will be retrieved
  --delete-all                  delete all variables
  --dry-run                     do a dry run, i.e. do not delete anything - just show what would be deleted
  -h, --help                    display help for command
```

### Example

The example below deletes certain variables in several apps.  
The `--dry-run` option means Ctrl-Q will not delete any variables, but rather show what would be deleted.

If all variables should be deleted the `--delete-all` option can be used.  
Note that if `--delete-all` is used `--id-type` and `--variable` must **not** be used.

```text
.\ctrl-q.exe qseow variable-delete `
    --auth-type cert `
    --host pro2-win1.lab.ptarmiganlabs.net `
    --auth-user-dir LAB `
    --auth-user-id goran `
    --app-id a3e0f5d2-000a-464f-998d-33d333b175d7 2933711d-6638-41d4-a2d2-6dd2d965208b `
    --app-tag 'Ctrl-Q variable 1' 'Ctrl-Q variable 2' `
    --id-type name `
    --variable a1 a2 a3 vVar1 `
    --dry-run
```

```text
2024-11-15T16:17:32.186Z info: -----------------------------------------------------------
2024-11-15T16:17:32.190Z info: | Ctrl-Q
2024-11-15T16:17:32.190Z info: |
2024-11-15T16:17:32.190Z info: | Version      : 4.0.0
2024-11-15T16:17:32.190Z info: | Log level    : info
2024-11-15T16:17:32.192Z info: |
2024-11-15T16:17:32.192Z info: | Command      : variable-delete
2024-11-15T16:17:32.192Z info: |              : delete one or more variables in one or more apps
2024-11-15T16:17:32.192Z info: |
2024-11-15T16:17:32.193Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T16:17:32.193Z info: |
2024-11-15T16:17:32.193Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T16:17:32.194Z info: ----------------------------------------------------------
2024-11-15T16:17:32.194Z info:
2024-11-15T16:17:32.717Z info: ------------------------
2024-11-15T16:17:32.717Z info: Deleting variables in app 2933711d-6638-41d4-a2d2-6dd2d965208b, "Ctrl-Q CLI"
2024-11-15T16:17:33.235Z info: DRY RUN: Delete of variable "a1" in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI" would happen here
2024-11-15T16:17:33.241Z warn: Variable "a2" does not exist in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI"
2024-11-15T16:17:33.241Z info: DRY RUN: Delete of variable "a3" in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI" would happen here
2024-11-15T16:17:33.241Z warn: Variable "vVar1" does not exist in app 2933711d-6638-41d4-a2d2-6dd2d965208b "Ctrl-Q CLI"
2024-11-15T16:17:33.241Z info: ------------------------
2024-11-15T16:17:33.241Z info: Deleting variables in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe, "Minecraft Metrics"
2024-11-15T16:17:33.680Z warn: Variable "a1" does not exist in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2024-11-15T16:17:33.682Z warn: Variable "a2" does not exist in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2024-11-15T16:17:33.683Z warn: Variable "a3" does not exist in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2024-11-15T16:17:33.683Z warn: Variable "vVar1" does not exist in app f16fa63d-54c7-4c8d-81f1-2d084d46bcfe "Minecraft Metrics"
2024-11-15T16:17:33.683Z info: ------------------------
2024-11-15T16:17:33.683Z info: Deleting variables in app e377d9b5-231a-4795-800f-3649983647dd, "LDAP lab"
2024-11-15T16:17:34.103Z warn: Variable "a1" does not exist in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab"
2024-11-15T16:17:34.106Z warn: Variable "a2" does not exist in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab"
2024-11-15T16:17:34.106Z warn: Variable "a3" does not exist in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab"
2024-11-15T16:17:34.107Z info: DRY RUN: Delete of variable "vVar1" in app e377d9b5-231a-4795-800f-3649983647dd "LDAP lab" would happen here
2024-11-15T16:17:34.107Z info: ------------------------
2024-11-15T16:17:34.107Z info: Deleting variables in app a3e0f5d2-000a-464f-998d-33d333b175d7, "Sheet thumbnails demo app"
2024-11-15T16:17:34.855Z info: DRY RUN: Delete of variable "a1" in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app" would happen here
2024-11-15T16:17:34.859Z info: DRY RUN: Delete of variable "a2" in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app" would happen here
2024-11-15T16:17:34.859Z warn: Variable "a3" does not exist in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app"
2024-11-15T16:17:34.860Z info: DRY RUN: Delete of variable "vVar1" in app a3e0f5d2-000a-464f-998d-33d333b175d7 "Sheet thumbnails demo app" would happen here
2024-11-15T16:17:34.860Z info: ------------------------
2024-11-15T16:17:34.860Z info: Deleting variables in app d1ace221-b80e-4754-98ea-3d0a9ebc9632, "Residential energy analysis"
2024-11-15T16:17:35.326Z warn: Variable "a1" does not exist in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2024-11-15T16:17:35.330Z warn: Variable "a2" does not exist in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2024-11-15T16:17:35.330Z warn: Variable "a3" does not exist in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2024-11-15T16:17:35.330Z warn: Variable "vVar1" does not exist in app d1ace221-b80e-4754-98ea-3d0a9ebc9632 "Residential energy analysis"
2024-11-15T16:17:35.330Z info: ------------------------
2024-11-15T16:17:35.330Z info: Deleting variables in app c840670c-7178-4a5e-8409-ba2da69127e2, "Meetup.com"
2024-11-15T16:17:35.842Z warn: Variable "a1" does not exist in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
2024-11-15T16:17:35.845Z warn: Variable "a2" does not exist in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
2024-11-15T16:17:35.845Z warn: Variable "a3" does not exist in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
2024-11-15T16:17:35.845Z warn: Variable "vVar1" does not exist in app c840670c-7178-4a5e-8409-ba2da69127e2 "Meetup.com"
```
