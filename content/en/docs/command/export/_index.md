---
title: Export
description: >
    Exporting various information from Qlik Sense
weight: 1000
tags: [app]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Export tasks to Excel file](#export-tasks-to-excel-file)
- [Export apps to QVF files](#export-apps-to-qvf-files)

---

## Export tasks to Excel file

See this page for details on how to export task definitions to a disk file:  
[Save task to disk in tabular format](/docs/command/task/#save-task-to-disk-file-in-tabular-format)

## Export apps to QVF files

This command exports Sense apps to QVF files, with or without data.

The command optionally also creates an Excel file with metadata about each app, in the same format used by the `app-import` command.  
It is thus possible to first export apps and get a metadata Excel file, then import those QVFs into another Sense server, using the Excel file to control which apps are imported.

The command options are

```powershell
.\ctrl-q.exe app-export --help
```

```text
Usage: build app-export [options]

export Qlik Sense apps to QVF files on disk.

Options:
  --log-level <level>                log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                      Qlik Sense server IP/FQDN
  --port <port>                      Qlik Sense server engine port (default: "4242")
  --schema-version <string>          Qlik Sense engine schema version (default: "12.612.0")
  --virtual-proxy <prefix>           Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>              connection to Qlik Sense engine is via https (default: true)
  --auth-user-dir <directory>        user directory for user to connect with
  --auth-user-id <userid>            user ID for user to connect with
  -a, --auth-type <type>             authentication type (choices: "cert", default: "cert")
  --auth-cert-file <file>            Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>        Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>       Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --app-id <ids...>                  use app IDs to select which apps to export
  --app-tag <tags...>                use app tags to select which apps to export
  --output-dir <directory>           relative or absolut path in which QVF files should be stored. (default: "qvf-export")
  --qvf-name-format <format...>      structure of QVF file name format (choices: "app-id", "app-name", "export-date", "export-time", default: ["app-name"])
  --qvf-name-separator <separator>   character used to separate parts of the QVF file name (choices: "-", "--", "_", "__", default: "_")
  --qvf-overwrite                    overwrite existing QVF files without asking
  --exclude-app-data <true|false>    exclude or include app data in QVF file (default: true)
  --limit-export-count <number>      export at most x number of apps. Defaults to 0 = no limit (default: 0)
  --sleep-app-export <milliseconds>  Wait this long before continuing after each app has been exported. Defaults to 1000 = 1 second (default: 1000)
  --metadata-file-create             create a separate file with information about all exported apps
  --metadata-file-name <name>        file name to store app metadata in (default: "app_export.xlsx")
  --metadata-file-format <format>    file type/format (choices: "excel", default: "excel")
  --metadata-file-overwrite          overwrite app metadata file without asking
  --dry-run                          do a dry run, i.e. do not export any apps - just show what would be done
  -h, --help                         display help for command
```

The next example will

- Export apps (including the data in them) that have either of two different tags set, plus two apps identified by app id.
- If the QVF files exist a confirmation text will be shown for each existing app.
- The name of the QVF files will be `<app name>_<exportdate>.qvf`.
- QVF files will be stored in a subdirectory `qvf-export`.
- An Excel file will be created, containing select metadata about the apps.

```powershell
.\ctrl-q.exe app-export `
--auth-type cert `
--host 192.168.100.109 `
--auth-cert-file ./cert/client.pem `
--auth-cert-key-file ./cert/client_key.pem `
--auth-user-dir LAB `
--auth-user-id goran `
--output-dir qvf-export `
--app-tag apiCreated "Ctrl-Q import" `
--app-id eb3ab049-d007-43d3-93da-5962f9208c65 2933711d-6638-41d4-a2d2-6dd2d965208b `
--exclude-app-data false `
--qvf-name-format app-name export-date `
--qvf-name-separator _ `
--metadata-file-create
```

```text
2023-09-27T05:43:33.995Z info: -----------------------------------------------------------
2023-09-27T05:43:33.995Z info: | Ctrl-Q
2023-09-27T05:43:33.995Z info: |
2023-09-27T05:43:34.010Z info: | Version      : 3.13.1
2023-09-27T05:43:34.010Z info: | Log level    : info
2023-09-27T05:43:34.010Z info: |
2023-09-27T05:43:34.010Z info: | Command      : app-export
2023-09-27T05:43:34.010Z info: |              : export Qlik Sense apps to QVF files on disk.
2023-09-27T05:43:34.010Z info: |
2023-09-27T05:43:34.010Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T05:43:34.010Z info: |
2023-09-27T05:43:34.010Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T05:43:34.010Z info: ----------------------------------------------------------
2023-09-27T05:43:34.010Z info:
2023-09-27T05:43:34.010Z info: Export apps to directory "C:/tools/ctrl-q/qvf-export"
2023-09-27T05:43:34.150Z info: Number of apps to export: 7
2023-09-27T05:43:34.713Z info: ------------------------------------
2023-09-27T05:43:34.713Z info: App [eb3ab049-d007-43d3-93da-5962f9208c65] "User retention.qvf", download starting
2023-09-27T05:43:34.838Z info: ✅ App [eb3ab049-d007-43d3-93da-5962f9208c65] "User retention.qvf", download complete. Size=360448 bytes
2023-09-27T05:43:36.433Z info: ------------------------------------
2023-09-27T05:43:36.433Z info: App [2933711d-6638-41d4-a2d2-6dd2d965208b] "Ctrl-Q CLI.qvf", download starting
2023-09-27T05:43:36.605Z info: ✅ App [2933711d-6638-41d4-a2d2-6dd2d965208b] "Ctrl-Q CLI.qvf", download complete. Size=491520 bytes
2023-09-27T05:43:38.229Z info: ------------------------------------
2023-09-27T05:43:38.229Z info: App [e9d2f9b2-b598-480e-b84f-4c5d34467f6f] "Performance review_2022-03-28.qvf", download starting
2023-09-27T05:43:38.354Z info: ✅ App [e9d2f9b2-b598-480e-b84f-4c5d34467f6f] "Performance review_2022-03-28.qvf", download complete. Size=327680 bytes
2023-09-27T05:43:39.807Z info: ------------------------------------
2023-09-27T05:43:39.807Z info: App [deba4bcf-47e4-472e-97b2-4fe8d6498e11] "Always failing reload (no delay).qvf", download starting
2023-09-27T05:43:39.901Z info: ✅ App [deba4bcf-47e4-472e-97b2-4fe8d6498e11] "Always failing reload (no delay).qvf", download complete. Size=180224 bytes
2023-09-27T05:43:41.503Z info: ------------------------------------
2023-09-27T05:43:41.503Z info: App [60bd8a51-022f-48b9-9039-c59c5078818c] "App 3.qvf", download starting
2023-09-27T05:43:41.863Z info: ✅ App [60bd8a51-022f-48b9-9039-c59c5078818c] "App 3.qvf", download complete. Size=245760 bytes
2023-09-27T05:43:43.425Z info: ------------------------------------
2023-09-27T05:43:43.425Z info: App [0b70aae4-77c5-48b1-9936-906b120986d8] "App 1.qvf", download starting
2023-09-27T05:43:43.534Z info: ✅ App [0b70aae4-77c5-48b1-9936-906b120986d8] "App 1.qvf", download complete. Size=245760 bytes
2023-09-27T05:43:45.160Z info: ------------------------------------
2023-09-27T05:43:45.160Z info: App [f4ea7586-8ab9-41a9-9fe6-6609ad10d249] "App 2.qvf", download starting
2023-09-27T05:43:45.378Z info: ✅ App [f4ea7586-8ab9-41a9-9fe6-6609ad10d249] "App 2.qvf", download complete. Size=245760 bytes
2023-09-27T05:43:46.395Z info: ------------------------------------
2023-09-27T05:43:46.410Z info: ✅ Done writing app metadata file "app_export.xlsx" to disk
```

The `qvf-export` directory now contains these files:

```powershell
dir .\qvf-export\
```

```powershell
    Directory: C:\tools\ctrl-q\qvf-export


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        27/09/2023     07:43         180224 Always failing reload (no delay)_2023-09-27.qvf
-a----        27/09/2023     07:43         245760 App 1_2023-09-27.qvf
-a----        27/09/2023     07:43         245760 App 2_2023-09-27.qvf
-a----        27/09/2023     07:43         245760 App 3_2023-09-27.qvf
-a----        27/09/2023     07:43          19682 app_export.xlsx
-a----        27/09/2023     07:43         491520 Ctrl-Q CLI_2023-09-27.qvf
-a----        27/09/2023     07:43         327680 Performance review_2022-03-28_2023-09-27.qvf
-a----        27/09/2023     07:43         360448 User retention_2023-09-27.qvf

```

The format of the created Excel file is almost identical to the one used when importing apps from QVF files, described [here](/docs/command/import/#source-file-columns-for-app-import-definitions).

The only difference is that the app export format includes an "App id" column, which is not required when importing apps.

App import will however work just fine if there is an "App id" column present, it just won't be used for anything.
