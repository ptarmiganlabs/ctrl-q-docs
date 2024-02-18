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
--host 192.168.100.109 `
--auth-user-dir LAB `
--auth-user-id goran
```

```
2023-11-20T18:00:06.727Z info: -----------------------------------------------------------
2023-11-20T18:00:06.729Z info: | Ctrl-Q
2023-11-20T18:00:06.730Z info: | 
2023-11-20T18:00:06.730Z info: | Version      : 3.14.0
2023-11-20T18:00:06.730Z info: | Log level    : info
2023-11-20T18:00:06.730Z info: | 
2023-11-20T18:00:06.730Z info: | Command      : connection-test
2023-11-20T18:00:06.731Z info: |              : test connection to Qlik Sense server.
2023-11-20T18:00:06.731Z info: | 
2023-11-20T18:00:06.731Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-20T18:00:06.731Z info: | 
2023-11-20T18:00:06.732Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-20T18:00:06.732Z info: ----------------------------------------------------------
2023-11-20T18:00:06.732Z info: 
2023-11-20T18:00:06.736Z info: Testing connection to Qlik Sense server 192.168.100.109 on port 4242
2023-11-20T18:00:06.814Z info: Successfully connected to Qlik Sense server 192.168.100.109 on port 4242
2023-11-20T18:00:06.814Z info: Qlik Sense repository build version: 31.34.0.0
2023-11-20T18:00:06.814Z info: Qlik Sense repository build date: 6/13/2023 10:08:17 AM
```
