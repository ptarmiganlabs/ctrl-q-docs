---
title: Connection test
description: >
    Command to test connection to client-mnaged Qlik Sense server.
weight: 30
tags: 
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Test connection to Qlik Sense server](#test-connection-to-qlik-sense-server)
  - [Syntax](#syntax)
  - [Example](#example)

---

## Test connection to Qlik Sense server

Some of the Ctrl-Q commands are rather complex and it can be difficult to figure out what is wrong if the command fails.

To rule out any connection issues between the machine running Ctrl-Q and the Qlik Sense server it is possible to run the `connection-test` command.

Here you learn how that command is executed using certificate authentication, using the default certificates, port (for connecting to QRS using certificates) and virtual proxy.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow connection-test --help
Usage: ctrl-q qseow connection-test [options]

test connection to Qlik Sense server.

Options:
  --log-level <level>           log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                 Qlik Sense server IP/FQDN
  --port <port>                 Qlik Sense proxy service port (default: "4242")
  --schema-version <string>     Qlik Sense engine schema version (default: "12.612.0")
  --virtual-proxy <prefix>      Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>         https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>   user directory for user to connect with
  --auth-user-id <userid>       user ID for user to connect with
  -a, --auth-type <type>        authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>       Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>   Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>  Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>              JSON Web Token (JWT) to use for authentication with Qlik Sense server
  -h, --help                    display help for command
```

### Example

```text
.\ctrl-q.exe qseow connection-test `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-user-dir LAB `
  --auth-user-id goran
```

```text
2024-11-15T14:34:03.752Z info: -----------------------------------------------------------
2024-11-15T14:34:03.757Z info: | Ctrl-Q
2024-11-15T14:34:03.757Z info: |
2024-11-15T14:34:03.757Z info: | Version      : 4.0.0
2024-11-15T14:34:03.757Z info: | Log level    : info
2024-11-15T14:34:03.758Z info: |
2024-11-15T14:34:03.758Z info: | Command      : connection-test
2024-11-15T14:34:03.759Z info: |              : test connection to Qlik Sense server.
2024-11-15T14:34:03.759Z info: |
2024-11-15T14:34:03.759Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T14:34:03.760Z info: |
2024-11-15T14:34:03.760Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T14:34:03.760Z info: ----------------------------------------------------------
2024-11-15T14:34:03.760Z info:
2024-11-15T14:34:03.763Z info: Testing connection to Qlik Sense server pro2-win1.lab.ptarmiganlabs.net on port 4242
2024-11-15T14:34:04.187Z info: Successfully connected to Qlik Sense server pro2-win1.lab.ptarmiganlabs.net on port 4242
2024-11-15T14:34:04.187Z info: Qlik Sense repository build version: 31.43.0.0
2024-11-15T14:34:04.188Z info: Qlik Sense repository build date: 4/12/2024 18:12:20 PM
```
