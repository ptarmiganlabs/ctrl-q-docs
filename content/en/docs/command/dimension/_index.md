---
title: Dimensions
description: >
    In-app master dimension.
weight: 40
tags: [master-item]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [List master item dimensions in a Sense app](#list-master-item-dimensions-in-a-sense-app)
- [Delete master item dimensions in a Sense app](#delete-master-item-dimensions-in-a-sense-app)

---

## List master item dimensions in a Sense app

```powershell
.\ctrl-q.exe master-item-dim-get `
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-user-dir LAB `
--auth-user-id goran `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--output-format table
```

```text
2024-03-12T08:36:53.124Z info: -----------------------------------------------------------
2024-03-12T08:36:53.140Z info: | Ctrl-Q
2024-03-12T08:36:53.140Z info: |
2024-03-12T08:36:53.140Z info: | Version      : 3.16.0
2024-03-12T08:36:53.140Z info: | Log level    : info
2024-03-12T08:36:53.140Z info: |
2024-03-12T08:36:53.140Z info: | Command      : master-item-dim-get
2024-03-12T08:36:53.140Z info: |              : get info about one or more master dimensions
2024-03-12T08:36:53.140Z info: |
2024-03-12T08:36:53.140Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T08:36:53.140Z info: |
2024-03-12T08:36:53.140Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T08:36:53.140Z info: ----------------------------------------------------------
2024-03-12T08:36:53.140Z info:
2024-03-12T08:36:53.140Z info: Get master dimensions
2024-03-12T08:36:53.687Z info:
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Dimensions (6 dimension(s) found in the app)                                                                                                                                                                                                                                                                                                                                                                                                                            │
├──────────────────────────────────────┬───────────┬─────────────────┬────────────────────────────────┬───────────────────────────────┬────────────────────────┬──────────────────┬──────────────────┬─────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────┬──────────┬───────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬───────────┬────────────────┤
│ Id                                   │ Type      │ Title           │ Description (static)           │ Description (from expression) │ Description expression │ Label expression │ Definition count │ Definition  │ Coloring                                                                                             │ Grouping │ Approved │ Published │ Publish time             │ Created date             │ Modified date            │ Owner     │ Tags           │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ JDWuPK                               │ dimension │ Dimension 2-3-1 │ Description for 2-3-1          │                               │                        │                  │ 3                │ Dim2        │ Dimension color:                                                                                     │ H        │ false    │ false     │ 1753-01-01T00:00:00.000Z │ 2021-06-07T02:31:02.093Z │ 2021-06-07T02:31:02.093Z │ LAB\goran │ My awesome tag │
│                                      │           │                 │                                │                               │                        │                  │                  │ Dim3        │ {"color":"#ffffff","index":1}                                                                        │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │ Dim1        │                                                                                                      │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │                          │           │                │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ cb922a28-ff2d-4d97-a9fd-5d99eae2a490 │ dimension │ Color           │ Color of sold unit             │                               │                        │ ='Unit color'    │ 1                │ UnitColor   │                                                                                                      │ N        │ false    │ false     │ 1753-01-01T00:00:00.000Z │ 2023-05-09T15:11:34.957Z │ 2023-06-05T18:39:33.522Z │ LAB\goran │ Sales, Color   │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ 3047e493-f24f-4d31-a0fb-6b797874b049 │ dimension │ Salesperson     │ The person who sold the unit.  │                               │                        │ ='Salesperson'   │ 1                │ Salesperson │ Value colors:                                                                                        │ N        │ false    │ false     │ 1753-01-01T00:00:00.000Z │ 2023-03-08T16:45:26.610Z │ 2023-06-05T18:39:32.990Z │ LAB\goran │ Staff, Sales   │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ {"colors":[{"value":"Afghanistan","baseColor":{"color":"#8a85c6","index":-1}},{"value":"Albania","ba │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ seColor":{"color":"#aaaaaa","index":-1}},{"value":"Algeria","baseColor":{"color":"#a16090","index":9 │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ }}],"nul":{"color":"#c8c7a9","index":16},"oth":{"color":"#ffec6e","index":-1},"pal":null,"single":nu │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ ll,"usePal":true,"autoFill":true}                                                                    │          │          │           │                          │                          │                          │           │                │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ 6f375071-5603-401c-815a-9bd59e02623b │ dimension │ DimDrill        │ Drill-down 1                   │                               │                        │                  │ 3                │ Dim1        │ Dimension color:                                                                                     │ H        │ false    │ false     │ 1753-01-01T00:00:00.000Z │ 2023-06-05T18:39:33.522Z │ 2023-11-19T19:32:56.466Z │ LAB\goran │ Staff, Color   │
│                                      │           │                 │                                │                               │                        │                  │                  │  Dim2       │ {"color":"#bbbbbb","index":-1}                                                                       │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │  Dim3       │                                                                                                      │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │                          │           │                │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ 295cd9f4-3703-49e6-b2e8-68347d6975b3 │ dimension │ Sales month     │ Date in which a unit was sold. │                               │                        │ ='Sales month'   │ 1                │ Month_Sales │ Dimension color:                                                                                     │ N        │ false    │ false     │ 1753-01-01T00:00:00.000Z │ 2023-11-19T19:32:53.930Z │ 2023-11-19T19:32:53.930Z │ LAB\goran │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ {"color":"#bbbbbb","index":-1}                                                                       │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │                          │           │                │
├──────────────────────────────────────┼───────────┼─────────────────┼────────────────────────────────┼───────────────────────────────┼────────────────────────┼──────────────────┼──────────────────┼─────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┼──────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────┼────────────────┤
│ 473bdb09-33ee-452f-802b-e1da00241e25 │ dimension │ Country         │ Country where a unit was sold. │                               │                        │ ='Country sold'  │ 1                │ Country     │ Dimension color:                                                                                     │ N        │ false    │ false     │ 1753-01-01T00:00:00.000Z │ 2023-11-19T19:32:53.930Z │ 2023-11-19T19:32:53.930Z │ LAB\goran │ Geo, DimCat1   │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ {"color":"#bbbbbb","index":-1}                                                                       │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │                                                                                                      │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ Value colors:                                                                                        │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ {"colors":[{"value":"Afghanistan","baseColor":{"color":"#8a85c6","index":-1}},{"value":"Albania","ba │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ seColor":{"color":"#aaaaaa","index":-1}},{"value":"Algeria","baseColor":{"color":"#a16090","index":9 │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ }}],"nul":{"color":"#c8c7a9","index":16},"oth":{"color":"#ffec6e","index":-1},"pal":null,"single":nu │          │          │           │                          │                          │                          │           │                │
│                                      │           │                 │                                │                               │                        │                  │                  │             │ ll,"usePal":true,"autoFill":true}                                                                    │          │          │           │                          │                          │                          │           │                │
└──────────────────────────────────────┴───────────┴─────────────────┴────────────────────────────────┴───────────────────────────────┴────────────────────────┴──────────────────┴──────────────────┴─────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────┴──────────┴───────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴───────────┴────────────────┘
```

## Delete master item dimensions in a Sense app

```powershell
.\ctrl-q.exe master-item-dim-delete `
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-user-dir LAB `
--auth-user-id goran `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--id-type name `
--master-item 'Country' 'Sales month'
```

```text
2024-03-12T08:37:39.057Z info: -----------------------------------------------------------
2024-03-12T08:37:39.057Z info: | Ctrl-Q
2024-03-12T08:37:39.057Z info: |
2024-03-12T08:37:39.057Z info: | Version      : 3.16.0
2024-03-12T08:37:39.057Z info: | Log level    : info
2024-03-12T08:37:39.057Z info: |
2024-03-12T08:37:39.057Z info: | Command      : master-item-dim-delete
2024-03-12T08:37:39.057Z info: |              : delete master dimension(s)
2024-03-12T08:37:39.057Z info: |
2024-03-12T08:37:39.057Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T08:37:39.057Z info: |
2024-03-12T08:37:39.057Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T08:37:39.057Z info: ----------------------------------------------------------
2024-03-12T08:37:39.057Z info:
2024-03-12T08:37:39.057Z info: Delete master dimensions
2024-03-12T08:37:39.542Z info: (1/2) Deleted master item dimension "Country", id=d404a273-01d4-4ca4-975e-2dea2cce89ee in app "a3e0f5d2-000a-464f-998d-33d333b175d7"
2024-03-12T08:37:39.542Z info: (2/2) Deleted master item dimension "Sales month", id=0e85b6af-1ddb-4c2d-bd2e-b0e80464e8cf in app "a3e0f5d2-000a-464f-998d-33d333b175d7"
```
