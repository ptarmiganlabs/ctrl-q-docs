---
title: User activity buckets
description: >
    User activity buckets are custom properties that indicate how long ago users last logged into Qlik Sense.
weight: 1200
tags: [user, license, custom-property]
---

*Page contents:*

- [Overview](#overview)
  - [The different steps of the command](#the-different-steps-of-the-command)
- [Syntax](#syntax)
- [Example](#example)

---

## Overview

User activity buckets are custom properties that indicate how long ago users last logged into Qlik Sense. The `qseow user-activity-bucket-cp-create` command creates a custom property if it doesn't already exists and populates it with values ("activity buckets") indicating how long ago users last logged into Sense.

There are several options available to customize the behavior of the command, such as the name of the custom property, the activity buckets to be defined, the user directories whose users will be updated with activity info, and the license types to consider when calculating user activity.

The command can be run in dry-run mode to see what would be done without actually creating or updating anything.

The command has default values for most options, making it easy to run without specifying any options. The default values can be overridden by specifying the desired values as command line options.

### The different steps of the command

1. **Create custom property for tracking user activity in QMC**
   - Retrieve all custom properties from QSEoW.
   - Create the custom property if it doesn't already exist.
   - The `--force` option can be used to forcibly overwrite and replace the custom property and its values if the custom property already exists.
2. **Getting user activity for each license type enabled via the command line**
   - Retrieve user activity records for each license type enabled via the command line.
   - The command supports the following license types: `analyzer`, `analyzer-time`, `login`, `professional`, `user`
3. **Calculate days since last activity for each user**
4. **Get user data from Sense, one batch at a time (each batch is 25 users)**
   - Retrieve user data from Sense in batches of 25 users (default batch size).
   - The `--update-batch-size` option can be used to specify the number of users to update in each batch when writing user activity info back into Sense. Valid values are 1-25.
   - The `--update-batch-sleep` option can be used to specify how long to wait before continuing after each batch of users has been updated in Sense. 0 = no wait.
5. **Update user activity custom property in Qlik Sense**
    - Write activity data for each user back into Sense.
    - The command will update the custom property in batches of 25 users (default batch size).
    - The `--update-user-sleep` option can be used to specify how long to wait after updating each user in the Qlik Sense repository. 0 = no wait.

## Syntax

```text
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow user-activity-bucket-cp-create --help
Usage: ctrl-q qseow user-activity-bucket-cp-create [options]

create custom property and populate it with values ("activity buckets") indicating how long ago users last logged into Sense

Options:
  --log-level <level>                    log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                          Qlik Sense server IP/FQDN
  --port <port>                          Qlik Sense repository API port (default: "4242")
  --virtual-proxy <prefix>               Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>                  https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>            user directory for user to connect with (default: "Internal")
  --auth-user-id <userid>                user ID for user to connect with (default: "sa_repository")
  -a, --auth-type <type>                 authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>                Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>            Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>           Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --jwt <JWT>                            JSON Web Token (JWT) to use for authenticating with Qlik Sense (default: "")
  --user-directory <name...>             name of user directories whose users will be updated with activity info (default: "")
  --license-type <name...>               license type(s) to consider when calculating user activity. Default is all license types. (choices: "analyzer", "analyzer-time", "login", "professional", "user", default:
                                         ["analyzer","analyzer-time","login","professional","user"])
  --custom-property-name <name>          name of custom property that will hold user activity buckets
  --force                                forcibly overwrite and replace custom property and its values if the custom property already exists
  --activity-buckets <buckets...>        custom property values/user activity buckets to be defined. A comma or space separated list of numbers, representing days since last login. (default:
                                         ["1","7","14","30","90","180","365"])
  --update-batch-size <number of users>  number of users to update in each batch when writing user activity info back into Sense. Valid values are 1-25. (default: 25)
  --update-batch-sleep <seconds>         Wait this long before continuing after each batch of users has been updated in Sense. 0 = no wait. (default: 3)
  --update-user-sleep <milliseconds>     Wait this long after updating each user in the Qlik Sense repository. 0 = no wait. (default: 500)
  --dry-run                              do a dry run, i.e. do not create or update anything - just show what would be done
  -h, --help                             display help for command
```

## Example

```text
.\ctrl-q.exe qseow user-activity-bucket-cp-create `
    --host pro2-win1.lab.ptarmiganlabs.net `
    --custom-property-name User_Activity_Bucket
```

```text
2024-11-15T17:28:03.548Z info: -----------------------------------------------------------
2024-11-15T17:28:03.551Z info: | Ctrl-Q
2024-11-15T17:28:03.551Z info: |
2024-11-15T17:28:03.551Z info: | Version      : 4.0.0
2024-11-15T17:28:03.551Z info: | Log level    : info
2024-11-15T17:28:03.551Z info: |
2024-11-15T17:28:03.551Z info: | Command      : user-activity-bucket-cp-create
2024-11-15T17:28:03.553Z info: |              : create custom property and populate it with values ("activity buckets") indicating how long ago users last logged into Sense
2024-11-15T17:28:03.553Z info: |
2024-11-15T17:28:03.553Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T17:28:03.553Z info: |
2024-11-15T17:28:03.553Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T17:28:03.553Z info: ----------------------------------------------------------
2024-11-15T17:28:03.553Z info:
2024-11-15T17:28:03.557Z info: == Step 1: Create custom property for tracking user activity in QMC
2024-11-15T17:28:03.791Z info:   Successfully retrieved 36 custom properties from QSEoW
2024-11-15T17:28:03.895Z info: Successfully created custom property "User_Activity_Bucket"
2024-11-15T17:28:03.985Z info:
2024-11-15T17:28:03.985Z info: == Step 2 : Getting user activity for each license type enabled via the command line...
2024-11-15T17:28:04.150Z info:   Successfully retrieved 20 user activity records for license type "Analyzer" from QSEoW
2024-11-15T17:28:04.266Z info:   Successfully retrieved 0 user activity records for license type "Analyzer Time" from QSEoW
2024-11-15T17:28:04.385Z info:   Successfully retrieved 0 user activity records for license type "Login" from QSEoW
2024-11-15T17:28:04.565Z info:   Successfully retrieved 20 user activity records for license type "Professional" from QSEoW
2024-11-15T17:28:04.718Z info:   Successfully retrieved 0 user activity records for license type "User" from QSEoW
2024-11-15T17:28:04.719Z info:
2024-11-15T17:28:04.719Z info: == Step 3 : Calculate days since last activity for each user...
2024-11-15T17:28:04.719Z info:
2024-11-15T17:28:04.721Z info: == Step 4 : Get user data from Sense, one batch at a time (each batch is 25 users)...
2024-11-15T17:28:04.721Z info:   Total number of users to process: 40
2024-11-15T17:28:04.721Z info:   Total number of batches: 2
2024-11-15T17:28:04.721Z info:
2024-11-15T17:28:04.721Z info:   >> Batch 1 of 2 (users 1 to 25)
2024-11-15T17:28:04.721Z info:      Calculating activity buckets
2024-11-15T17:28:04.952Z info:      Preparing user activity custom property
2024-11-15T17:28:04.952Z info:      Pausing 3 seconds before next batch...
2024-11-15T17:28:07.954Z info:
2024-11-15T17:28:07.954Z info:   >> Batch 2 of 2 (users 26 to 50)
2024-11-15T17:28:07.954Z info:      Calculating activity buckets
2024-11-15T17:28:08.164Z info:      Preparing user activity custom property
2024-11-15T17:28:08.164Z info:      Pausing 3 seconds before next batch...
2024-11-15T17:28:11.166Z info:
2024-11-15T17:28:11.166Z info: Done calculating activity buckets for all users. Proceeding to update user activity custom property in Qlik Sense.
2024-11-15T17:28:11.166Z info:
2024-11-15T17:28:11.166Z info: == Step 5 : Update user activity custom property in Qlik Sense.
2024-11-15T17:28:11.166Z info:   Number of batches to process: 2 of 25 users each.
2024-11-15T17:28:11.166Z info:   Storing activity buckets for batch 1 of 2 in Sense repository.
2024-11-15T17:28:11.395Z info:     Updated user 1 of 40, "LAB\testuser_40" in batch 1 of 2
2024-11-15T17:28:12.093Z info:     Updated user 2 of 40, "LAB\testuser_34" in batch 1 of 2
2024-11-15T17:28:12.809Z info:     Updated user 3 of 40, "LAB\testuser_25" in batch 1 of 2
2024-11-15T17:28:13.521Z info:     Updated user 4 of 40, "LAB\testuser_38" in batch 1 of 2
2024-11-15T17:28:14.289Z info:     Updated user 5 of 40, "LAB\testuser_17" in batch 1 of 2
2024-11-15T17:28:15.046Z info:     Updated user 6 of 40, "LAB\testuser_10" in batch 1 of 2
2024-11-15T17:28:15.769Z info:     Updated user 7 of 40, "LAB\testuser_20" in batch 1 of 2
2024-11-15T17:28:16.477Z info:     Updated user 8 of 40, "LAB\testuser_12" in batch 1 of 2
2024-11-15T17:28:17.318Z info:     Updated user 9 of 40, "LAB\testuser_1" in batch 1 of 2
2024-11-15T17:28:18.027Z info:     Updated user 10 of 40, "LAB\testuser_32" in batch 1 of 2
2024-11-15T17:28:18.720Z info:     Updated user 11 of 40, "LAB\testuser_28" in batch 1 of 2
2024-11-15T17:28:19.412Z info:     Updated user 12 of 40, "LAB\testuser_23" in batch 1 of 2
2024-11-15T17:28:20.103Z info:     Updated user 13 of 40, "LAB\testuser_33" in batch 1 of 2
2024-11-15T17:28:20.814Z info:     Updated user 14 of 40, "LAB\testuser_37" in batch 1 of 2
2024-11-15T17:28:21.515Z info:     Updated user 15 of 40, "LAB\testuser_21" in batch 1 of 2
2024-11-15T17:28:22.230Z info:     Updated user 16 of 40, "LAB\testuser_39" in batch 1 of 2
2024-11-15T17:28:22.929Z info:     Updated user 17 of 40, "LAB\testuser_35" in batch 1 of 2
2024-11-15T17:28:23.636Z info:     Updated user 18 of 40, "LAB\testuser_36" in batch 1 of 2
2024-11-15T17:28:24.371Z info:     Updated user 19 of 40, "LAB\testuser_29" in batch 1 of 2
2024-11-15T17:28:25.247Z info:     Updated user 20 of 40, "LAB\testuser_30" in batch 1 of 2
2024-11-15T17:28:26.168Z info:     Updated user 21 of 40, "LAB\testuser_24" in batch 1 of 2
2024-11-15T17:28:27.017Z info:     Updated user 22 of 40, "LAB\testuser_31" in batch 1 of 2
2024-11-15T17:28:27.916Z info:     Updated user 23 of 40, "LAB\testuser_22" in batch 1 of 2
2024-11-15T17:28:28.789Z info:     Updated user 24 of 40, "LAB\testuser_26" in batch 1 of 2
2024-11-15T17:28:29.690Z info:     Updated user 25 of 40, "LAB\testuser_27" in batch 1 of 2
2024-11-15T17:28:30.197Z info:   Storing activity buckets for batch 2 of 2 in Sense repository.
2024-11-15T17:28:30.642Z info:     Updated user 26 of 40, "LAB\testuser_7" in batch 2 of 2
2024-11-15T17:28:31.565Z info:     Updated user 27 of 40, "LAB\testuser_19" in batch 2 of 2
2024-11-15T17:28:32.466Z info:     Updated user 28 of 40, "LAB\testuser_11" in batch 2 of 2
2024-11-15T17:28:33.316Z info:     Updated user 29 of 40, "LAB\testuser_2" in batch 2 of 2
2024-11-15T17:28:34.229Z info:     Updated user 30 of 40, "LAB\testuser_4" in batch 2 of 2
2024-11-15T17:28:35.118Z info:     Updated user 31 of 40, "LAB\testuser_9" in batch 2 of 2
2024-11-15T17:28:35.923Z info:     Updated user 32 of 40, "LAB\testuser_6" in batch 2 of 2
2024-11-15T17:28:36.817Z info:     Updated user 33 of 40, "LAB\testuser_14" in batch 2 of 2
2024-11-15T17:28:37.817Z info:     Updated user 34 of 40, "LAB\goran" in batch 2 of 2
2024-11-15T17:28:38.717Z info:     Updated user 35 of 40, "LAB\testuser_15" in batch 2 of 2
2024-11-15T17:28:39.716Z info:     Updated user 36 of 40, "LAB\testuser_16" in batch 2 of 2
2024-11-15T17:28:40.617Z info:     Updated user 37 of 40, "LAB\testuser_3" in batch 2 of 2
2024-11-15T17:28:41.471Z info:     Updated user 38 of 40, "LAB\testuser_18" in batch 2 of 2
2024-11-15T17:28:42.318Z info:     Updated user 39 of 40, "LAB\testuser_8" in batch 2 of 2
2024-11-15T17:28:43.218Z info:     Updated user 40 of 40, "LAB\testuser_13" in batch 2 of 2
2024-11-15T17:28:43.733Z info:
2024-11-15T17:28:43.733Z info: Done updating user activity custom property in Qlik Sense.
```
