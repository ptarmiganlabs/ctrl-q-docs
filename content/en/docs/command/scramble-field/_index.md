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
--host pro2-win1.lab.ptarmiganlabs.net `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--auth-user-dir LAB `
--auth-user-id goran `
--field-name Expression1 Dim1 AsciiAlpha `
--new-app-name __ScrambledTest1
```

```text
2024-03-12T08:39:17.987Z info: -----------------------------------------------------------
2024-03-12T08:39:18.004Z info: | Ctrl-Q
2024-03-12T08:39:18.004Z info: |
2024-03-12T08:39:18.004Z info: | Version      : 3.16.0
2024-03-12T08:39:18.004Z info: | Log level    : info
2024-03-12T08:39:18.004Z info: |
2024-03-12T08:39:18.004Z info: | Command      : field-scramble
2024-03-12T08:39:18.004Z info: |              : scramble one or more fields in an app. A new app with the scrambled data is created.
2024-03-12T08:39:18.004Z info: |
2024-03-12T08:39:18.004Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T08:39:18.004Z info: |
2024-03-12T08:39:18.004Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T08:39:18.004Z info: ----------------------------------------------------------
2024-03-12T08:39:18.004Z info:
2024-03-12T08:39:18.004Z info: Scramble field
2024-03-12T08:39:18.502Z info: Scrambled field "Expression1"
2024-03-12T08:39:18.502Z info: Scrambled field "Dim1"
2024-03-12T08:39:18.518Z info: Scrambled field "AsciiAlpha"
2024-03-12T08:39:19.127Z info: Scrambled data written to new app "__ScrambledTest1" with app ID: 65091695-a23c-432e-a430-b2ff4e367ea2
```
