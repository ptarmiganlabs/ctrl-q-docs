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
  - [Use cases](#use-cases)
  - [Syntax](#syntax)
  - [Example: Scramble fields, keep new app in My Work](#example-scramble-fields-keep-new-app-in-my-work)
  - [Example: Scramble fields, publish new app to stream](#example-scramble-fields-publish-new-app-to-stream)
  - [Example: Scramble fields, replace existing published app](#example-scramble-fields-replace-existing-published-app)

---

## Scramble fields in Sense app

Scramble one or more fields in an app using Qlik Sense's internal scrambling feature.  
Store the scrambled data in a new app. Optionally publish this new app, or overwrite an existing app with it.

Note:

- If more than one field is to be scrambled, the indidivudal field names should be separated by the space.
- The entire list of field names (the `--field-name` option) should be surrounded by double quotes.
- A new app with the scrambled data will be created. Specify its name in the `--new-app-name` option.
- Qlik Sense's [internal scrambling feature](https://help.qlik.com/en-US/sense-developer/November2024/Subsystems/NetSDKAPIref/Content/Qlik.Engine.App.Scramble.htm) is used. It does a good job at scrambling the data, but it is (probably) not what you need if best possible security is needed. For example
  - Small numbers are replaced by other (random) small numbers.
  - Characters are (usually?) replaced by other characters.
  - Spaces are never (?) scrambled.
  - String lengths are (usually?) preserved.

Regarding the last point above (security), Sense's scrambling feature strikes a good balance beetween obscurity and leaving the data in a somewhat recognisable state.  
For example, "Los Angeles" might become "jYP jmNxhgw".

### Use cases

All cases below starts with an existing app, in which some fields are scrambled.  
A new app is created with the scrambled data in it (as well as unscrambled fields from the source app).

1. Do a one-off scrambling, the new app is saved in the My Work area in the hub.
2. Publish the new, scrambled app to a stream. Could be an easy way to create a demo app based on an app with real, possibly sensitve data.
3. Replace an existing, unpublished or published app.
   - If the target app is published, only the sheets that were originally published with the app are replaced.
   - If the replaced app is not published, the entire app is replaced.
   - Replacing a published app can be useful as part of a QMC reload chain. Create an external program task (running field scrambling using Ctrl-Q) that runs after the main app has finished reloading. Replace an already published demo/scrambled app.

### Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow field-scramble --help
Usage: ctrl-q qseow field-scramble [options]

scramble one or more fields in an app. A new app with the scrambled data is created.

Options:
  --log-level <level>           log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                 Qlik Sense server IP/FQDN
  --engine-port <port>          Qlik Sense server engine port (usually 4747 for cert auth, 443 for jwt auth) (default: "4747")
  --qrs-port <port>             Qlik Sense server QRS port (usually 4242 for cert auth, 443 for jwt auth) (default: "4242")
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
  --app-id <id>                 Qlik Sense app ID to be scrambled
  --field-name <names...>       name of field(s) to be scrambled
  --new-app-name <name>         name of new app that will contain scrambled data. Not used if --new-app-cmd=replace
  --new-app-delete              should the new scrambled app be deleted after the operation is complete? If not, the new app will be placed in the My Work stream
  --new-app-cmd <command>       what to do with the new app. If nothing is specified in this option the new app will be placed in My Work.
                                "publish": publish the new app to the stream specified by --new-app-cmd-id or --new-app-cmd-name. The new app will NOT remain in My Work.
                                "replace": Replace an existing published or unpublished app. If the app is published, only the sheets that were originally published with the app are replaced. If the
                                replaced app is not published, the entire app is replaced. (choices: "", "publish", "replace", default: "")
  --new-app-cmd-id <id>         stream/app ID that --new-app-cmd acts on. Cannot be used with --new-app-cmd-name (default: "")
  --new-app-cmd-name <name>     stream/app name that --new-app-cmd acts on. Cannot be used with --new-app-cmd-id (default: "")
  --force                       force delete and replace operations to proceed without asking for confirmation
  -h, --help                    display help for command
```

### Example: Scramble fields, keep new app in My Work

```text
.\ctrl-q.exe qseow field-scramble `
--host pro2-win1.lab.ptarmiganlabs.net `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--auth-user-dir LAB `
--auth-user-id goran `
--field-name Expression1 Dim1 AsciiAlpha `
--new-app-name __ScrambledTest1
```

```text
2024-11-29T07:05:33.564Z info: -----------------------------------------------------------
2024-11-29T07:05:33.567Z info: | Ctrl-Q
2024-11-29T07:05:33.567Z info: |
2024-11-29T07:05:33.568Z info: | Version      : 4.3.0
2024-11-29T07:05:33.568Z info: | Log level    : info
2024-11-29T07:05:33.569Z info: |
2024-11-29T07:05:33.569Z info: | Command      : field-scramble
2024-11-29T07:05:33.570Z info: |              : scramble one or more fields in an app. A new app with the scrambled data is created.
2024-11-29T07:05:33.570Z info: |
2024-11-29T07:05:33.570Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-29T07:05:33.573Z info: |
2024-11-29T07:05:33.573Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-29T07:05:33.573Z info: ----------------------------------------------------------
2024-11-29T07:05:33.573Z info:
2024-11-29T07:05:34.697Z info: Scrambled field "Expression1"
2024-11-29T07:05:34.709Z info: Scrambled field "Dim1"
2024-11-29T07:05:34.717Z info: Scrambled field "AsciiAlpha"
2024-11-29T07:05:35.231Z info: Scrambled data written to new app "__ScrambledTest1" with app ID: eb4a2985-316a-4490-b27e-06eaf3bdf229
```

### Example: Scramble fields, publish new app to stream

```text
.\ctrl-q.exe qseow field-scramble `
--host pro2-win1.lab.ptarmiganlabs.net `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--auth-user-dir LAB `
--auth-user-id goran `
--field-name Expression1 Dim1 AsciiAlpha `
--new-app-name __ScrambledTest1 `
--new-app-cmd publish `
--new-app-cmd-name "Ctrl-Q demo apps"
```

```text
2024-11-29T07:08:59.931Z info: -----------------------------------------------------------
2024-11-29T07:08:59.934Z info: | Ctrl-Q
2024-11-29T07:08:59.934Z info: |
2024-11-29T07:08:59.935Z info: | Version      : 4.3.0
2024-11-29T07:08:59.935Z info: | Log level    : info
2024-11-29T07:08:59.936Z info: |
2024-11-29T07:08:59.936Z info: | Command      : field-scramble
2024-11-29T07:08:59.937Z info: |              : scramble one or more fields in an app. A new app with the scrambled data is created.
2024-11-29T07:08:59.937Z info: |
2024-11-29T07:08:59.937Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-29T07:08:59.940Z info: |
2024-11-29T07:08:59.940Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-29T07:08:59.940Z info: ----------------------------------------------------------
2024-11-29T07:08:59.940Z info:
2024-11-29T07:09:00.667Z info: Scrambled field "Expression1"
2024-11-29T07:09:00.674Z info: Scrambled field "Dim1"
2024-11-29T07:09:00.681Z info: Scrambled field "AsciiAlpha"
2024-11-29T07:09:02.731Z info: Scrambled data written to new app "__ScrambledTest1" with app ID: 23baa119-c9ad-4e2c-974e-7318b111ff1d
2024-11-29T07:09:03.954Z info: Published new app "__ScrambledTest1" with app ID: 23baa119-c9ad-4e2c-974e-7318b111ff1d to stream "Ctrl-Q demo apps"
```

### Example: Scramble fields, replace existing published app

Note:

- Just as in the QMC when doing a publish-replace, the source app of the replace (=the new, scrambled app in this case) will not be deleted. To avoid having a dangling app in My Work the `--new-app-delete` option is used to delete the newly created, scrambled after after the replace is done.
- Here `--new-app-cmd-id` is used to uniquely specify which app should be replaced. The app ID is the same as reported by previous Ctrl-Q example above.
- If some kind of destructive operation is done, Ctrl-Q will ask for confirmation first. In this example there are two:
  - Replacing the existing, already published app.
  - Deleting the newly created, scrambled app.
- To avoid confirmation prompts (e.g. when running unattended in an external program task or Powershell script) there is a `--force` option. Specifying it will remove the confirmation prompts.

```text
.\ctrl-q.exe qseow field-scramble `
--host pro2-win1.lab.ptarmiganlabs.net `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--auth-user-dir LAB `
--auth-user-id goran `
--field-name Expression1 Dim1 AsciiAlpha `
--new-app-name __ScrambledTest1 `
--new-app-cmd replace `
--new-app-cmd-id "23baa119-c9ad-4e2c-974e-7318b111ff1d" `
--new-app-delete
```

```text
2024-11-29T07:15:28.881Z info: -----------------------------------------------------------
2024-11-29T07:15:28.884Z info: | Ctrl-Q
2024-11-29T07:15:28.884Z info: |
2024-11-29T07:15:28.885Z info: | Version      : 4.3.0
2024-11-29T07:15:28.885Z info: | Log level    : info
2024-11-29T07:15:28.886Z info: |
2024-11-29T07:15:28.887Z info: | Command      : field-scramble
2024-11-29T07:15:28.887Z info: |              : scramble one or more fields in an app. A new app with the scrambled data is created.
2024-11-29T07:15:28.887Z info: |
2024-11-29T07:15:28.888Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-29T07:15:28.890Z info: |
2024-11-29T07:15:28.890Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-29T07:15:28.890Z info: ----------------------------------------------------------
2024-11-29T07:15:28.891Z info:
2024-11-29T07:15:29.665Z info: Scrambled field "Expression1"
2024-11-29T07:15:29.673Z info: Scrambled field "Dim1"
2024-11-29T07:15:29.680Z info: Scrambled field "AsciiAlpha"
2024-11-29T07:15:30.160Z info: Scrambled data written to new app "__ScrambledTest1" with app ID: dbfa9c53-56c0-4645-af2f-e7665d902469
Do you want to replace the existing app with app ID 23baa119-c9ad-4e2c-974e-7318b111ff1d with the new, scrambled app? (y/n) y
2024-11-29T07:15:33.598Z info: Replaced existing app "23baa119-c9ad-4e2c-974e-7318b111ff1d" with new, scrambled app "__ScrambledTest1" (app ID: dbfa9c53-56c0-4645-af2f-e7665d902469)
Do you want to delete the new, scrambled app "__ScrambledTest1" with app ID dbfa9c53-56c0-4645-af2f-e7665d902469? (y/n) y
2024-11-29T07:15:38.604Z info: Deleted new, scrambled app "__ScrambledTest1" with app ID dbfa9c53-56c0-4645-af2f-e7665d902469
```
