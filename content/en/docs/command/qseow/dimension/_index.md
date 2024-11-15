---
title: Dimensions
description: >
    In-app master dimension.
weight: 40
tags: [master-item]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [List master item dimensions in a Sense app](#list-master-item-dimensions-in-a-sense-app)
  - [Syntax](#syntax)
  - [Example](#example)
- [Delete master item dimensions in a Sense app](#delete-master-item-dimensions-in-a-sense-app)
  - [Syntax](#syntax-1)
  - [Example](#example-1)

---

## List master item dimensions in a Sense app

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow master-item-dim-get --help
Usage: ctrl-q qseow master-item-dim-get [options]

get info about one or more master dimensions

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
  --master-item <ids...>        master dimension to retrieve. If not specified all dimensions will be retrieved
  --output-format <format>      output format (choices: "json", "table", default: "json")
  -h, --help                    display help for command
```

### Example

```text
.\ctrl-q.exe qseow master-item-dim-get `
    --host pro2-win1.lab.ptarmiganlabs.net `
    --auth-user-dir LAB `
    --auth-user-id goran `
    --app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
    --output-format table
```

```text
2024-11-15T14:43:23.988Z info: -----------------------------------------------------------
2024-11-15T14:43:23.991Z info: | Ctrl-Q
2024-11-15T14:43:23.991Z info: |
2024-11-15T14:43:23.991Z info: | Version      : 4.0.0
2024-11-15T14:43:23.991Z info: | Log level    : info
2024-11-15T14:43:23.992Z info: |
2024-11-15T14:43:23.992Z info: | Command      : master-item-dim-get
2024-11-15T14:43:23.992Z info: |              : get info about one or more master dimensions
2024-11-15T14:43:23.992Z info: |
2024-11-15T14:43:23.993Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T14:43:23.993Z info: |
2024-11-15T14:43:23.995Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T14:43:23.995Z info: ----------------------------------------------------------
2024-11-15T14:43:23.995Z info:
2024-11-15T14:43:23.997Z info: Get master dimensions
2024-11-15T14:43:24.886Z info:
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Dimensions (6 dimension(s) found in the app)                                                                                                                                                                                                                                                                                                                                                                                                                            │
├──────────────────────────────────────┬───────────┬─────────────────┬────────────────────────────────┬───────────────────────────────┬────────────────────────┬──────────────────┬──────────────────┬─────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────┬──────────┬───────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬───────────┬────────────────┤
│ Id                                   │ Type      │ Title           │ Description (static)           │ Description (from expression) │ Description expression │ Label expression │ Definition count │ Definition  │ Coloring                                                                                             │ Grouping │ Approved │ Published │ Publish time             │ Created date             │ Modified date            │ Owner     │ Tags           │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ JDWuPK                               │ dimension │ Dimension 2-3-1 │ Description for 2-3-1          │                               │                        │                  │ 3                │ Dim2        │ Dimension color:                                                                                     │ H        │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2021-06-07T02:31:02.093Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │ My awesome tag │
│                                      │           │                 │                                │                               │                        │                  │                  │ Dim3        │ {"color":"#ffffff","index":1}                                                                        │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │ Dim1        │                                                                                                      │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │                          │           │                │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ cb922a28-ff2d-4d97-a9fd-5d99eae2a490 │ dimension │ Color           │ Color of sold unit             │                               │                        │ ='Unit color'    │ 1                │ UnitColor   │                                                                                                      │ N        │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2023-05-09T15:11:34.957Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │ Sales, Color   │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ 3047e493-f24f-4d31-a0fb-6b797874b049 │ dimension │ Salesperson     │ The person who sold the unit.  │                               │                        │ ='Salesperson'   │ 1                │ Salesperson │ Value colors:                                                                                        │ N        │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2023-03-08T16:45:26.610Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │ Staff, Sales   │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ {"colors":[{"value":"Afghanistan","baseColor":{"color":"#8a85c6","index":-1}},{"value":"Albania","ba │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ seColor":{"color":"#aaaaaa","index":-1}},{"value":"Algeria","baseColor":{"color":"#a16090","index":9 │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ }}],"nul":{"color":"#c8c7a9","index":16},"oth":{"color":"#ffec6e","index":-1},"pal":null,"single":nu │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ ll,"usePal":true,"autoFill":true}                                                                    │          │          │           │                          │                          │
   │           │                │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ 6f375071-5603-401c-815a-9bd59e02623b │ dimension │ DimDrill        │ Drill-down 1                   │                               │                        │                  │ 3                │ Dim1        │ Dimension color:                                                                                     │ H        │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2023-06-05T18:39:33.522Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │ Staff, Color   │
│                                      │           │                 │                                │                               │                        │                  │                  │  Dim2       │ {"color":"#bbbbbb","index":-1}                                                                       │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │  Dim3       │                                                                                                      │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │
   │           │                │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ 3ca0998b-2c10-485a-9156-7802cb4a2bfe │ dimension │ Sales month     │ Date in which a unit was sold. │                               │                        │ ='Sales month'   │ 1                │ Month_Sales │ Dimension color:                                                                                     │ N        │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2024-03-12T09:31:00.986Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ {"color":"#bbbbbb","index":-1}                                                                       │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │
   │           │                │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ 5940487d-18de-4366-91ad-b061b539b05a │ dimension │ Country         │ Country where a unit was sold. │                               │                        │ ='Country sold'  │ 1                │ Country     │ Dimension color:                                                                                     │ N        │ true     │ true      │ 2024-03-20T08:02:24.735Z │ 2024-03-12T09:31:00.986Z │ 2024-03-20T08:02:25.153Z │ LAB\goran │ Geo, DimCat1   │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ {"color":"#bbbbbb","index":-1}                                                                       │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ Value colors:                                                                                        │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ {"colors":[{"value":"Afghanistan","baseColor":{"color":"#8a85c6","index":-1}},{"value":"Albania","ba │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ seColor":{"color":"#aaaaaa","index":-1}},{"value":"Algeria","baseColor":{"color":"#a16090","index":9 │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ }}],"nul":{"color":"#c8c7a9","index":16},"oth":{"color":"#ffec6e","index":-1},"pal":null,"single":nu │          │          │           │                          │                          │
   │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ ll,"usePal":true,"autoFill":true}                                                                    │          │          │           │                          │                          │
   │           │                │
└──────────────────────────────────────┴───────────┴─────────────────┴────────────────────────────────┴───────────────────────────────┴────────────────────────┴──────────────────┴──────────────────┴─────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────┴──────────┴───────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴───────────┴────────────────┘
```

## Delete master item dimensions in a Sense app

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow master-item-dim-delete --help
Usage: ctrl-q qseow master-item-dim-delete [options]

delete master dimension(s)                                                                                                                                                                                           
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
  --master-item <ids...>        names or IDs of master dimensions to be deleted. Multiple IDs should be space separated
  --delete-all                  delete all master dimensions
  --dry-run                     do a dry run, i.e. do not delete anything - just show what would be deleted
  -h, --help                    display help for command
````

### Example

```text
.\ctrl-q.exe qseow master-item-dim-delete `
    --host pro2-win1.lab.ptarmiganlabs.net `
    --auth-user-dir LAB `
    --auth-user-id goran `
    --app-id 2933711d-6638-41d4-a2d2-6dd2d965208b `
    --id-type name `
    --master-item 'Country' 'Sales month'
```

```text
2024-03-12T08:37:39.057Z info: -----------------------------------------------------------
2024-03-12T08:37:39.057Z info: | Ctrl-Q
2024-03-12T08:37:39.057Z info: |
2024-03-12T08:37:39.057Z info: | Version      : 3.16.0
2024-03-12T08:37:39.057Z info: | Log level    : info
2024-03-12T08:37:39.057Z info: |
2024-03-12T08:37:39.057Z info: | Command      : master-item-dim-delete
2024-03-12T08:37:39.057Z info: |              : delete master dimension(s)
2024-03-12T08:37:39.057Z info: |
2024-03-12T08:37:39.057Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T08:37:39.057Z info: |
2024-03-12T08:37:39.057Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T08:37:39.057Z info: ----------------------------------------------------------
2024-03-12T08:37:39.057Z info:
2024-03-12T08:37:39.057Z info: Delete master dimensions
2024-03-12T08:37:39.542Z info: (1/2) Deleted master item dimension "Country", id=d404a273-01d4-4ca4-975e-2dea2cce89ee in app "a3e0f5d2-000a-464f-998d-33d333b175d7"
2024-03-12T08:37:39.542Z info: (2/2) Deleted master item dimension "Sales month", id=0e85b6af-1ddb-4c2d-bd2e-b0e80464e8cf in app "a3e0f5d2-000a-464f-998d-33d333b175d7"
```
