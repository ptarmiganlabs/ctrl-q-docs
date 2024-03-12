---
title: Connection test
description: >
    Command to test connection to Qlik Sense server.
weight: 30
tags: 
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Test connection to Qlik Sense server](#test-connection-to-qlik-sense-server)

---

## Test connection to Qlik Sense server

Some of the Ctrl-Q commands are rather complex and it can be difficult to figure out what is wrong if the command fails.

To rule out any connection issues between the machine running Ctrl-Q and the Qlik Sense server it is possible to run the `connection-test` command.

Here that command is executed using certificate authentication, using the default certificates, port (for connecting to QRS using certificates) and virtual proxy.

```powershell
.\ctrl-q.exe connection-test `
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-user-dir LAB `
--auth-user-id goran
```

```
2024-03-12T08:35:45.058Z info: -----------------------------------------------------------
2024-03-12T08:35:45.058Z info: | Ctrl-Q
2024-03-12T08:35:45.058Z info: |
2024-03-12T08:35:45.058Z info: | Version      : 3.16.0
2024-03-12T08:35:45.058Z info: | Log level    : info
2024-03-12T08:35:45.058Z info: |
2024-03-12T08:35:45.058Z info: | Command      : connection-test
2024-03-12T08:35:45.058Z info: |              : test connection to Qlik Sense server.
2024-03-12T08:35:45.058Z info: |
2024-03-12T08:35:45.058Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T08:35:45.058Z info: |
2024-03-12T08:35:45.058Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T08:35:45.058Z info: ----------------------------------------------------------
2024-03-12T08:35:45.058Z info:
2024-03-12T08:35:45.058Z info: Testing connection to Qlik Sense server pro2-win1.lab.ptarmiganlabs.net on port 4242
2024-03-12T08:35:45.198Z info: Successfully connected to Qlik Sense server pro2-win1.lab.ptarmiganlabs.net on port 4242
2024-03-12T08:35:45.198Z info: Qlik Sense repository build version: 31.36.2.0
2024-03-12T08:35:45.198Z info: Qlik Sense repository build date: 1/11/2024 22:04:12 PM
```
