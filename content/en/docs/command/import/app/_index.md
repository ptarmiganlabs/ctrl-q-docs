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
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-cert-file ./cert/client.pem `
--auth-cert-key-file ./cert/client_key.pem `
--auth-user-dir LAB `
--auth-user-id goran `
--file-name tasks.xlsx `
--sheet-name "App import"
```

```text
2024-03-12T09:28:28.250Z info: -----------------------------------------------------------
2024-03-12T09:28:28.250Z info: | Ctrl-Q
2024-03-12T09:28:28.250Z info: |
2024-03-12T09:28:28.250Z info: | Version      : 3.16.0
2024-03-12T09:28:28.250Z info: | Log level    : info
2024-03-12T09:28:28.250Z info: |
2024-03-12T09:28:28.250Z info: | Command      : app-import
2024-03-12T09:28:28.250Z info: |              : import apps/upload QVF files on disk to Sense based on definitions in Excel file.
2024-03-12T09:28:28.250Z info: |
2024-03-12T09:28:28.250Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T09:28:28.250Z info: |
2024-03-12T09:28:28.250Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T09:28:28.250Z info: ----------------------------------------------------------
2024-03-12T09:28:28.250Z info:
2024-03-12T09:28:28.265Z info: Import apps from definitions in file "tasks.xlsx"
2024-03-12T09:28:28.406Z info: Successfully retrieved 28 tags from QSEoW
2024-03-12T09:28:28.515Z info: Successfully retrieved 31 custom properties from QSEoW
2024-03-12T09:28:28.547Z info: -------------------------------------------------------------------
2024-03-12T09:28:28.547Z info: Importing apps...
2024-03-12T09:28:28.547Z info: (1) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-03-12T09:28:33.079Z info: (1, delete-publish) App "App 3" published to stream "Ctrl-Q demo apps", the existing app (if one exists) with the same name in this stream has been deleted. Id of published app: 6668310c-19e8-416c-94b0-e32505e4de78
2024-03-12T09:28:33.079Z info: (2) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-03-12T09:28:39.055Z info: (2, publish-replace) App "App 3" published to stream "Ctrl-Q demo apps", replacing the existing app with the same name. Id of published app: 6668310c-19e8-416c-94b0-e32505e4de78
2024-03-12T09:28:39.055Z info: (3) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-03-12T09:28:43.024Z warn: (3) PUBLISH APP publish-replace: More than one app with the same name "App 1" in the target stream "Ctrl-Q demo apps". Impossible to know which one to replace. Skipping publishing for this app. The uploaded app is still present in the QMC (id=bcda9997-1a6c-42bb-b5aa-ff75fcad3f09).
2024-03-12T09:28:43.024Z error: (3) Failed publishing app "App 1" to stream "Ctrl-Q demo apps"
2024-03-12T09:28:43.024Z info: (4) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-03-12T09:28:47.243Z info: (4, publish-another) App "App 1" published to stream "Ctrl-Q demo apps". Id of published app: dda304b5-792e-4241-9bd8-b5e2e8ca21af
2024-03-12T09:28:47.243Z info: (5) Importing app "App 1" from file "C:/tools/ctrl-q/testdata/App import 1.qvf"
2024-03-12T09:28:51.117Z warn: (5) PUBLISH APP publish-replace: More than one app with the same name "App 1" in the target stream "Ctrl-Q demo apps". Impossible to know which one to replace. Skipping publishing for this app. The uploaded app is still present in the QMC (id=06d9f5d6-53a2-449c-ae7b-7033597cf88b).
2024-03-12T09:28:51.117Z error: (5) Failed publishing app "App 1" to stream "Ctrl-Q demo apps"
2024-03-12T09:28:51.117Z info: (6) Importing app "App 2" from file "C:/tools/ctrl-q/testdata/App import 2.qvf"
2024-03-12T09:28:54.610Z warn: Stream "Stream does not exist" does not exist.
2024-03-12T09:28:54.610Z error: (6) Failed publishing app "App 2" to stream "Stream does not exist". The uploaded app is still present in the QMC (id=3a7812fe-7d8c-467e-8fd0-62f4ee42a116).
2024-03-12T09:28:54.610Z info: (7) Importing app "App 3" from file "C:/tools/ctrl-q/testdata/App import 3.qvf"
2024-03-12T09:29:00.011Z info: (7, publish-replace) App "App 3" published to stream "Ctrl-Q demo apps", replacing the existing app with the same name. Id of published app: 6668310c-19e8-416c-94b0-e32505e4de78
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
