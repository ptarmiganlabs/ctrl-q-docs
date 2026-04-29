---
title: Apps
description: >
    Import apps into Qlik Sense
weight: 10
tags: [app, import, qvf]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Import apps from QVF files](#import-apps-from-qvf-files)
  - [Syntax](#syntax)
  - [Example](#example)

---

All example below use Windows Terminal/PowerShell.

## Import apps from QVF files

.QVF files are Sense apps stored on disk.  
Ctrl-Q's `app-import` command does bulk import of such QVF files, as well as setting tags and custom properties on the created apps.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow app-import --help
Usage: ctrl-q qseow app-import [options]

import apps/upload QVF files on disk to Sense based on definitions in Excel file.

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
  -t, --file-type <type>             source file type (choices: "excel", default: "excel")
  --file-name <filename>             file containing app definitions
  --sheet-name <name>                name of Excel sheet where app info is found
  --limit-import-count <number>      import at most x number of apps. Defaults to 0 = no limit (default: 0)
  --sleep-app-upload <milliseconds>  Wait this long before continuing after each app has been uploaded to Sense. Defaults to 1000 = 1 second (default: 1000)
  --dry-run                          do a dry run, i.e. do not import any apps - just show what would be done
  -h, --help                         display help for command
```

### Example

Importing apps defined on the `App import` sheet of the `tasks.xlsx` Excel file can be done with a command like this:

```text
.\ctrl-q.exe qseow app-import `
    --auth-type cert `
    --host pro2-win1.lab.ptarmiganlabs.net `
    --auth-cert-file ./cert/client.pem `
    --auth-cert-key-file ./cert/client_key.pem `
    --auth-user-dir LAB `
    --auth-user-id goran `
    --file-name tasks.xlsx `
    --sheet-name "App import"
```

```text
2024-11-15T16:51:49.662Z info: -----------------------------------------------------------
2024-11-15T16:51:49.666Z info: | Ctrl-Q
2024-11-15T16:51:49.666Z info: |
2024-11-15T16:51:49.666Z info: | Version      : 4.0.0
2024-11-15T16:51:49.666Z info: | Log level    : info
2024-11-15T16:51:49.666Z info: |
2024-11-15T16:51:49.666Z info: | Command      : app-import
2024-11-15T16:51:49.666Z info: |              : import apps/upload QVF files on disk to Sense based on definitions in Excel file.
2024-11-15T16:51:49.666Z info: |
2024-11-15T16:51:49.668Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T16:51:49.668Z info: |
2024-11-15T16:51:49.668Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T16:51:49.668Z info: ----------------------------------------------------------
2024-11-15T16:51:49.668Z info:
2024-11-15T16:51:49.671Z info: Import apps from definitions in file "tasks.xlsx"
2024-11-15T16:51:49.860Z info: Successfully retrieved 29 tags from QSEoW
2024-11-15T16:51:49.944Z info: Successfully retrieved 36 custom properties from QSEoW
2024-11-15T16:51:49.979Z info: -------------------------------------------------------------------
2024-11-15T16:51:49.979Z info: Importing apps...
2024-11-15T16:51:49.979Z info: (1) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-11-15T16:51:54.887Z info: (1, delete-publish) App "App 3" published to stream "Ctrl-Q demo apps", the existing app (if one exists) with the same name in this stream has been deleted. Id of published app: 82123db2-0aa9-443c-a4d5-aab6ce24d7a1
2024-11-15T16:51:54.888Z info: (2) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-11-15T16:52:01.948Z info: (2, publish-replace) App "App 3" published to stream "Ctrl-Q demo apps", replacing the existing app with the same name. Id of published app: 82123db2-0aa9-443c-a4d5-aab6ce24d7a1
2024-11-15T16:52:01.948Z info: (3) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-11-15T16:52:06.203Z warn: (3) PUBLISH APP publish-replace: More than one app with the same name "App 1" in the target stream "Ctrl-Q demo apps". Impossible to know which one to replace. Skipping publishing for this app. The uploaded app is still present in the QMC (id=448c5969-adca-427a-a502-7859aadec93e).
2024-11-15T16:52:06.203Z error: (3) Failed publishing app "App 1" to stream "Ctrl-Q demo apps"
2024-11-15T16:52:06.203Z info: (4) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-11-15T16:52:10.295Z info: (4, publish-another) App "App 1" published to stream "Ctrl-Q demo apps". Id of published app: d1426332-0699-4fd3-8629-77beac8eecae
2024-11-15T16:52:10.295Z info: (5) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-11-15T16:52:14.320Z warn: (5) PUBLISH APP publish-replace: More than one app with the same name "App 1" in the target stream "Ctrl-Q demo apps". Impossible to know which one to replace. Skipping publishing for this app. The uploaded app is still present in the QMC (id=a4fbfd0c-48a9-4fa6-bb4b-7833dfe05307).
2024-11-15T16:52:14.320Z error: (5) Failed publishing app "App 1" to stream "Ctrl-Q demo apps"
2024-11-15T16:52:14.320Z info: (6) Importing app "App 2" from file "C:/tools/ctrl-q/testdata/App import 2.qvf"
2024-11-15T16:52:17.850Z warn: Stream "Stream does not exist" does not exist.
2024-11-15T16:52:17.851Z error: (6) Failed publishing app "App 2" to stream "Stream does not exist". The uploaded app is still present in the QMC (id=860ea6c4-9861-45c3-9aa4-23dda66f5ee8).
2024-11-15T16:52:17.851Z info: (7) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-11-15T16:52:23.450Z info: (7, publish-replace) App "App 3" published to stream "Ctrl-Q demo apps", replacing the existing app with the same name. Id of published app: 82123db2-0aa9-443c-a4d5-aab6ce24d7a1
```

> NOTE 1: Qlik Sense implements rate limiting for QVF uploads. This means that if you plan to upload more than 60 QVF files you may be affected by this rate limiting.  
> Ctrl-Q detects that it's being rate limited and implements a backoff strategy for retries, waiting longer and longer until it tries again.  
> Such retries are clearly shown in the Ctrl-Q logs.

The QMC now shows three new apps:

![Sense apps imported from QVF files](/img/ctrl-q-app-import-2.png "Sense apps imported from QVF files")

The Excel file with definitions on what QVF files should be imported, what the apps should be named etc looks like this:

![QVF app files that should be imported into Qlik Sense](/img/ctrl-q-app-import-1.png "QVF app files that should be imported into Qlik Sense")

The available columns in the Excel file are the same as when importing apps as part of task import.  
The columns are described on the [page describing app importing as part of task imports](http://localhost:1313/docs/command/import/task/#source-file-columns-for-app-import-definitions).

> NOTE: A sample defintions Excel file is [available in the GitHub repository](https://github.com/ptarmiganlabs/ctrl-q/blob/main/testdata/tasks.xlsx?raw=true).

If a valid app owner is specified in the Excel file it will be applied to the new app.  
Similarly, if an already existing stream name (or ID of an existing stream) is specified in the Excel file, the new app will be published to that stream.
