---
title: Bookmarks
description: >
    
weight: 20
tags: [bookmark]
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [List bookmarks in a Sense app](#list-bookmarks-in-a-sense-app)

---

## List bookmarks in a Sense app

```powershell
.\ctrl-q.exe bookmark-get `
--host 192.168.100.109 `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--output-format table `
--auth-user-dir LAB `
--auth-user-id goran
```

```text
2023-09-27T04:19:19.960Z info: -----------------------------------------------------------
2023-09-27T04:19:19.960Z info: | Ctrl-Q
2023-09-27T04:19:19.960Z info: |
2023-09-27T04:19:19.960Z info: | Version      : 3.13.1
2023-09-27T04:19:19.960Z info: | Log level    : info
2023-09-27T04:19:19.960Z info: |
2023-09-27T04:19:19.960Z info: | Command      : bookmark-get
2023-09-27T04:19:19.960Z info: |              : get info about one or more bookmarks
2023-09-27T04:19:19.960Z info: |
2023-09-27T04:19:19.960Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-09-27T04:19:19.960Z info: |
2023-09-27T04:19:19.960Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-09-27T04:19:19.976Z info: ----------------------------------------------------------
2023-09-27T04:19:19.976Z info:
2023-09-27T04:19:20.027Z info: Get bookmarks
2023-09-27T04:19:20.449Z info: Bookmarks
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Bookmarks (1 bookmark(s) found in the app)                                                                                                                                                                                                                                                               │
├──────────────────────────────────────┬──────────┬───────────┬─────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────┬───────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬───────────┤
│ Id                                   │ Type     │ Title     │ Description     │ Bookmark definition                                                                                  │ Approved │ Published │ Publish time             │ Created date             │ Modified date            │ Owner     │
├──────────────────────────────────────┼──────────┼───────────┼─────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┤
│ 81ec0c0d-c90c-431b-8c19-eff4048de404 │ bookmark │ Bookmark1 │ BM1 description │ {"qStateData":[{"qStateName":"$","qFieldItems":[{"qDef":{"qName":"Dim1","qType":"PRESENT"},"qSelectI │ false    │ false     │ 1753-01-01T00:00:00.000Z │ 2021-07-06T15:09:38.565Z │ 2021-07-06T15:09:38.565Z │ LAB\goran │
│                                      │          │           │                 │ nfo":{"qRangeLo":"NaN","qRangeHi":"NaN","qNumberFormat":{"qType":"U","qnDec":10,"qUseThou":0},"qRang │          │           │                          │                          │                          │           │
│                                      │          │           │                 │ eInfo":[],"qContinuousRangeInfo":[]},"qValues":[],"qExcludedValues":[]}]}],"qUtcModifyTime":44383.71 │          │           │                          │                          │                          │           │
│                                      │          │           │                 │ 498842593,"qVariableItems":[],"qPatches":[]}                                                         │          │           │                          │                          │                          │           │
└──────────────────────────────────────┴──────────┴───────────┴─────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────┴───────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴───────────┘
```
