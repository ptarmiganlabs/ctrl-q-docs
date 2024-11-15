---
title: Scramble fields
description: >
    Scramble fields in Sense apps.
weight: 60
tags: []
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Scramble fields in Sense app](#scramble-fields-in-sense-app)
  - [Syntax](#syntax)
  - [Example](#example)

---

## Scramble fields in Sense app

Scramble one or more fields in an app using Qlik Sense's internal scrambling feature.

Note:

- If more than one field is to be scrambled, the indidivudal field names should be separated by the character or string specified in the `--separator` option.
- The entire list of field names (the `--fieldname` option) should be surrounded by double quotes.
- A new app with the scrambled data will be created. Specify its name in the `--newappname` option.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow field-scramble --help
Usage: ctrl-q qseow field-scramble [options]

scramble one or more fields in an app. A new app with the scrambled data is created.                                                                                                                                 
Options:
  --log-level <level>           log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                 Qlik Sense server IP/FQDN
  --port <port>                 Qlik Sense server engine port (usually 4747 for cert auth, 443 for jwt auth) (default: "4747")
  --schema-version <string>     Qlik Sense engine schema version (default: "12.612.0")
  --app-id <id>                 Qlik Sense app ID
  --virtual-proxy <prefix>      Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>         https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>   user directory for user to connect with
  --auth-user-id <userid>       user ID for user to connect with
  -a, --auth-type <type>        authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>       Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>   Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>  Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>              JSON Web Token (JWT) to use for authentication with Qlik Sense server
  --field-name <names...>       name of field(s) to be scrambled
  --new-app-name <name>         name of new app that will contain scrambled data
  -h, --help                    display help for command
```

### Example

```text
.\ctrl-q.exe qseow field-scramble `
--host pro2-win1.lab.ptarmiganlabs.net `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--auth-user-dir LAB `
--auth-user-id goran `
--field-name Expression1 Dim1 AsciiAlpha `
--new-app-name __ScrambledTest1
```

```text
2024-11-15T15:37:59.296Z info: -----------------------------------------------------------
2024-11-15T15:37:59.301Z info: | Ctrl-Q
2024-11-15T15:37:59.302Z info: |
2024-11-15T15:37:59.302Z info: | Version      : 4.0.0
2024-11-15T15:37:59.302Z info: | Log level    : info
2024-11-15T15:37:59.302Z info: |
2024-11-15T15:37:59.304Z info: | Command      : field-scramble
2024-11-15T15:37:59.304Z info: |              : scramble one or more fields in an app. A new app with the scrambled data is created.
2024-11-15T15:37:59.304Z info: |
2024-11-15T15:37:59.304Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T15:37:59.304Z info: |
2024-11-15T15:37:59.304Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T15:37:59.304Z info: ----------------------------------------------------------
2024-11-15T15:37:59.305Z info:
2024-11-15T15:37:59.308Z info: Scramble field
2024-11-15T15:38:00.174Z info: Scrambled field "Expression1"
2024-11-15T15:38:00.181Z info: Scrambled field "Dim1"
2024-11-15T15:38:00.189Z info: Scrambled field "AsciiAlpha"
2024-11-15T15:38:01.238Z info: Scrambled data written to new app "__ScrambledTest1" with app ID: 9f377cd6-ce5b-4756-aa7c-2eb0fa4c7494
```
