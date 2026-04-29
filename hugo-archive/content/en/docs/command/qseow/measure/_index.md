---
title: Measures
description: >
    In-app master measures.
weight: 50
tags: [master-item]
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [List master item measures in a Sense app](#list-master-item-measures-in-a-sense-app)
  - [Syntax](#syntax)
  - [Example](#example)
- [Delete master item measures in a Sense app](#delete-master-item-measures-in-a-sense-app)
  - [Syntax](#syntax-1)
  - [Example](#example-1)

---

## List master item measures in a Sense app

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow master-item-measure-get --help
Usage: ctrl-q qseow master-item-measure-get [options]
                                                                                                                                                                                                                     get info about one or more master measures

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
  --id-type <type>              type of identifier passed in the --master-item option (choices: "id", "name", default: "name")
  --master-item <ids...>        master measure to retrieve. If not specified all measures will be retrieved
  --output-format <format>      output format (choices: "json", "table", default: "json")
  -h, --help                    display help for command
```

### Example

```text
.\ctrl-q.exe qseow master-item-measure-get `
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-user-dir LAB `
--auth-user-id goran `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--output-format table
```

```text
2024-11-15T15:33:50.823Z info: -----------------------------------------------------------
2024-11-15T15:33:50.825Z info: | Ctrl-Q
2024-11-15T15:33:50.825Z info: |
2024-11-15T15:33:50.825Z info: | Version      : 4.0.0
2024-11-15T15:33:50.825Z info: | Log level    : info
2024-11-15T15:33:50.827Z info: |
2024-11-15T15:33:50.827Z info: | Command      : master-item-measure-get
2024-11-15T15:33:50.827Z info: |              : get info about one or more master measures
2024-11-15T15:33:50.827Z info: |
2024-11-15T15:33:50.828Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T15:33:50.828Z info: |
2024-11-15T15:33:50.828Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T15:33:50.828Z info: ----------------------------------------------------------
2024-11-15T15:33:50.828Z info:
2024-11-15T15:33:50.831Z info: Get master measures
2024-11-15T15:33:51.465Z info:
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Measures (6 measure(s) found in the app)                                                                                                                                                                                                                                                                                                                                                                                                                                           │
├──────────────────────────────────────┬─────────┬────────────────────────┬───────────────────────────────────────────────────┬──────────────────┬──────────────────┬──────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────────────────────────────────┬──────────┬──────────┬───────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬───────────┬───────────┤
│ Id                                   │ Type    │ Title                  │ Description                                       │ Label            │ Label expression │ Definition           │ Coloring                                                                                             │ Number format                         │ Grouping │ Approved │ Published │ Publish time             │ Created date             │ Modified date            │ Owner     │ Tags      │
├──────────────────────────────────────┼─────────┼────────────────────────┼───────────────────────────────────────────────────┼──────────────────┼──────────────────┼──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼───────────┤
│ 9d563fc2-ad00-41db-ad15-0f80c522686d │ measure │ Revenue EUR (LY)       │ Revenue during last year.                         │ ='Revenue LY'    │ ='Revenue LY'    │ Sum(Revenue_LY)      │                                                                                                      │ {"qType":"U","qnDec":10,"qUseThou":0} │ N        │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2023-05-09T15:18:20.753Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │ Sales, LY │
├──────────────────────────────────────┼─────────┼────────────────────────┼───────────────────────────────────────────────────┼──────────────────┼──────────────────┼──────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼───────────┤
│ a260c5a2-21e9-4ce5-92d9-c3e7837e51a2 │ measure │ No. of sold units (LY) │ Number of units sold last year.                   │ ='Sold units LY' │ ='Sold units LY' │ Sum(UnitsInOrder_LY) │ Measure color:                                                                                       │ {"qType":"U","qnDec":10,"qUseThou":0} │ N        │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2023-05-09T15:18:20.753Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │ Sales, LY │
│                                      │         │                        │                                                   │                  │                  │                      │ {"color":"#8a85c6","index":8}                                                                        │                                       │          │          │           │                          │                          │                          │           │           │
│                                      │         │                        │                                                   │                  │                  │                      │                                                                                                      │                                       │          │          │           │                          │                          │                          │           │           │
│                                      │  
```

## Delete master item measures in a Sense app

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow master-item-measure-delete --help
Usage: ctrl-q qseow master-item-measure-delete [options]
                                                                                                                                                                                                                     delete master measure(s)

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
  --id-type <type>              type of identifier passed in the --master-item option (choices: "id", "name")
  --master-item <ids...>        names or IDs of master measures to be deleted. Multiple IDs should be space separated
  --delete-all                  delete all master measures
  --dry-run                     do a dry run, i.e. do not delete anything - just show what would be deleted
  -h, --help                    display help for command
```

### Example

```text
.\ctrl-q.exe qseow master-item-measure-delete `
--host pro2-win1.lab.ptarmiganlabs.net `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--auth-user-dir LAB `
--auth-user-id goran `
--id-type name `
--master-item 'Revenue EUR' 'Profit EUR (LY)'
```

```text
2024-11-15T15:35:23.296Z info: -----------------------------------------------------------
2024-11-15T15:35:23.300Z info: | Ctrl-Q
2024-11-15T15:35:23.300Z info: |
2024-11-15T15:35:23.300Z info: | Version      : 4.0.0
2024-11-15T15:35:23.300Z info: | Log level    : info
2024-11-15T15:35:23.301Z info: |
2024-11-15T15:35:23.301Z info: | Command      : master-item-measure-delete
2024-11-15T15:35:23.301Z info: |              : delete master measure(s)
2024-11-15T15:35:23.302Z info: |
2024-11-15T15:35:23.302Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T15:35:23.302Z info: |
2024-11-15T15:35:23.302Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T15:35:23.302Z info: ----------------------------------------------------------
2024-11-15T15:35:23.303Z info:
2024-11-15T15:35:23.306Z info: Delete master measures
2024-11-15T15:35:23.959Z info: (1/2) Deleted master item measure "Revenue EUR", id=db090caf-9acb-4302-9be0-d2251c69c04f in app "a3e0f5d2-000a-464f-998d-33d333b175d7"
2024-11-15T15:35:23.962Z info: (2/2) Deleted master item measure "Profit EUR (LY)", id=60912ed8-116d-451f-b145-52d170d62552 in app "a3e0f5d2-000a-464f-998d-33d333b175d7"
```
