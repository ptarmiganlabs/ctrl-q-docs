---
title: Master items
description: >
    Import master items into Qlik Sense
weight: 20
tags: [master-item]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Import master items from Excel file](#import-master-items-from-excel-file)
  - [Syntax](#syntax)
  - [Example](#example)
  - [How to get correct color JSONs](#how-to-get-correct-color-jsons)

---

All example below use Windows Terminal/PowerShell.

## Import master items from Excel file

This command imports dimensions and measures defined in an Excel file into master items in a Sense app.

Both single and drill-down dimensions can be created (i.e. the same types that can be created using the Sense web UI), as well as measures.  
The same coloring options are available as in the web UI for both dimensions and measures.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow master-item-import --help
Usage: ctrl-q qseow master-item-import [options]

create master items based on definitions in a file on disk

Options:
  --log-level <level>                                          log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                                                Qlik Sense server IP/FQDN
  --port <port>                                                Qlik Sense server engine port (usually 4747 for cert auth, 443 for jwt auth) (default: "4747")
  --schema-version <string>                                    Qlik Sense engine schema version (default: "12.612.0")
  --app-id <id>                                                Qlik Sense app ID
  --virtual-proxy <prefix>                                     Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>                                        https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>                                  user directory for user to connect with
  --auth-user-id <userid>                                      user ID for user to connect with
  -a, --auth-type <type>                                       authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>                                      Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>                                  Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>                                 Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>                                             JSON Web Token (JWT) to use for authentication with Qlik Sense server
  -t, --file-type <type>                                       source file type (choices: "excel", default: "excel")
  --file <filename>                                            file containing master item definitions
  --sheet <name>                                               name of Excel sheet where dim/measure flag column is found
  --col-ref-by <reftype>                                       how to refer to columns in the source file. Options are by name or by position (zero based) (choices: "name", "position", default: "name")
  --col-item-type <column position or name>                    column where dim/measure flag is found. Use "dim-single" in that column to create dimension, "dim-drilldown" for drill-down dimension, "measure" for
                                                               measure (default: "Master item type")
  --col-master-item-name <column position or name>             column number (zero based) or name to use as master item name (default: "Master item name")
  --col-master-item-descr <column position or name>            column number (zero based) or name to use as master item description (default: "Description")
  --col-master-item-label <column position or name>            column number (zero based) or name to use as master item label (default: "Label")
  --col-master-item-expr <column position or name>             column number (zero based) or name to use as master item expression (default: "Expression")
  --col-master-item-tag <column position or name>              column number (zero based) or name to use as master item tags (default: "Tag")
  --col-master-item-color <column position or name>            column number (zero based) or name to use as color for dimensions/measures (default: "Color")
  --col-master-item-per-value-color <column position or name>  column number (zero based) or name to use as per-value/segment color for dimensions/measures (default: "Per value color")
  --sleep-between-imports <milliseconds>                       sleep this many milliseconds between imports. Set to 0 to disable (default: 1000)
  --limit-import-count <number>                                import at most x number of master items from the Excel file. Defaults to 0 = no limit (default: 0)
  --dry-run                                                    do a dry run, i.e. do not create or update anything - just show what would be done
  -h, --help                                                   display help for command
```

There are several options that allow for a great deal of flexibility.  
For example, the `--col-ref-by` option determines whether the `--col-master-item-...` options refer to columns by position or name.
Column names will in most cases be easier to read and understand, but sometimes a zero-based column position might be preferred.

Similarly those `--col-master-item-...` options let you use your own column names in the source file.

By adding the `--help` option when running Ctrl-Q you get a list of all available options for the `master-item-import` command.  
`--help` can be added to any Ctrl-Q command, even if there are already other options on the command line.

Some other options that might be useful:

- `--dry-run`- Don't actually create or update any master items, just show what would have been done.
- `--limit-import-count` - Only import the first N master items from the file. Useful for testing.
- `--sleep-between-imports` - Pause for N milliseconds between each imported master item. Useful for decreasing the load on the Sense server.

Notes on using the `master-item-import` command:

- Master items are referred to by name. This means that if a master item in the source file already exists in the target Sense app, the app's master item will be updated.
- If a master item *does not* exist in the target app the master item will be created.
- If a master item *does*_* exist in the target app its content will be overwritten with the info in the source Excel file.
- The structure of the Excel file is fairly flexible, but some restrictions apply:
  - The columns can be named anything. Use the `--col-item-type` and `--col-master-item-...` columns to tell Ctrl-Q which columns contains what data.
  - The first row in the Excel sheet must contain column headers if columns are referenced by name.
- Master item names, descriptions and labels can contain *almost* any characters and there are some restrictions on the length of these strings.

  - See the [Qlik Sense help](https://help.qlik.com/en-US/sense/May2023/Subsystems/Hub/Content/Sense_Hub/Introduction/guidelines-visualizations-fields-naming.htm) for details.
  - If a master item name or description is too long a warning will be shown and the text will be truncated to the max length allowed by Sense (see the link above).
  - If a master item has more than 30 tags a warning will be shown and only the first 30 tags will be used.
  - If a master item tag is longer than 31 characters a warning will be shown and the tag will be truncated to 31 characters.
  - If a master item expression is too long an error will be shown and Ctrl-Q will exit.
    Notes on the example below:

- The (intentional) warning for the incorrectly spelled master item type "measur" (which should have been "measure", of course).

### Example

Now let's run the command.

```powershell
.\ctrl-q.exe qseow master-item-import `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --auth-type cert `
  --app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
  --file-type excel `
  --file ./ctrl-q-master-items.xlsx `
  --sheet Sales `
  --col-ref-by name `
  --col-item-type "Master item type" `
  --col-master-item-name "Master Item Name" `
  --col-master-item-descr Description `
  --col-master-item-label Label `
  --col-master-item-expr Expression `
  --col-master-item-tag Tag `
  --col-master-item-color Color `
  --col-master-item-per-value-color 'Per value color'
```

```text
2024-11-19T07:07:31.858Z info: -----------------------------------------------------------
2024-11-19T07:07:31.873Z info: | Ctrl-Q
2024-11-19T07:07:31.873Z info: |
2024-11-19T07:07:31.873Z info: | Version      : 4.1.0
2024-11-19T07:07:31.873Z info: | Log level    : info
2024-11-19T07:07:31.873Z info: |
2024-11-19T07:07:31.873Z info: | Command      : master-item-import
2024-11-19T07:07:31.873Z info: |              : create master items based on definitions in a file on disk
2024-11-19T07:07:31.873Z info: |
2024-11-19T07:07:31.873Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T07:07:31.873Z info: |
2024-11-19T07:07:31.873Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T07:07:31.873Z info: ----------------------------------------------------------
2024-11-19T07:07:31.873Z info:
2024-11-19T07:07:31.873Z info: Import master items from definitions in Excel file "./ctrl-q-master-items.xlsx"
2024-11-19T07:07:32.936Z info: (1/12) Updated existing measure "No. of sold units"
2024-11-19T07:07:33.983Z info: (2/12) Updated existing measure "No. of sold units (LY)"
2024-11-19T07:07:34.998Z info: (3/12) Updated existing measure "Revenue EUR"
2024-11-19T07:07:36.024Z info: (4/12) Updated existing measure "Revenue EUR (LY)"
2024-11-19T07:07:37.040Z info: (5/12) Updated existing measure "Profit EUR"
2024-11-19T07:07:38.068Z warn: (6/12) Found an unknown master item type: "measur". Ignoring this line in the imported file.
2024-11-19T07:07:39.083Z info: (7/12) Updated existing measure "Profit EUR (LY)"
2024-11-19T07:07:40.114Z info: (8/12) Updated existing dimension "Country"
2024-11-19T07:07:41.162Z info: (9/12) Updated existing dimension "Sales month"
2024-11-19T07:07:42.239Z info: (10/12) Updated existing dimension "Salesperson"
2024-11-19T07:07:43.271Z info: (11/12) Updated existing dimension "Color"
2024-11-19T07:07:44.318Z info: (12/12) Updated existing drill-down dimension "DimDrill"
2024-11-19T07:07:45.334Z info: Imported 12 master items from Excel file ./ctrl-q-master-items.xlsx
```

> NOTE: A sample defintions Excel file is [available in the GitHub repository](https://github.com/ptarmiganlabs/ctrl-q/blob/main/testdata/ctrl-q-master-items.xlsx?raw=true). That file contains examples of most combinations of master item types and properties.

### How to get correct color JSONs

If colors are to be associated with master items, the colors must be specified in JSON format, in the correct columns in the Excel file.

The easiest way to get the correct JSONs is to create a master item in the Sense web UI, set the master item's color, and then use Ctrl-Q's `master-item-dim-get` and `master-item-measure-get` commands to view the master item(s), either as a table or as JSON.  
This will show you what the structure of the JSON looks like, or even provide you with the correct JSON if you entered the desired color info in the Sense web UI.

Different master item types have different coloring options:

- Drill-down dimensions
  - A general dimension color set in the Excel file's column specified by the `--col-master-item-color` option.
- Single dimensions
  - A general dimension color set in the Excel file's column specified by the `--col-master-item-color` option.
  - A per-value color that can be used to assign different colors to different values of the dimension. Set in the Excel file's column specified by the `--col-master-item-per-value-color` option.
- Measures
  - A general measure color set in the Excel file's column specified by the `--col-master-item-color` option.
  - Segment colors that can be used to assign colors to value ranges of the measure. Set in the Excel file's column specified by the `--col-master-item-per-value-color` option.

Let's look at some examples.

Here we want to get the JSON for the color of the master dimension "Country".

```text
.\ctrl-q.exe qseow master-item-dim-get `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
  --output-format table
```

The result will be a rather wide table, where the column named `Coloring` contains the color JSONs.  
The color data for the "Country" dimension looks like this:

```text
Dimension color:
{"color":"#bbbbbb","index":-1}

Value colors:
{"colors":[{"value":"Afghanistan","baseColor":{"color":"#8a85c6","index":-1}},{"value":"Albania","ba
seColor":{"color":"#aaaaaa","index":-1}},{"value":"Algeria","baseColor":{"color":"#a16090","index":9
}}],"nul":{"color":"#c8c7a9","index":16},"oth":{"color":"#ffec6e","index":-1},"pal":null,"single":nu
ll,"usePal":true,"autoFill":true}
```

Let's format those as proper JSONs to make them more readable.  
These JSONs are what would go into the Excel file's `Color` and `Per-value color` columns.

> NOTE 1: If unsure about what data to put in some field, just use the ones returned by the `master-item-dim-get` command.  
> NOTE 2: The same concept works for drill-down dimensions and measures.

```json
{
  "color": "#bbbbbb",
  "index": -1
}
```

```json
{
  "colors": [
    {
      "value": "Afghanistan",
      "baseColor": {
        "color": "#8a85c6",
        "index": -1
      }
    },
    {
      "value": "Albania",
      "baseColor":{
        "color":"#aaaaaa",
        "index":-1}
      },
      {
        "value":"Algeria",
        "baseColor":{
          "color":"#a16090",
          "index":9
        }
      }
  ],
  "nul": {
    "color": "#c8c7a9",
    "index": 16
  },
  "oth": {
    "color": "#ffec6e",
    "index": -1
  },
  "pal": null,
  "single":nu
  ll,
  "usePal": true,
  "autoFill": true
}
```
