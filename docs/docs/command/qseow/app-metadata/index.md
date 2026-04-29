---
title: App Metadata
description: >
    Extract metadata from one or more Qlik Sense apps, with optional intel files for downstream analysis in Qlik.
weight: 45
tags: [app, metadata]
---

The `qseow app-metadata-get` command extracts metadata from one or more Qlik Sense apps in a client-managed Qlik Sense environment.

For each app Ctrl-Q opens the app via the Engine API, retrieves a rich set of metadata, and writes the result to disk as JSON or QVD files.  
An optional set of "intel" QVD files can be generated alongside the metadata, ready to be loaded into a Qlik Sense app for analysis of the apps in your Sense environment.

*Page contents:*

- [Use cases](#use-cases)
- [Syntax](#syntax)
- [Selecting which apps to extract](#selecting-which-apps-to-extract)
- [Output formats and destinations](#output-formats-and-destinations)
- [Output file names](#output-file-names)
- [Intel files](#intel-files)
- [Metadata extracted from each app](#metadata-extracted-from-each-app)
- [Examples](#examples)

---

## Use cases

Common reasons to use `app-metadata-get`:

- Build a catalog of all apps in a Qlik Sense environment.
- Analyze where master items, variables, bookmarks and data connections are used across apps.
- Track changes to load scripts, sheets and data models over time.
- Feed the generated intel QVD files into a Qlik Sense app to explore your Sense environment in Sense itself.

## Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow app-metadata-get --help
Usage: ctrl-q qseow app-metadata-get [options]

Get metadata from Qlik Sense apps

Options:
  --log-level <level>                log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                      Qlik Sense server IP/FQDN
  --port <port>                      Qlik Sense server engine port (usually 4747 for cert auth, 443 for jwt auth) (default: "4747")
  --schema-version <string>          Qlik Sense engine schema version (default: "12.612.0")
  --app-id <id>                      Qlik Sense app ID. If not specified, get all apps or apps matching --app-tag.
  --app-tag <tag>                    Get apps having this tag. Can be specified multiple times.
  --open-without-data <true|false>   open app without data (choices: "true", "false", default: "true")
  --virtual-proxy <prefix>           Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>              https connection to Qlik Sense must use correct certificate. (default: true)
  --auth-user-dir <directory>        user directory for user to connect with
  --auth-user-id <userid>            user ID for user to connect with
  -a, --auth-type <type>             authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>            Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>        Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>       Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>                   JSON Web Token (JWT) to use for authentication with Qlik Sense server
  --output-format <format>           Output file format (choices: "json", "qvd", default: "json")
  --output-count <count>             Number of output files (choices: "single", "multiple", default: "multiple")
  --output-dest <dest>               where to send app metadata (choices: "screen", "file", default: "file")
  --output-detail <detail>           level of detail when sending to screen (choices: "summary", "full", "both", default: "full")
  --create-intel-file <true|false>   Create separate intel file (choices: "true", "false", default: "true")
  --output-file-name <name>          Base file name for output files (default: "app-metadata")
  --intel-file-name <name>           Base file name for intel files (default: "app-metadata-intel")
  --limit-app-count <number>         Get at most x number of apps. Only relevant when --app-id is not specified. Defaults to 0 = no limit (default: 0)
  --output-dir <dir>                 Output directory for files (default: ".")
  --sleep-between-apps <milliseconds> sleep this many milliseconds between apps. Set to 0 to disable (default: 1000)
  -h, --help                         display help for command
```

## Selecting which apps to extract

Three selection modes are supported:

| Selection | Behavior |
| --------- | -------- |
| `--app-id <id>` | Extract metadata from one or more specific apps. Repeat the option for multiple apps. |
| `--app-tag <tag>` | Extract metadata from all apps that have the specified tag. Repeat the option for multiple tags. |
| Neither specified | Extract metadata from **all** apps in the Qlik Sense environment. |

Additional safety and pacing options:

- `--limit-app-count <n>` — When `--app-id` is not specified, cap the number of apps processed. Useful when testing against large environments. Default is `0`, which means no limit.
- `--sleep-between-apps <ms>` — Pause between apps to reduce load on the Qlik Sense engine. Default is `1000` ms. Set to `0` to disable.
- `--open-without-data <true|false>` — Open each app without loading the data model into memory. Default is `true`. Setting this to `false` lets Ctrl-Q extract additional table/key information from the data model, but uses more memory on the Qlik Sense engine node.

::: tip
Start with a small `--limit-app-count` value when running against an unknown environment to verify behavior and output before processing all apps.
:::

## Output formats and destinations

| Option | Choices | Default | Description |
| ------ | ------- | ------- | ----------- |
| `--output-format` | `json`, `qvd` | `json` | File format for the metadata output. |
| `--output-count` | `single`, `multiple` | `multiple` | Whether to write one combined file or one file per app. |
| `--output-dest` | `screen`, `file` | `file` | Send output to the console or write to disk. |
| `--output-detail` | `summary`, `full`, `both` | `full` | Level of detail when `--output-dest screen` is used. |
| `--output-dir` | path | `.` | Directory where output files are written. |

When `--output-dest screen` is used, the metadata is printed to the console at the chosen detail level. `summary` shows app-level counts, `full` shows the complete extracted metadata, and `both` prints both views.

## Output file names

The base name is set with `--output-file-name` (default `app-metadata`).

- `--output-format json` + `--output-count single` → `app-metadata.json`
- `--output-format json` + `--output-count multiple` → `app-metadata_<safeAppName>.json` per app
- `--output-format qvd` + `--output-count single` → `app-metadata.qvd`

`<safeAppName>` is the app name with non-alphanumeric characters replaced by `_`.

## Intel files

When `--create-intel-file true` (the default) Ctrl-Q writes additional QVD files alongside the metadata, designed to be loaded into a Qlik Sense app for analysis of your Sense environment.

The base name is set with `--intel-file-name` (default `app-metadata-intel`). For each processed app the following QVD files are produced:

| File | Contents |
| ---- | -------- |
| `<intelFileName>_run_<safeAppName>.qvd` | Metadata about this run (timestamp, app id, app name). |
| `<intelFileName>_items_<safeAppName>.qvd` | One row per extracted item (sheet, dimension, measure, variable, bookmark, data connection, table). |
| `<intelFileName>_associations_<safeAppName>.qvd` | Relationships between items, suitable for cross-app dependency analysis. |

Items are produced by a registry of intel extractors covering: **sheet**, **dimension**, **measure**, **variable**, **bookmark**, **data connection**, and **table**.

Set `--create-intel-file false` to skip the intel QVDs and only generate the regular metadata output.

## Metadata extracted from each app

For every app, Ctrl-Q extracts:

- **Load script** — full text of the app's load script.
- **App properties** — id, name, owner, stream, last reload time, modification dates, custom properties, tags.
- **Sheets** — including basic visualization information for each sheet.
- **Stories** — story metadata.
- **Master items** — master objects, master dimensions and master measures.
- **Bookmarks**.
- **Variables** — both system and user-defined.
- **Fields** — field-level metadata from the app.
- **Data connections** referenced in the app.
- **Tables and keys** — data model tables and their associations. Available when `--open-without-data false` is used so the data model is loaded.

## Examples

### Get full metadata for one app, write to JSON

```text
.\ctrl-q.exe qseow app-metadata-get `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-type cert `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --app-id a1b2c3d4-1234-5678-9abc-deadbeef0001 `
  --output-dir ./metadata
```

This writes `metadata/app-metadata_<safeAppName>.json` and the three intel QVD files for that app.

### Print summary metadata to the screen

```text
.\ctrl-q.exe qseow app-metadata-get `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-type cert `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --app-id a1b2c3d4-1234-5678-9abc-deadbeef0001 `
  --output-dest screen `
  --output-detail summary
```

### Extract all apps with a given tag, separate JSON files

```text
.\ctrl-q.exe qseow app-metadata-get `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-type cert `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --app-tag Finance `
  --output-format json `
  --output-count multiple `
  --output-dir ./metadata-finance
```

### Extract all apps as QVD plus intel QVDs

```text
.\ctrl-q.exe qseow app-metadata-get `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-type cert `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --output-format qvd `
  --output-count multiple `
  --create-intel-file true `
  --output-dir ./metadata-all `
  --sleep-between-apps 2000
```

### Test run, limited to a few apps

```text
.\ctrl-q.exe qseow app-metadata-get `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-type cert `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --limit-app-count 5 `
  --output-dir ./metadata-test
```
