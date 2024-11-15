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
2024-03-12T10:14:50.543Z info: -----------------------------------------------------------
2024-03-12T10:14:50.543Z info: | Ctrl-Q
2024-03-12T10:14:50.543Z info: |
2024-03-12T10:14:50.543Z info: | Version      : 3.16.0
2024-03-12T10:14:50.543Z info: | Log level    : info
2024-03-12T10:14:50.543Z info: |
2024-03-12T10:14:50.543Z info: | Command      : session-get
2024-03-12T10:14:50.543Z info: |              : get info about proxy sessions on one or more virtual proxies
2024-03-12T10:14:50.558Z info: |
2024-03-12T10:14:50.558Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T10:14:50.558Z info: |
2024-03-12T10:14:50.558Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T10:14:50.558Z info: ----------------------------------------------------------
2024-03-12T10:14:50.558Z info:
2024-03-12T10:14:50.558Z info: Get Qlik Sense proxy sessions
2024-03-12T10:14:51.043Z info: Successfully retrieved 29 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T10:14:51.371Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T10:14:51.387Z info: Available Proxy services.
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
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 5                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-03-12T10:14:51.481Z warn: Virtual proxy is not linked to any proxy. Prefix="mobile", Session cookie header name="X-Qlik-Session-mob"
2024-03-12T10:14:51.840Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr", Session cookie header name="X-Qlik-Session-hdr-dev"
2024-03-12T10:14:53.340Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr-access1", Session cookie header name="X-Qlik-Session-hdr-access1"
2024-03-12T10:14:54.605Z info:
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
│ Central Proxy (Default)   │                      │ X-Qlik-Session                      │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ goran           │                   │                    │ a906ee6b-a8da-4c66-9700-48036c96de7b │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
└───────────────────────────┴──────────────────────┴─────────────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────────┴────────────────────────┴─────────────────┴───────────────────┴────────────────────┴──────────────────────────────────────┘
```

### Add some sessions

To explore the various options for the `session-get` command, let's first add some sessions to the Sense environment.

This can be done in different ways:

- Manually by logging in as different users in incognito/private browser windows.
- Using the [Qlik Scalability Tools](https://community.qlik.com/t5/Scalability/Qlik-Sense-Enterprise-Scalability-Tools/td-p/1579916).
- By scripting the creation of sessions using browser automation tools, example in [this blog post](https://ptarmiganlabs.com/automate-safari-browser-using-applescript/).

In this example we'll use the last option above, and create a few sessions by remote controlling/automating the Safari browser in macOS.  
Two connections have been created to `https://qliksense.ptarmiganlabs.net/finance`, and two to `https://qliksense.ptarmiganlabs.net/win`.  
I.e. there should be two new sessions to the `finance` virtual proxy, and two to the `win` virtual proxy.

Let's see what the `session-get` command returns now

```powershell
 .\ctrl-q.exe qseow session-get `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --output-format table
```

The output now shows the new sessions:

```text
2024-03-12T10:55:50.652Z info: -----------------------------------------------------------
2024-03-12T10:55:50.652Z info: | Ctrl-Q
2024-03-12T10:55:50.652Z info: |
2024-03-12T10:55:50.652Z info: | Version      : 3.16.0
2024-03-12T10:55:50.652Z info: | Log level    : info
2024-03-12T10:55:50.652Z info: |
2024-03-12T10:55:50.652Z info: | Command      : session-get
2024-03-12T10:55:50.652Z info: |              : get info about proxy sessions on one or more virtual proxies
2024-03-12T10:55:50.652Z info: |
2024-03-12T10:55:50.652Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T10:55:50.652Z info: |
2024-03-12T10:55:50.652Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T10:55:50.652Z info: ----------------------------------------------------------
2024-03-12T10:55:50.652Z info:
2024-03-12T10:55:50.668Z info: Get Qlik Sense proxy sessions
2024-03-12T10:55:50.981Z info: Successfully retrieved 29 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T10:55:51.262Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T10:55:51.277Z info: Available Proxy services.
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
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 5                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-03-12T10:55:51.386Z warn: Virtual proxy is not linked to any proxy. Prefix="mobile", Session cookie header name="X-Qlik-Session-mob"
2024-03-12T10:55:51.761Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr", Session cookie header name="X-Qlik-Session-hdr-dev"
2024-03-12T10:55:52.746Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr-access1", Session cookie header name="X-Qlik-Session-hdr-access1"
2024-03-12T10:55:53.949Z info:
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ -- Sessions per virtual proxy and proxy services --                                                                                                                                                                                                                                            │
│                                                                                                                                                                                                                                                                                                │
│ Total number of sessions: 5                                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
│ Sessions per proxy service:                                                                                                                                                                                                                                                                    │
│    Central: pro2-win1.lab.ptarmiganlabs.net: 5                                                                                                                                                                                                                                                 │
│    dev1: pro2-win2.lab.ptarmiganlabs.net: 0                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
├───────────────────────────┬──────────────────────┬─────────────────────────────────────┬─────────────────────────────────┬──────────────────────────────────────────┬────────────────────────┬─────────────────┬───────────────────┬────────────────────┬──────────────────────────────────────┤
│ Virtual proxy description │ Virtual proxy prefix │ Virtual proxy session cookie header │ Linked proxy service            │ Load balancing nodes                     │ Session user directory │ Session user ID │ Session user name │ Session attributes │ Session ID                           │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Central Proxy (Default)   │                      │ X-Qlik-Session                      │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ goran           │                   │                    │ a906ee6b-a8da-4c66-9700-48036c96de7b │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ finance virtual proxy     │ finance              │ X-Qlik-Session-finance              │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_2      │                   │                    │ d1b5d953-4312-4cf2-a106-1992a84dd82b │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │ dev1: pro2-win2.lab.ptarmiganlabs.net    │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ finance virtual proxy     │ finance              │ X-Qlik-Session-finance              │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_1      │                   │                    │ 55142b14-8d2d-43b3-a522-4b2fb46b2798 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │ dev1: pro2-win2.lab.ptarmiganlabs.net    │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Central Win auth          │ win                  │ X-Qlik-Session-win                  │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_3      │                   │                    │ e9a9c1d3-2d75-4559-9a68-48d1180b3859 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ Central Win auth          │ win                  │ X-Qlik-Session-win                  │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_4      │                   │                    │ 6ac3b0ea-7d87-41d6-bede-89eb43c63e38 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
└───────────────────────────┴──────────────────────┴─────────────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────────┴────────────────────────┴─────────────────┴───────────────────┴────────────────────┴──────────────────────────────────────┘
```

It is also possible to filter the output to only show sessions for a specific virtual proxy or proxy service.  
This is done using the `--session-virtual-proxy` and `-proxy-host` options.  
Each of them takes one or more values.

```text
Usage: ctrl-q session-get [options]

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

Let's filter to only show the sessions connected to the `finance` virtual proxy:

```powershell
.\ctrl-q.exe session-get `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --output-format table `
   --session-virtual-proxy finance
```

```text
2024-03-12T11:03:10.614Z info: -----------------------------------------------------------
2024-03-12T11:03:10.628Z info: | Ctrl-Q
2024-03-12T11:03:10.628Z info: |
2024-03-12T11:03:10.628Z info: | Version      : 3.16.0
2024-03-12T11:03:10.628Z info: | Log level    : info
2024-03-12T11:03:10.628Z info: |
2024-03-12T11:03:10.628Z info: | Command      : session-get
2024-03-12T11:03:10.628Z info: |              : get info about proxy sessions on one or more virtual proxies
2024-03-12T11:03:10.628Z info: |
2024-03-12T11:03:10.628Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T11:03:10.628Z info: |
2024-03-12T11:03:10.628Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T11:03:10.628Z info: ----------------------------------------------------------
2024-03-12T11:03:10.628Z info:
2024-03-12T11:03:10.628Z info: Get Qlik Sense proxy sessions
2024-03-12T11:03:10.769Z info: Successfully retrieved 1 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T11:03:11.066Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T11:03:11.066Z info: Available Proxy services.
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
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 5                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-03-12T11:03:11.269Z info:
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ -- Sessions per virtual proxy and proxy services --                                                                                                                                                                                                                                            │
│                                                                                                                                                                                                                                                                                                │
│ Total number of sessions: 2                                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
│ Sessions per proxy service:                                                                                                                                                                                                                                                                    │
│    Central: pro2-win1.lab.ptarmiganlabs.net: 2                                                                                                                                                                                                                                                 │
│    dev1: pro2-win2.lab.ptarmiganlabs.net: 0                                                                                                                                                                                                                                                    │
│                                                                                                                                                                                                                                                                                                │
├───────────────────────────┬──────────────────────┬─────────────────────────────────────┬─────────────────────────────────┬──────────────────────────────────────────┬────────────────────────┬─────────────────┬───────────────────┬────────────────────┬──────────────────────────────────────┤
│ Virtual proxy description │ Virtual proxy prefix │ Virtual proxy session cookie header │ Linked proxy service            │ Load balancing nodes                     │ Session user directory │ Session user ID │ Session user name │ Session attributes │ Session ID                           │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ finance virtual proxy     │ finance              │ X-Qlik-Session-finance              │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_2      │                   │                    │ d1b5d953-4312-4cf2-a106-1992a84dd82b │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │ dev1: pro2-win2.lab.ptarmiganlabs.net    │                        │                 │                   │                    │                                      │
├───────────────────────────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────┼────────────────────────┼─────────────────┼───────────────────┼────────────────────┼──────────────────────────────────────┤
│ finance virtual proxy     │ finance              │ X-Qlik-Session-finance              │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ testuser_1      │                   │                    │ 55142b14-8d2d-43b3-a522-4b2fb46b2798 │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │ dev1: pro2-win2.lab.ptarmiganlabs.net    │                        │                 │                   │                    │                                      │
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

Let's delete two specific sessions, using the session IDs from the previous example, for the `win` virtual proxy on the `pro2-win1.lab.ptarmiganlabs.net` host.

```text
.\ctrl-q.exe qseow session-delete `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --host-proxy pro2-win1.lab.ptarmiganlabs.net `
   --session-virtual-proxy "win" `
   --session-id e9a9c1d3-2d75-4559-9a68-48d1180b3859 6ac3b0ea-7d87-41d6-bede-89eb43c63e38
```

The output shows that the sessions were deleted:

```text
2024-03-12T11:10:04.861Z info: -----------------------------------------------------------
2024-03-12T11:10:04.861Z info: | Ctrl-Q
2024-03-12T11:10:04.861Z info: |
2024-03-12T11:10:04.861Z info: | Version      : 3.16.0
2024-03-12T11:10:04.861Z info: | Log level    : info
2024-03-12T11:10:04.861Z info: |
2024-03-12T11:10:04.861Z info: | Command      : session-delete
2024-03-12T11:10:04.861Z info: |              : delete proxy session(s) on a specific virtual proxy and proxy service
2024-03-12T11:10:04.861Z info: |
2024-03-12T11:10:04.861Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T11:10:04.877Z info: |
2024-03-12T11:10:04.877Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T11:10:04.877Z info: ----------------------------------------------------------
2024-03-12T11:10:04.877Z info:
2024-03-12T11:10:04.877Z info: Delete Qlik Sense proxy sessions
2024-03-12T11:10:04.877Z info: Deleting sessions on proxy "pro2-win1.lab.ptarmiganlabs.net", virtual proxy "win"
2024-03-12T11:10:05.017Z info: Successfully retrieved 1 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T11:10:05.345Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T11:10:05.345Z info: Available Proxy services.
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
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 5                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-03-12T11:10:05.345Z info: ✅ All host names specified in the --host-proxy parameter are valid.
2024-03-12T11:10:05.564Z info: Session ID "e9a9c1d3-2d75-4559-9a68-48d1180b3859" successfully deleted. User: LAB\testuser_3
2024-03-12T11:10:05.658Z info: Session ID "6ac3b0ea-7d87-41d6-bede-89eb43c63e38" successfully deleted. User: LAB\testuser_4
2024-03-12T11:10:05.658Z info:
2024-03-12T11:10:05.658Z info: Deleted 2 sessions
```

### Example: Delete all sessions connected to a virtual proxy

To delete all sessions connected to a specific virtual proxy via its linked proxy service, simply omit the `--session-id` option.  
This will prompt for confirmation before deleting the sessions.

Let's delete all sessions connected to the `finance` virtual proxy on the `pro2-win1.lab.ptarmiganlabs.net` host:

```powershell
.\ctrl-q.exe session-delete `
   --auth-type cert `
   --host pro2-win1.lab.ptarmiganlabs.net `
   --auth-user-dir LAB `
   --auth-user-id goran `
   --host-proxy pro2-win1.lab.ptarmiganlabs.net `
   --session-virtual-proxy "finance"
```

The output shows that the sessions were deleted:

```text
2024-03-12T11:13:20.260Z info: -----------------------------------------------------------
2024-03-12T11:13:20.260Z info: | Ctrl-Q
2024-03-12T11:13:20.260Z info: |
2024-03-12T11:13:20.260Z info: | Version      : 3.16.0
2024-03-12T11:13:20.260Z info: | Log level    : info
2024-03-12T11:13:20.260Z info: |
2024-03-12T11:13:20.260Z info: | Command      : session-delete
2024-03-12T11:13:20.260Z info: |              : delete proxy session(s) on a specific virtual proxy and proxy service
2024-03-12T11:13:20.260Z info: |
2024-03-12T11:13:20.260Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T11:13:20.260Z info: |
2024-03-12T11:13:20.260Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T11:13:20.260Z info: ----------------------------------------------------------
2024-03-12T11:13:20.260Z info:
2024-03-12T11:13:20.275Z info: Delete Qlik Sense proxy sessions
2024-03-12T11:13:20.275Z info: Deleting sessions on proxy "pro2-win1.lab.ptarmiganlabs.net", virtual proxy "finance"
2024-03-12T11:13:20.416Z info: Successfully retrieved 1 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T11:13:20.728Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T11:13:20.728Z info: Available Proxy services.
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
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 5                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-03-12T11:13:20.728Z info: ✅ All host names specified in the --host-proxy parameter are valid.
2024-03-12T11:13:21.400Z info:
                                  No session IDs specified, meaning that all existing sessions will be deleted for proxy "pro2-win1.lab.ptarmiganlabs.net" and virtual proxy "finance".

                                  Are you sure you want to continue? (y/n) y
2024-03-12T11:13:26.871Z info:
2024-03-12T11:13:26.871Z info: Deleting sessions...
2024-03-12T11:13:26.981Z info: Session ID "d1b5d953-4312-4cf2-a106-1992a84dd82b" successfully deleted. User: LAB\testuser_2
2024-03-12T11:13:27.075Z info: Session ID "55142b14-8d2d-43b3-a522-4b2fb46b2798" successfully deleted. User: LAB\testuser_1
2024-03-12T11:13:27.090Z info:
2024-03-12T11:13:27.090Z info: Deleted 2 sessions
```

At this point there is only one session left, the one for the `LAB\goran` user.

```text
2024-03-12T11:14:55.678Z info: -----------------------------------------------------------
2024-03-12T11:14:55.678Z info: | Ctrl-Q
2024-03-12T11:14:55.678Z info: |
2024-03-12T11:14:55.678Z info: | Version      : 3.16.0
2024-03-12T11:14:55.678Z info: | Log level    : info
2024-03-12T11:14:55.678Z info: |
2024-03-12T11:14:55.678Z info: | Command      : session-get
2024-03-12T11:14:55.678Z info: |              : get info about proxy sessions on one or more virtual proxies
2024-03-12T11:14:55.678Z info: |
2024-03-12T11:14:55.678Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-03-12T11:14:55.678Z info: |
2024-03-12T11:14:55.678Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-03-12T11:14:55.678Z info: ----------------------------------------------------------
2024-03-12T11:14:55.678Z info:
2024-03-12T11:14:55.693Z info: Get Qlik Sense proxy sessions
2024-03-12T11:14:56.005Z info: Successfully retrieved 29 virtual proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T11:14:56.288Z info: Successfully retrieved 2 proxies from host pro2-win1.lab.ptarmiganlabs.net
2024-03-12T11:14:56.302Z info: Available Proxy services.
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
│ dev1    │ pro2-win2.lab.ptarmiganlabs.net │ d0510bbe-c686-459b-b10e-713fcf3951e8 │ 5                      │
└─────────┴─────────────────────────────────┴──────────────────────────────────────┴────────────────────────┘

2024-03-12T11:14:56.412Z warn: Virtual proxy is not linked to any proxy. Prefix="mobile", Session cookie header name="X-Qlik-Session-mob"
2024-03-12T11:14:56.771Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr", Session cookie header name="X-Qlik-Session-hdr-dev"
2024-03-12T11:14:57.693Z warn: Virtual proxy is not linked to any proxy. Prefix="hdr-access1", Session cookie header name="X-Qlik-Session-hdr-access1"
2024-03-12T11:14:58.896Z info:
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
│ Central Proxy (Default)   │                      │ X-Qlik-Session                      │ Central:                        │ Central: pro2-win1.lab.ptarmiganlabs.net │ LAB                    │ goran           │                   │                    │ a906ee6b-a8da-4c66-9700-48036c96de7b │
│                           │                      │                                     │ pro2-win1.lab.ptarmiganlabs.net │                                          │                        │                 │                   │                    │                                      │
└───────────────────────────┴──────────────────────┴─────────────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────────┴────────────────────────┴─────────────────┴───────────────────┴────────────────────┴──────────────────────────────────────┘
```