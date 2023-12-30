---
title: Apps
description: >
    Import apps into Qlik Sense
weight: 10
tags: [app]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Import apps from QVF files](#import-apps-from-qvf-files)

---

All example below use Windows Terminal/PowerShell.

## Import apps from QVF files

.QVF files are Sense apps stored on disk.  
Ctrl-Q's `app-import` command does bulk import of such QVF files, as well as setting tags and custom properties on the created apps.

Importing apps defined on the `App import` sheet of the `tasks.xlsx` Excel file can be done with a command like this:

```powershell
.\ctrl-q.exe app-import `
--auth-type cert `
--host 192.168.100.109 `
--auth-cert-file ./cert/client.pem `
--auth-cert-key-file ./cert/client_key.pem `
--auth-user-dir LAB `
--auth-user-id goran `
--file-name tasks.xlsx `
--sheet-name "App import"
```

```text
2023-11-19T19:30:59.811Z info: -----------------------------------------------------------
2023-11-19T19:30:59.811Z info: | Ctrl-Q
2023-11-19T19:30:59.811Z info: |
2023-11-19T19:30:59.811Z info: | Version      : 3.14.0
2023-11-19T19:30:59.811Z info: | Log level    : info
2023-11-19T19:30:59.811Z info: |
2023-11-19T19:30:59.811Z info: | Command      : app-import
2023-11-19T19:30:59.811Z info: |              : import apps/upload QVF files on disk to Sense based on definitions in Excel file.
2023-11-19T19:30:59.811Z info: |
2023-11-19T19:30:59.811Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-19T19:30:59.811Z info: |
2023-11-19T19:30:59.811Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-19T19:30:59.811Z info: ----------------------------------------------------------
2023-11-19T19:30:59.811Z info:
2023-11-19T19:30:59.825Z info: Import apps from definitions in file "tasks.xlsx"
2023-11-19T19:30:59.904Z info: Successfully retrieved 26 tags from QSEoW
2023-11-19T19:30:59.935Z info: Successfully retrieved 29 custom properties from QSEoW
2023-11-19T19:30:59.966Z info: -------------------------------------------------------------------
2023-11-19T19:30:59.966Z info: Importing apps...
2023-11-19T19:30:59.966Z info: (1) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2023-11-19T19:31:05.060Z info: (1, delete-publish) App "App 3" published to stream "Ctrl-Q demo apps", the existing app (if one exists) with the same name in this stream has been deleted. Id of published app: 733e586e-d06b-4aeb-9d1e-1a41e6cec048
2023-11-19T19:31:05.060Z info: (2) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2023-11-19T19:31:09.873Z info: (2, publish-replace) App "App 3" published to stream "Ctrl-Q demo apps", replacing the existing app with the same name. Id of published app: 733e586e-d06b-4aeb-9d1e-1a41e6cec048
2023-11-19T19:31:09.873Z info: (3) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2023-11-19T19:31:13.357Z warn: (3) PUBLISH APP publish-replace: More than one app with the same name "App 1" in the target stream "Ctrl-Q demo apps". Impossible to know which one to replace. Skipping publishing for this app. The uploaded app is still present in the QMC (id=fcf0abc2-6c03-436c-ac66-b2bfc27643ec).
2023-11-19T19:31:13.357Z error: (3) Failed publishing app "App 1" to stream "Ctrl-Q demo apps"
2023-11-19T19:31:13.357Z info: (4) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2023-11-19T19:31:16.779Z info: (4, publish-another) App "App 1" published to stream "Ctrl-Q demo apps". Id of published app: 7b2f4bea-4eb1-46e4-944f-0d2e2f5896e8
2023-11-19T19:31:16.779Z info: (5) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2023-11-19T19:31:20.185Z warn: (5) PUBLISH APP publish-replace: More than one app with the same name "App 1" in the target stream "Ctrl-Q demo apps". Impossible to know which one to replace. Skipping publishing for this app. The uploaded app is still present in the QMC (id=6d29347f-27ea-4510-a916-f88e6857e0e2).
2023-11-19T19:31:20.185Z error: (5) Failed publishing app "App 1" to stream "Ctrl-Q demo apps"
2023-11-19T19:31:20.185Z info: (6) Importing app "App 2" from file "C:/tools/ctrl-q/testdata/App import 2.qvf"
2023-11-19T19:31:23.294Z warn: Stream "Stream does not exist" does not exist.
2023-11-19T19:31:23.294Z error: (6) Failed publishing app "App 2" to stream "Stream does not exist". The uploaded app is still present in the QMC (id=960d716f-2171-489f-b63d-de9d0e494dfa).
2023-11-19T19:31:23.294Z info: (7) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2023-11-19T19:31:28.060Z info: (7, publish-replace) App "App 3" published to stream "Ctrl-Q demo apps", replacing the existing app with the same name. Id of published app: 733e586e-d06b-4aeb-9d1e-1a41e6cec048
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
