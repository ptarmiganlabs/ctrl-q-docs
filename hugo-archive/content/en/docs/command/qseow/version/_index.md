---
title: Version
description: >
    Shows current Ctrl-Q version
weight: 1300
tags: [version]
---

*Page contents:*

- [Syntax](#syntax)
- [Example](#example)

---

## Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow version --help
Usage: ctrl-q qseow version [options]

show version info

Options:
  --log-level <level>  log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  -h, --help           display help for command
```

## Example

```text
.\ctrl-q.exe qseow version
```

```text
2024-11-19T07:21:16.194Z info: -----------------------------------------------------------
2024-11-19T07:21:16.194Z info: | Ctrl-Q
2024-11-19T07:21:16.194Z info: |
2024-11-19T07:21:16.194Z info: | Version      : 4.1.0
2024-11-19T07:21:16.194Z info: | Log level    : info
2024-11-19T07:21:16.194Z info: |
2024-11-19T07:21:16.194Z info: | Command      : version
2024-11-19T07:21:16.194Z info: |              : show version info
2024-11-19T07:21:16.194Z info: |
2024-11-19T07:21:16.194Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T07:21:16.194Z info: |
2024-11-19T07:21:16.194Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T07:21:16.194Z info: ----------------------------------------------------------
2024-11-19T07:21:16.194Z info:
2024-11-19T07:21:16.194Z info: Version: 4.1.0
```
