---
title: Export
description: >
    Exporting various information from Qlik Sense.
weight: 1000
tags: [app, task, export, qvf]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Export tasks to Excel file](#export-tasks-to-excel-file)
- [Export apps to QVF files](#export-apps-to-qvf-files)
  - [Syntax](#syntax)
  - [Example](#example)

---

## Export tasks to Excel file

See this page for details on how to export task definitions to a disk file:  
[Save task to disk in tabular format](/docs/command/task/#save-task-to-disk-file-in-tabular-format)

## Export apps to QVF files

This command exports Sense apps to QVF files, with or without data.

The command optionally also creates an Excel file with metadata about each app, in the same format used by the `app-import` command.  
It is thus possible to first export apps and get a metadata Excel file, then import those QVFs into another Sense server, using the Excel file to control which apps are imported.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow app-export --help
Usage: ctrl-q qseow app-export [options]

export Qlik Sense apps to QVF files on disk.

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
  --app-id <ids...>                  use app IDs to select which apps to export
  --app-tag <tags...>                use app tags to select which apps to export
  --app-published                    export all published apps  (default: false)
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

### Example

This example will

- Export apps (including the data in them) that have either of two different tags set, plus two apps identified by app id.
- If the QVF files exist a confirmation text will be shown for each existing app.
- The name of the QVF files will be `<app name>_<exportdate>.qvf`.
- QVF files will be stored in a subdirectory `qvf-export`.
- An Excel file will be created, containing select metadata about the apps.
- The certificate files are specifically named in the command, and are stored in a subdirectory `cert`.
- Some of the apps are already present in the `qvf-export` directory, so the command will ask for confirmation before overwriting them.

```powershell
.\ctrl-q.exe qseow app-export `
  --auth-type cert `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-cert-file ./cert/client.pem `
  --auth-cert-key-file ./cert/client_key.pem `
  --auth-root-cert-file ./cert/root.pem `
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
2024-04-30T06:30:22.361Z info: -----------------------------------------------------------
2024-04-30T06:30:22.362Z info: | Ctrl-Q
2024-04-30T06:30:22.362Z info: |
2024-04-30T06:30:22.362Z info: | Version      : 3.18.0
2024-04-30T06:30:22.362Z info: | Log level    : info
2024-04-30T06:30:22.363Z info: |
2024-04-30T06:30:22.363Z info: | Command      : app-export
2024-04-30T06:30:22.363Z info: |              : export Qlik Sense apps to QVF files on disk.
2024-04-30T06:30:22.363Z info: |
2024-04-30T06:30:22.363Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-04-30T06:30:22.364Z info: |
2024-04-30T06:30:22.364Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-04-30T06:30:22.364Z info: ----------------------------------------------------------
2024-04-30T06:30:22.364Z info:
2024-04-30T06:30:22.367Z info: Export apps to directory "/Users/goran/tools/ctrl-q demo/qvf-export"
2024-04-30T06:30:22.974Z info: Number of apps to export: 8
2024-04-30T06:30:23.707Z info: ------------------------------------
2024-04-30T06:30:23.707Z info: App [eb3ab049-d007-43d3-93da-5962f9208c65] "User retention.qvf", download starting
2024-04-30T06:30:24.571Z info: ✅ App [eb3ab049-d007-43d3-93da-5962f9208c65] "User retention.qvf", download complete. Size=360448 bytes
2024-04-30T06:30:26.676Z info: ------------------------------------
2024-04-30T06:30:26.677Z info: App [2933711d-6638-41d4-a2d2-6dd2d965208b] "Ctrl-Q CLI.qvf", download starting
2024-04-30T06:30:27.448Z info: ✅ App [2933711d-6638-41d4-a2d2-6dd2d965208b] "Ctrl-Q CLI.qvf", download complete. Size=720896 bytes
2024-04-30T06:30:29.261Z info: ------------------------------------
2024-04-30T06:30:29.261Z info: App [e9d2f9b2-b598-480e-b84f-4c5d34467f6f] "Performance review_2022-03-28.qvf", download starting
2024-04-30T06:30:30.177Z info: ✅ App [e9d2f9b2-b598-480e-b84f-4c5d34467f6f] "Performance review_2022-03-28.qvf", download complete. Size=327680 bytes
2024-04-30T06:30:32.234Z info: ------------------------------------
2024-04-30T06:30:32.234Z info: App [5733046b-df34-4989-bd33-56cde5ff779d] "App 2.qvf", download starting
2024-04-30T06:30:33.066Z info: ✅ App [5733046b-df34-4989-bd33-56cde5ff779d] "App 2.qvf", download complete. Size=245760 bytes
2024-04-30T06:30:34.565Z info: ------------------------------------
2024-04-30T06:30:34.565Z info: App [deba4bcf-47e4-472e-97b2-4fe8d6498e11] "Always failing reload (no delay).qvf", download starting
2024-04-30T06:30:34.810Z info: ✅ App [deba4bcf-47e4-472e-97b2-4fe8d6498e11] "Always failing reload (no delay).qvf", download complete. Size=180224 bytes
2024-04-30T06:30:36.431Z info:
                                  Destination file "/Users/goran/tools/ctrl-q demo/qvf-export/App 2_2024-04-30.qvf" exists. Do you want to overwrite it? (y/n) y
2024-04-30T06:30:40.286Z info:
2024-04-30T06:30:40.286Z info: ------------------------------------
2024-04-30T06:30:40.286Z info: App [4e96965a-ebc9-4572-ad71-35d6cc7dbb23] "App 2.qvf", download starting
2024-04-30T06:30:41.324Z info: ✅ App [4e96965a-ebc9-4572-ad71-35d6cc7dbb23] "App 2.qvf", download complete. Size=245760 bytes
2024-04-30T06:30:42.988Z info: ------------------------------------
2024-04-30T06:30:42.988Z info: App [8272af5f-2677-459a-8d50-ee45a1c5a775] "App 1.qvf", download starting
2024-04-30T06:30:43.394Z info: ✅ App [8272af5f-2677-459a-8d50-ee45a1c5a775] "App 1.qvf", download complete. Size=245760 bytes
2024-04-30T06:30:45.138Z info:
                                  Destination file "/Users/goran/tools/ctrl-q demo/qvf-export/App 1_2024-04-30.qvf" exists. Do you want to overwrite it? (y/n) y
2024-04-30T06:30:49.529Z info:
2024-04-30T06:30:49.531Z info: ------------------------------------
2024-04-30T06:30:49.531Z info: App [6bf8f41f-31d0-40b0-9e59-95ec8839eb57] "App 1.qvf", download starting
2024-04-30T06:30:49.973Z info: ✅ App [6bf8f41f-31d0-40b0-9e59-95ec8839eb57] "App 1.qvf", download complete. Size=245760 bytes
2024-04-30T06:30:50.984Z info: ------------------------------------
2024-04-30T06:30:50.984Z info:
                                  App metadata file "/Users/goran/tools/ctrl-q demo/qvf-export/app_export.xlsx" exists. Do you want to overwrite it? (y/n) y
2024-04-30T06:30:52.867Z info:
2024-04-30T06:30:52.869Z info: ✅ Done writing app metadata file "app_export.xlsx" to disk
```

The `qvf-export` directory now contains these files:

```powershell
dir .\qvf-export\
```

```powershell

    Directory: C:\tools\ctrl-q\qvf-export


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        12/03/2024     10:26         180224 Always failing reload (no delay)_2024-03-12.qvf
-a----        12/03/2024     10:27         245760 App 1_2024-03-12.qvf
-a----        12/03/2024     10:27         245760 App 2_2024-03-12.qvf
-a----        12/03/2024     10:27          20539 app_export.xlsx
-a----        12/03/2024     10:26         720896 Ctrl-Q CLI_2024-03-12.qvf
-a----        12/03/2024     10:26         327680 Performance review_2022-03-28_2024-03-12.qvf
-a----        12/03/2024     10:26         360448 User retention_2024-03-12.qvf

```

The format of the created Excel file is almost identical to the one used when importing apps from QVF files, described [here](/docs/command/import/#source-file-columns-for-app-import-definitions).

The only difference is that the app export format includes an "App id" column, which is not required when importing apps.

App import will however work just fine if there is an "App id" column present, it just won't be used for anything.
