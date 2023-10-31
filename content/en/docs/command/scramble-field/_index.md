---
title: Scramble fields
description: >
    Scramble fields in Sense apps.
weight: 60
tags: []
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Scramble fields in Sense app](#scramble-fields-in-sense-app)

---

## Scramble fields in Sense app

Scramble one or more fields in an app using Qlik Sense's internal scrambling feature.

Note:

- If more than one field is to be scrambled, the indidivudal field names should be separated by the character or string specified in the `--separator` option.
- The entire list of field names (the `--fieldname` option) should be surrounded by double quotes.
- A new app with the scrambled data will be created. Specify its name in the `--newappname` option.

```powershell
.\ctrl-q.exe field-scramble `
--host 192.168.100.109 `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--auth-user-dir LAB `
--auth-user-id goran `
--field-name Expression1 Dim1 AsciiAlpha `
--new-app-name __ScrambledTest1
```

```text
2023-09-27T16:07:40.330Z info: -----------------------------------------------------------
2023-09-27T16:07:40.330Z info: | Ctrl-Q
2023-09-27T16:07:40.330Z info: |
2023-09-27T16:07:40.330Z info: | Version      : 3.13.1
2023-09-27T16:07:40.330Z info: | Log level    : info
2023-09-27T16:07:40.330Z info: |
2023-09-27T16:07:40.330Z info: | Command      : field-scramble
2023-09-27T16:07:40.330Z info: |              : scramble one or more fields in an app. A new app with the scrambled data is created.
2023-09-27T16:07:40.330Z info: |
2023-09-27T16:07:40.345Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T16:07:40.345Z info: |
2023-09-27T16:07:40.345Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T16:07:40.345Z info: ----------------------------------------------------------
2023-09-27T16:07:40.345Z info:
2023-09-27T16:07:40.345Z info: Scramble field
2023-09-27T16:07:41.236Z info: Scrambled field "Expression1"
2023-09-27T16:07:41.251Z info: Scrambled field "Dim1"
2023-09-27T16:07:41.251Z info: Scrambled field "AsciiAlpha"
2023-09-27T16:07:42.033Z info: Scrambled data written to new app "__ScrambledTest1" with app ID: 892d9ef2-b553-4537-adac-fb9ede3e1813
```
