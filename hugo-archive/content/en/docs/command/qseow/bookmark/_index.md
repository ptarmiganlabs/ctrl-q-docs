---
title: Bookmarks
description: >
    
weight: 20
tags: [bookmark]
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [List bookmarks in a Sense app](#list-bookmarks-in-a-sense-app)
  - [Syntax](#syntax)
  - [Example](#example)

---

## List bookmarks in a Sense app

### Syntax

```plaintext
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow bookmark-get --help
Usage: ctrl-q qseow bookmark-get [options]

get info about one or more bookmarks

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
  --id-type <type>              type of bookmark identifier passed in the --bookmark option (choices: "id", "name", default: "name")
  --bookmark <bookmarks...>     bookmark to retrieve. If not specified all bookmarks will be retrieved
  --output-format <json|table>  output format (default: "json")
  -h, --help                    display help for command
```

### Example

```powershell
.\ctrl-q.exe qseow bookmark-get `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
  --output-format table `
  --auth-user-dir LAB `
  --auth-user-id goran
```

```text
2024-11-15T14:28:18.202Z info: -----------------------------------------------------------
2024-11-15T14:28:18.205Z info: | Ctrl-Q
2024-11-15T14:28:18.205Z info: |
2024-11-15T14:28:18.205Z info: | Version      : 4.0.0
2024-11-15T14:28:18.205Z info: | Log level    : info
2024-11-15T14:28:18.206Z info: |
2024-11-15T14:28:18.206Z info: | Command      : bookmark-get
2024-11-15T14:28:18.206Z info: |              : get info about one or more bookmarks
2024-11-15T14:28:18.206Z info: |
2024-11-15T14:28:18.207Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T14:28:18.207Z info: |
2024-11-15T14:28:18.207Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T14:28:18.207Z info: ----------------------------------------------------------
2024-11-15T14:28:18.207Z info:
2024-11-15T14:28:18.211Z info: Get bookmarks
2024-11-15T14:28:19.351Z info: Bookmarks
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Bookmarks (1 bookmark(s) found in the app)                                                                                                                                                                                                                                                               │
├──────────────────────────────────────┬──────────┬───────────┬─────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────┬───────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬───────────┤
│ Id                                   │ Type     │ Title     │ Description     │ Bookmark definition                                                                                  │ Approved │ Published │ Publish time             │ Created date             │ Modified date            │ Owner     │
├──────────────────────────────────────┼──────────┼───────────┼─────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┤
│ 81ec0c0d-c90c-431b-8c19-eff4048de404 │ bookmark │ Bookmark1 │ BM1 description │ {"qStateData":[{"qStateName":"$","qFieldItems":[{"qDef":{"qName":"Dim1","qType":"PRESENT"},"qSelectI │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2021-07-06T15:09:38.565Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │
│                                      │          │           │                 │ nfo":{"qRangeLo":"NaN","qRangeHi":"NaN","qNumberFormat":{"qType":"U","qnDec":10,"qUseThou":0},"qRang │          │           │                          │                          │                          │           │
│                                      │          │           │                 │ eInfo":[],"qContinuousRangeInfo":[]},"qValues":[],"qExcludedValues":[]}]}],"qUtcModifyTime":44383.71 │          │           │                          │                          │                          │           │
│                                      │          │           │                 │ 498842593,"qVariableItems":[],"qPatches":[],"qCyclicGroupStates":[],"qGroupStates":[]}               │          │           │                          │                          │                          │           │
└──────────────────────────────────────┴──────────┴───────────┴─────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────┴───────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴───────────┘
```
