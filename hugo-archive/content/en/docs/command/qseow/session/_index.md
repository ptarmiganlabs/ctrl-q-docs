---
title: Sessions
description: >
    Manage Qlik Sense proxy sessions.
weight: 65
tags: []
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

Each time a user connects to a client-managed Qlik Sense server a proxy session is created.  
In busy environments with many users the number of proxy sessions can thus grow to a large number.

Knowing which users are connected to the system can be useful for system administrators.  
For example, when a server is to be restarted, it's good to know if there are any active users connected to the system - and if so, who they are.

- The `session-get` command lists active proxy sessions for parts of, or the entire, Sense environment.
- The `session-delete` command can be used to delete a single or many proxy sessions.

Note: Given how Sense's proxy API works it is only possible to authenthicate using certificates.  
I.e. JWT authentication is not supported.

---

*Page contents:*

- [List proxy sessions](#list-proxy-sessions)
  - [Syntax](#syntax)
  - [Example 1](#example-1)
  - [Add some sessions](#add-some-sessions)
- [Delete proxy sessions](#delete-proxy-sessions)
  - [Syntax](#syntax-1)
  - [Example: Delete specific sessions](#example-delete-specific-sessions)
  - [Example: Delete all sessions connected to a virtual proxy](#example-delete-all-sessions-connected-to-a-virtual-proxy)

---

## List proxy sessions

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow session-get --help
Usage: ctrl-q qseow session-get [options]                                                                                                                                                                            
get info about proxy sessions on one or more virtual proxies
                                                                                                                                                                                                                     Options:
  --log-level <level>                  log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                        Qlik Sense host (IP/FQDN) where Qlik Repository Service (QRS) is running
  --qrs-port <port>                    Qlik Sense repository service (QRS) port (usually 4242) (default: "4242")
  --virtual-proxy <prefix>             Qlik Sense virtual proxy prefix to access QRS via (default: "")
  --secure <true|false>                https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --session-virtual-proxy <prefix...>  one or more Qlik Sense virtual proxies to get sessions for
  --host-proxy <host...>               Qlik Sense hosts/proxies (IP/FQDN) to get sessions from. Must match the host names of the Sense nodes
  --qps-port <port>                    Qlik Sense proxy service (QPS) port (usually 4243) (default: "4243")
  --auth-user-dir <directory>          user directory for user to connect with
  --auth-user-id <userid>              user ID for user to connect with
  -a, --auth-type <type>               authentication type (choices: "cert", default: "cert")
  --auth-cert-file <file>              Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>          Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>         Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --output-format <json|table>         output format (default: "json")
  -s, --sort-by <column>               column to sort output table by (choices: "prefix", "proxyhost", "proxyname", "userdir", "userid", "username", default: "prefix")
  -h, --help                           display help for command
```

### Example 1

Let's first take a look at what proxy sessions are active in a Qlik Sense environment.

```text
.\ctrl-q.exe qseow session-get `
  --auth-type cert `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-user-dir LAB `
  --auth-user-id goran `
  --output-format table
```

The command gives us several pieces of information:

- Information about all proxies in the Qlik Sense environment, including how many virtual proxies are linked to each one.
- Warnings about some virtual proxies not having *any* linked proxy services. This is not an error per se, but the virtual proxies will not function given this configuration.
- Detailed information about all active sessions.

In this example there is a single session active, for user `goran` in the `LAB` user directory.

```text
2024-11-19T06:52:24.792Z info: -----------------------------------------------------------
2024-11-19T06:52:24.807Z info: | Ctrl-Q
2024-11-19T06:52:24.807Z info: |
2024-11-19T06:52:24.807Z info: | Version      : 4.1.0
2024-11-19T06:52:24.807Z info: | Log level    : info
2024-11-19T06:52:24.807Z info: |
2024-11-19T06:52:24.807Z info: | Command      : session-get
2024-11-19T06:52:24.807Z info: |              : get info about proxy sessions on one or more virtual proxies
2024-11-19T06:52:24.807Z info: |
2024-11-19T06:52:24.807Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T06:52:24.807Z info: |
2024-11-19T06:52:24.807Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T06:52:24.807Z info: ----------------------------------------------------------
2024-11-19T06:52:24.807Z info:
2024-11-19T06:52:24.807Z info: Get Qlik Sense proxy sessions
2024-11-19T06:52:25.432Z info: Successfully retrieved 29 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T06:52:25.775Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T06:52:25.791Z info: Available Proxy services.
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Available proxy services.                                                                                 │
│                                                                                                           │
│ Note: The "sessions-get" command will only work correctly if the correct --host parameter is used when ca │
│ lling Ctrl-Q.                                                                                             │
│ The --host parameter should be one of the host names listed below.                                        │
├─────────┬─────────────────────────────────┬──────────────────────────────────────┬────────────────────────┤
│ Name    │ Host name                       │ Id                                   │ Linked virtual proxies │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ Central │ pro2-win1.lab.ptarmiganlabs.net │ 9d5d7900-3e52-4f22-b6b9-51f38a3afe86 │ 24                     │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 6                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-11-19T06:52:25.932Z warn: Virtual proxy is not linked to any proxy. Prefix="mobile", Session cookie header name="X-Qlik-Session-mob"
2024-11-19T06:52:26.494Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr", Session cookie header name="X-Qlik-Session-hdr-dev"
2024-11-19T06:52:28.822Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr-access1", Session cookie header name="X-Qlik-Session-hdr-access1"
2024-11-19T06:52:31.057Z info:
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ -- Sessions per virtual proxy and proxy services --                                                                                                                                                                                                                                            │
│                                                                                                                                                                                                                                                                                                │
│ Total number of sessions: 4                                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
│ Sessions per proxy service:                                                                                                                                                                                                                                                                    │
│    Central: pro2-win1.lab.ptarmiganlabs.net: 4                                                                                                                                                                                                                                                 │
│    dev1: pro2-win2.lab.ptarmiganlabs.net: 0                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
├───────────────────────────┬──────────────────────┬─────────────────────────────────────┬─────────────────────────────────┬──────────────────────────────────────────┬────────────────────────┬─────────────────┬───────────────────┬────────────────────┬──────────────────────────────────────┤
│ Virtual proxy description │ Virtual proxy prefix │ Virtual proxy session cookie header │ Linked proxy service            │ Load balancing nodes                     │ Session user directory │ Session user ID │ Session user name │ Session attributes │ Session ID                           │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Central Proxy (Default)   │                      │ X-Qlik-Session                      │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ goran           │                   │                    │ ea7821ab-dbad-4b1f-851d-cb06a73e10a7 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_1      │                   │                    │ 2734806e-c2e6-4d72-8c84-8a1964638fc3 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_2      │                   │                    │ 39950c34-b0bc-4e12-a2f8-b9e29a0f143f │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_3      │                   │                    │ d57f7cd5-caa7-4bf9-977f-ccdde97e222f │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
└───────────────────────────┴──────────────────────┴─────────────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────────┴────────────────────────┴─────────────────┴───────────────────┴────────────────────┴──────────────────────────────────────┘
```

### Add some sessions

To explore the various options for the `session-get` command, let's first add some sessions to the Sense environment.

This can be done in different ways:

- Manually by logging in as different users in incognito/private browser windows.
- Using the [Qlik Scalability Tools](https://community.qlik.com/t5/Scalability/Qlik-Sense-Enterprise-Scalability-Tools/td-p/1579916).
- By scripting the creation of sessions using browser automation tools, example in [this blog post](https://ptarmiganlabs.com/automate-safari-browser-using-applescript/).
- By scripting the creation of sessions using PowerShell.

In this example we'll use the last option above, and create some new Analyzer sessions.

Let's see what the `session-get` command returns now

```powershell
 .\ctrl-q.exe qseow session-get `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --output-format table
```

The output now shows new sessions for users `testuser_21`, `testuser_22`, `testuser_23` and `testuser_24`.

```text
2024-11-19T06:58:28.721Z info: -----------------------------------------------------------
2024-11-19T06:58:28.721Z info: | Ctrl-Q
2024-11-19T06:58:28.721Z info: |
2024-11-19T06:58:28.721Z info: | Version      : 4.1.0
2024-11-19T06:58:28.721Z info: | Log level    : info
2024-11-19T06:58:28.721Z info: |
2024-11-19T06:58:28.721Z info: | Command      : session-get
2024-11-19T06:58:28.721Z info: |              : get info about proxy sessions on one or more virtual proxies
2024-11-19T06:58:28.721Z info: |
2024-11-19T06:58:28.721Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T06:58:28.721Z info: |
2024-11-19T06:58:28.721Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T06:58:28.721Z info: ----------------------------------------------------------
2024-11-19T06:58:28.721Z info:
2024-11-19T06:58:28.736Z info: Get Qlik Sense proxy sessions
2024-11-19T06:58:29.267Z info: Successfully retrieved 29 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T06:58:29.581Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T06:58:29.596Z info: Available Proxy services.
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Available proxy services.                                                                                 │
│                                                                                                           │
│ Note: The "sessions-get" command will only work correctly if the correct --host parameter is used when ca │
│ lling Ctrl-Q.                                                                                             │
│ The --host parameter should be one of the host names listed below.                                        │
├─────────┬─────────────────────────────────┬──────────────────────────────────────┬────────────────────────┤
│ Name    │ Host name                       │ Id                                   │ Linked virtual proxies │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ Central │ pro2-win1.lab.ptarmiganlabs.net │ 9d5d7900-3e52-4f22-b6b9-51f38a3afe86 │ 24                     │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 6                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-11-19T06:58:29.736Z warn: Virtual proxy is not linked to any proxy. Prefix="mobile", Session cookie header name="X-Qlik-Session-mob"
2024-11-19T06:58:30.285Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr", Session cookie header name="X-Qlik-Session-hdr-dev"
2024-11-19T06:58:31.783Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr-access1", Session cookie header name="X-Qlik-Session-hdr-access1"
2024-11-19T06:58:34.050Z info:
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ -- Sessions per virtual proxy and proxy services --                                                                                                                                                                                                                                            │
│                                                                                                                                                                                                                                                                                                │
│ Total number of sessions: 8                                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
│ Sessions per proxy service:                                                                                                                                                                                                                                                                    │
│    Central: pro2-win1.lab.ptarmiganlabs.net: 8                                                                                                                                                                                                                                                 │
│    dev1: pro2-win2.lab.ptarmiganlabs.net: 0                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
├───────────────────────────┬──────────────────────┬─────────────────────────────────────┬─────────────────────────────────┬──────────────────────────────────────────┬────────────────────────┬─────────────────┬───────────────────┬────────────────────┬──────────────────────────────────────┤
│ Virtual proxy description │ Virtual proxy prefix │ Virtual proxy session cookie header │ Linked proxy service            │ Load balancing nodes                     │ Session user directory │ Session user ID │ Session user name │ Session attributes │ Session ID                           │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Central Proxy (Default)   │                      │ X-Qlik-Session                      │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ goran           │                   │                    │ ea7821ab-dbad-4b1f-851d-cb06a73e10a7 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_1      │                   │                    │ 2734806e-c2e6-4d72-8c84-8a1964638fc3 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_2      │                   │                    │ 39950c34-b0bc-4e12-a2f8-b9e29a0f143f │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_3      │                   │                    │ d57f7cd5-caa7-4bf9-977f-ccdde97e222f │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_21     │                   │                    │ 98f79431-fcca-414c-8589-484beea90500 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_22     │                   │                    │ a0307030-0701-43f2-86c6-759a11e32b8b │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_23     │                   │                    │ 0748b9cb-2538-43d0-aa20-adb10ac63b07 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_24     │                   │                    │ 8d7d5170-c9d5-4601-b528-16c56ddd2ff1 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
└───────────────────────────┴──────────────────────┴─────────────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────────┴────────────────────────┴─────────────────┴───────────────────┴────────────────────┴──────────────────────────────────────┘
```

It is also possible to filter the output to only show sessions for a specific virtual proxy or proxy service.  
This is done using the `--session-virtual-proxy` and `-proxy-host` options.  
Each of them takes one or more values.

```text
Usage: ctrl-q qseow session-get [options]

get info about proxy sessions on one or more virtual proxies

Options:
  --log-level <level>                  log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                        Qlik Sense host (IP/FQDN) where Qlik Repository Service (QRS) is running
  --qrs-port <port>                    Qlik Sense repository service (QRS) port (usually 4242) (default: "4242")
  --virtual-proxy <prefix>             Qlik Sense virtual proxy prefix to access QRS via (default: "")
  --secure <true|false>                https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --session-virtual-proxy <prefix...>  one or more Qlik Sense virtual proxies to get sessions for
  --host-proxy <host...>               Qlik Sense hosts/proxies (IP/FQDN) to get sessions from. Must match the host names of the Sense nodes
  --qps-port <port>                    Qlik Sense proxy service (QPS) port (usually 4243) (default: "4243")
  --auth-user-dir <directory>          user directory for user to connect with
  --auth-user-id <userid>              user ID for user to connect with
  -a, --auth-type <type>               authentication type (choices: "cert", default: "cert")
  --auth-cert-file <file>              Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>          Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>         Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --output-format <json|table>         output format (default: "json")
  -s, --sort-by <column>               column to sort output table by (choices: "prefix", "proxyhost", "proxyname", "userdir", "userid", "username", default: "prefix")
  -h, --help                           display help for command
  ```

Let's filter to only show the sessions connected to the `hdr` virtual proxy:

```powershell
.\ctrl-q.exe qseow session-get `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --output-format table `
   --session-virtual-proxy hdr
```

```text
2024-11-19T07:01:09.130Z info: -----------------------------------------------------------
2024-11-19T07:01:09.145Z info: | Ctrl-Q
2024-11-19T07:01:09.145Z info: |
2024-11-19T07:01:09.145Z info: | Version      : 4.1.0
2024-11-19T07:01:09.145Z info: | Log level    : info
2024-11-19T07:01:09.145Z info: |
2024-11-19T07:01:09.145Z info: | Command      : session-get
2024-11-19T07:01:09.145Z info: |              : get info about proxy sessions on one or more virtual proxies
2024-11-19T07:01:09.145Z info: |
2024-11-19T07:01:09.145Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T07:01:09.145Z info: |
2024-11-19T07:01:09.145Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T07:01:09.145Z info: ----------------------------------------------------------
2024-11-19T07:01:09.145Z info:
2024-11-19T07:01:09.145Z info: Get Qlik Sense proxy sessions
2024-11-19T07:01:09.521Z info: Successfully retrieved 2 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T07:01:09.911Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T07:01:09.926Z info: Available Proxy services.
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Available proxy services.                                                                                 │
│                                                                                                           │
│ Note: The "sessions-get" command will only work correctly if the correct --host parameter is used when ca │
│ lling Ctrl-Q.                                                                                             │
│ The --host parameter should be one of the host names listed below.                                        │
├─────────┬─────────────────────────────────┬──────────────────────────────────────┬────────────────────────┤
│ Name    │ Host name                       │ Id                                   │ Linked virtual proxies │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ Central │ pro2-win1.lab.ptarmiganlabs.net │ 9d5d7900-3e52-4f22-b6b9-51f38a3afe86 │ 24                     │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 6                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-11-19T07:01:09.926Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr", Session cookie header name="X-Qlik-Session-hdr-dev"
2024-11-19T07:01:10.099Z info:
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ -- Sessions per virtual proxy and proxy services --                                                                                                                                                                                                                                            │
│                                                                                                                                                                                                                                                                                                │
│ Total number of sessions: 7                                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
│ Sessions per proxy service:                                                                                                                                                                                                                                                                    │
│    Central: pro2-win1.lab.ptarmiganlabs.net: 7                                                                                                                                                                                                                                                 │
│                                                                                                                                                                                                                                                                                                │
├───────────────────────────┬──────────────────────┬─────────────────────────────────────┬─────────────────────────────────┬──────────────────────────────────────────┬────────────────────────┬─────────────────┬───────────────────┬────────────────────┬──────────────────────────────────────┤
│ Virtual proxy description │ Virtual proxy prefix │ Virtual proxy session cookie header │ Linked proxy service            │ Load balancing nodes                     │ Session user directory │ Session user ID │ Session user name │ Session attributes │ Session ID                           │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_1      │                   │                    │ 2734806e-c2e6-4d72-8c84-8a1964638fc3 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_2      │                   │                    │ 39950c34-b0bc-4e12-a2f8-b9e29a0f143f │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_3      │                   │                    │ d57f7cd5-caa7-4bf9-977f-ccdde97e222f │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_21     │                   │                    │ 98f79431-fcca-414c-8589-484beea90500 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_22     │                   │                    │ a0307030-0701-43f2-86c6-759a11e32b8b │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_23     │                   │                    │ 0748b9cb-2538-43d0-aa20-adb10ac63b07 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Header proxy at CENTRAL   │ hdr                  │ X-Qlik-Session-hdr-central          │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_24     │                   │                    │ 8d7d5170-c9d5-4601-b528-16c56ddd2ff1 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
└───────────────────────────┴──────────────────────┴─────────────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────────┴────────────────────────┴─────────────────┴───────────────────┴────────────────────┴──────────────────────────────────────┘
```

Similarly, it is possible to filter to only show sessions for a specific proxy service by specifying one or more proxy hosts in the `--host-proxy` option.

## Delete proxy sessions

Deleting proxy sessions it is only possible for one virtual proxy and proxy service at a time.

If one or more session IDs are provided to Ctrl-Q, those sessions will be deleted.  
If no session IDs are provided, all sessions for the specified virtual proxy and proxy service will be deleted.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow session-delete --help
Usage: ctrl-q qseow session-delete [options]

delete proxy session(s) on a specific virtual proxy and proxy service

Options:
  --log-level <level>               log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                     Qlik Sense host (IP/FQDN) where Qlik Repository Service (QRS) is running
  --qrs-port <port>                 Qlik Sense repository service (QRS) port (usually 4242) (default: "4242")
  --virtual-proxy <prefix>          Qlik Sense virtual proxy prefix to access QRS via (default: "")
  --secure <true|false>             https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --session-id <id...>              session IDs to delete
  --session-virtual-proxy <prefix>  Qlik Sense virtual proxy (prefix) to delete proxy session(s) on (default: "")
  --host-proxy <host>               Qlik Sense proxy (IP/FQDN) where sessions should be deleted. Must match the host name of a Sense node
  --qps-port <port>                 Qlik Sense proxy service (QPS) port (usually 4243) (default: "4243")
  --auth-user-dir <directory>       user directory for user to connect with
  --auth-user-id <userid>           user ID for user to connect with
  -a, --auth-type <type>            authentication type (choices: "cert", default: "cert")
  --auth-cert-file <file>           Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>       Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>      Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  -h, --help                        display help for command
```

### Example: Delete specific sessions

Let's delete two specific sessions for users `testuser_1` and `testuser_2`, using the session IDs from the previous example, for the `win` virtual proxy on the `pro2-win1.lab.ptarmiganlabs.net` host.

```text
.\ctrl-q.exe qseow session-delete `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --host-proxy pro2-win1.lab.ptarmiganlabs.net `
   --session-virtual-proxy "hdr" `
   --session-id 2734806e-c2e6-4d72-8c84-8a1964638fc3 39950c34-b0bc-4e12-a2f8-b9e29a0f143f
```

The output shows that the sessions were deleted:

```text
2024-11-19T07:03:31.754Z info: -----------------------------------------------------------
2024-11-19T07:03:31.769Z info: | Ctrl-Q
2024-11-19T07:03:31.769Z info: |
2024-11-19T07:03:31.769Z info: | Version      : 4.1.0
2024-11-19T07:03:31.769Z info: | Log level    : info
2024-11-19T07:03:31.769Z info: |
2024-11-19T07:03:31.769Z info: | Command      : session-delete
2024-11-19T07:03:31.769Z info: |              : delete proxy session(s) on a specific virtual proxy and proxy service
2024-11-19T07:03:31.769Z info: |
2024-11-19T07:03:31.769Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T07:03:31.769Z info: |
2024-11-19T07:03:31.769Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T07:03:31.769Z info: ----------------------------------------------------------
2024-11-19T07:03:31.769Z info:
2024-11-19T07:03:31.769Z info: Delete Qlik Sense proxy sessions
2024-11-19T07:03:31.769Z info: Deleting sessions on proxy "pro2-win1.lab.ptarmiganlabs.net", virtual proxy "hdr"
2024-11-19T07:03:32.160Z info: Successfully retrieved 2 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T07:03:32.520Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T07:03:32.535Z info: Available Proxy services.
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Available proxy services.                                                                                 │
│                                                                                                           │
│ Note: The "sessions-get" command will only work correctly if the correct --host parameter is used when ca │
│ lling Ctrl-Q.                                                                                             │
│ The --host parameter should be one of the host names listed below.                                        │
├─────────┬─────────────────────────────────┬──────────────────────────────────────┬────────────────────────┤
│ Name    │ Host name                       │ Id                                   │ Linked virtual proxies │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ Central │ pro2-win1.lab.ptarmiganlabs.net │ 9d5d7900-3e52-4f22-b6b9-51f38a3afe86 │ 24                     │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 6                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-11-19T07:03:32.535Z info: ✅ All host names specified in the --host-proxy parameter are valid.
2024-11-19T07:03:32.817Z info: Session ID "2734806e-c2e6-4d72-8c84-8a1964638fc3" successfully deleted. User: LAB\testuser_1
2024-11-19T07:03:32.957Z info: Session ID "39950c34-b0bc-4e12-a2f8-b9e29a0f143f" successfully deleted. User: LAB\testuser_2
2024-11-19T07:03:32.957Z info:
2024-11-19T07:03:32.957Z info: Deleted 2 sessions
```

### Example: Delete all sessions connected to a virtual proxy

To delete all sessions connected to a specific virtual proxy via its linked proxy service, simply omit the `--session-id` option.  
This will prompt for confirmation before deleting the sessions.

Let's delete all sessions connected to the `finance` virtual proxy on the `pro2-win1.lab.ptarmiganlabs.net` host:

```powershell
.\ctrl-q.exe qseow session-delete `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --host-proxy pro2-win1.lab.ptarmiganlabs.net `
   --session-virtual-proxy "hdr"
```

The output shows that the sessions were deleted:

```text
2024-11-19T07:05:10.347Z info: -----------------------------------------------------------
2024-11-19T07:05:10.347Z info: | Ctrl-Q
2024-11-19T07:05:10.347Z info: |
2024-11-19T07:05:10.347Z info: | Version      : 4.1.0
2024-11-19T07:05:10.347Z info: | Log level    : info
2024-11-19T07:05:10.347Z info: |
2024-11-19T07:05:10.347Z info: | Command      : session-delete
2024-11-19T07:05:10.347Z info: |              : delete proxy session(s) on a specific virtual proxy and proxy service
2024-11-19T07:05:10.347Z info: |
2024-11-19T07:05:10.347Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T07:05:10.347Z info: |
2024-11-19T07:05:10.347Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T07:05:10.347Z info: ----------------------------------------------------------
2024-11-19T07:05:10.347Z info:
2024-11-19T07:05:10.347Z info: Delete Qlik Sense proxy sessions
2024-11-19T07:05:10.347Z info: Deleting sessions on proxy "pro2-win1.lab.ptarmiganlabs.net", virtual proxy "hdr"
2024-11-19T07:05:10.769Z info: Successfully retrieved 2 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T07:05:11.112Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T07:05:11.128Z info: Available Proxy services.
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Available proxy services.                                                                                 │
│                                                                                                           │
│ Note: The "sessions-get" command will only work correctly if the correct --host parameter is used when ca │
│ lling Ctrl-Q.                                                                                             │
│ The --host parameter should be one of the host names listed below.                                        │
├─────────┬─────────────────────────────────┬──────────────────────────────────────┬────────────────────────┤
│ Name    │ Host name                       │ Id                                   │ Linked virtual proxies │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ Central │ pro2-win1.lab.ptarmiganlabs.net │ 9d5d7900-3e52-4f22-b6b9-51f38a3afe86 │ 24                     │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 6                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-11-19T07:05:11.128Z info: ✅ All host names specified in the --host-proxy parameter are valid.
2024-11-19T07:05:11.128Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr", Session cookie header name="X-Qlik-Session-hdr-dev"
2024-11-19T07:05:11.284Z info:
                                  No session IDs specified, meaning that all existing sessions will be deleted for proxy "pro2-win1.lab.ptarmiganlabs.net" and virtual proxy "hdr".

                                  Are you sure you want to continue? (y/n) y
2024-11-19T07:05:14.269Z info:
2024-11-19T07:05:14.269Z info: Deleting sessions...
2024-11-19T07:05:14.425Z info: Session ID "d57f7cd5-caa7-4bf9-977f-ccdde97e222f" successfully deleted. User: LAB\testuser_3
2024-11-19T07:05:14.581Z info: Session ID "98f79431-fcca-414c-8589-484beea90500" successfully deleted. User: LAB\testuser_21
2024-11-19T07:05:14.753Z info: Session ID "a0307030-0701-43f2-86c6-759a11e32b8b" successfully deleted. User: LAB\testuser_22
2024-11-19T07:05:14.909Z info: Session ID "0748b9cb-2538-43d0-aa20-adb10ac63b07" successfully deleted. User: LAB\testuser_23
2024-11-19T07:05:15.066Z info: Session ID "8d7d5170-c9d5-4601-b528-16c56ddd2ff1" successfully deleted. User: LAB\testuser_24
2024-11-19T07:05:15.066Z info:
2024-11-19T07:05:15.066Z info: Deleted 5 sessions
```

At this point there is only one session left, the one for the `LAB\goran` user.

```text
2024-11-19T07:05:50.747Z info: -----------------------------------------------------------
2024-11-19T07:05:50.747Z info: | Ctrl-Q
2024-11-19T07:05:50.747Z info: |
2024-11-19T07:05:50.747Z info: | Version      : 4.1.0
2024-11-19T07:05:50.747Z info: | Log level    : info
2024-11-19T07:05:50.747Z info: |
2024-11-19T07:05:50.747Z info: | Command      : session-get
2024-11-19T07:05:50.747Z info: |              : get info about proxy sessions on one or more virtual proxies
2024-11-19T07:05:50.747Z info: |
2024-11-19T07:05:50.747Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T07:05:50.747Z info: |
2024-11-19T07:05:50.747Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T07:05:50.747Z info: ----------------------------------------------------------
2024-11-19T07:05:50.747Z info:
2024-11-19T07:05:50.762Z info: Get Qlik Sense proxy sessions
2024-11-19T07:05:51.325Z info: Successfully retrieved 29 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T07:05:51.653Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-11-19T07:05:51.668Z info: Available Proxy services.
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Available proxy services.                                                                                 │
│                                                                                                           │
│ Note: The "sessions-get" command will only work correctly if the correct --host parameter is used when ca │
│ lling Ctrl-Q.                                                                                             │
│ The --host parameter should be one of the host names listed below.                                        │
├─────────┬─────────────────────────────────┬──────────────────────────────────────┬────────────────────────┤
│ Name    │ Host name                       │ Id                                   │ Linked virtual proxies │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ Central │ pro2-win1.lab.ptarmiganlabs.net │ 9d5d7900-3e52-4f22-b6b9-51f38a3afe86 │ 24                     │
├─────────┼─────────────────────────────────┼──────────────────────────────────────┼────────────────────────┤
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 6                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-11-19T07:05:51.825Z warn: Virtual proxy is not linked to any proxy. Prefix="mobile", Session cookie header name="X-Qlik-Session-mob"
2024-11-19T07:05:52.434Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr", Session cookie header name="X-Qlik-Session-hdr-dev"
2024-11-19T07:05:53.966Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr-access1", Session cookie header name="X-Qlik-Session-hdr-access1"
2024-11-19T07:05:56.168Z info:
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ -- Sessions per virtual proxy and proxy services --                                                                                                                                                                                                                                            │
│                                                                                                                                                                                                                                                                                                │
│ Total number of sessions: 1                                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
│ Sessions per proxy service:                                                                                                                                                                                                                                                                    │
│    Central: pro2-win1.lab.ptarmiganlabs.net: 1                                                                                                                                                                                                                                                 │
│    dev1: pro2-win2.lab.ptarmiganlabs.net: 0                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
├───────────────────────────┬──────────────────────┬─────────────────────────────────────┬─────────────────────────────────┬──────────────────────────────────────────┬────────────────────────┬─────────────────┬───────────────────┬────────────────────┬──────────────────────────────────────┤
│ Virtual proxy description │ Virtual proxy prefix │ Virtual proxy session cookie header │ Linked proxy service            │ Load balancing nodes                     │ Session user directory │ Session user ID │ Session user name │ Session attributes │ Session ID                           │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Central Proxy (Default)   │                      │ X-Qlik-Session                      │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ goran           │                   │                    │ ea7821ab-dbad-4b1f-851d-cb06a73e10a7 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
└───────────────────────────┴──────────────────────┴─────────────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────────┴────────────────────────┴─────────────────┴───────────────────┴────────────────────┴──────────────────────────────────────┘
```
