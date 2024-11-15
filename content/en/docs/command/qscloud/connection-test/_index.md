---
title: Connection test
description: >
    Command to test connection to Qlik Sense Cloud.
weight: 10
tags: 
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Test connection to Qlik Sense Cloud](#test-connection-to-qlik-sense-cloud)
  - [Syntax](#syntax)
  - [Example](#example)

---

## Test connection to Qlik Sense Cloud

Some of the Ctrl-Q commands are rather complex and it can be difficult to figure out what is wrong if the command fails.

To rule out any connection issues between the machine running Ctrl-Q and Qlik Sense Cloud it is possible to run the `connection-test` command.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qscloud connection-test --help
Usage: ctrl-q qscloud connection-test [options]

test connection to Qlik Sense Cloud.

Options:
  --log-level <level>     log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --tenant-host <host>    Host of Qlik Sense cloud tenant. Example: "tenant.eu.qlikcloud.com"
  -a, --auth-type <type>  authentication type (choices: "apikey", default: "apikey")
  --apikey <key>          API key used to access the Sense APIs
  -h, --help              display help for command
```

### Example

```text
.\ctrl-q.exe qscloud connection-test `
  --tenant-host mytenant.eu.qlikcloud.com `
  --apikey "eyJhb..."
```

```text
2024-11-15T17:37:26.948Z info: -----------------------------------------------------------
2024-11-15T17:37:26.952Z info: | Ctrl-Q
2024-11-15T17:37:26.952Z info: |
2024-11-15T17:37:26.952Z info: | Version      : 4.0.0
2024-11-15T17:37:26.952Z info: | Log level    : info
2024-11-15T17:37:26.953Z info: |
2024-11-15T17:37:26.953Z info: | Command      : connection-test
2024-11-15T17:37:26.953Z info: |              : test connection to Qlik Sense Cloud.
2024-11-15T17:37:26.953Z info: |
2024-11-15T17:37:26.954Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T17:37:26.954Z info: |
2024-11-15T17:37:26.954Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T17:37:26.954Z info: ----------------------------------------------------------
2024-11-15T17:37:26.954Z info:
2024-11-15T17:37:26.955Z info: Testing connection to Qlik Sense Cloud tenant "mytenant.eu.qlikcloud.com"
2024-11-15T17:37:27.826Z info: Successfully connected to Qlik Sense Cloud tenant "mytenant.eu.qlikcloud.com"
2024-11-15T17:37:27.826Z info: Tenant ID  : df.....
2024-11-15T17:37:27.828Z info: User ID    : 76456....
2024-11-15T17:37:27.828Z info: User name  : Göran Sander
2024-11-15T17:37:27.828Z info: User email : goran@ptarmiganlabs.com
2024-11-15T17:37:27.828Z info: User status: active
```
