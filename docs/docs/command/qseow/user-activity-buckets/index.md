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

- **Step 1: Create custom property for tracking user activity in QMC**
  - Retrieve all custom properties from QSEoW.
  - Create the custom property if it doesn't already exist.
  - The `--force` option can be used to forcibly overwrite and replace the custom property and its values if the custom property already exists. Only needed if the custom property already exists and has choice values that differ from the ones passed in via the command line.
- **Step 2: Getting user activity for each license type enabled via the command line**
  - Retrieve user activity records for each license type enabled via the command line.
  - The command supports the following license types: `analyzer`, `analyzer-time`, `login`, `professional`, `user`
- **Step 3: Calculate days since last activity for each user**
- **Step 4: Get user data from Sense, one batch at a time**
  - Batching is done to avoid overloading the Sense repository API.
  - The `--update-batch-size` option can be used to specify batch size. Valid values are 1-25.
  - The `--update-batch-sleep` option can be used to specify how long to wait before continuing after each batch of users has been updated in Sense. 0 = no wait.
- **Step 5: Update user activity custom property in Qlik Sense**
  - Write activity data for each user back into Sense.
  - The command will update the custom property in batches of 25 users (default batch size).
  - The `--update-user-sleep` option can be used to specify how long to wait after updating each user in the Qlik Sense repository, i.e. within the batch. 0 = no wait.

Note that step 5 may take a while to complete on a large system with many users.

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

In this example the largest bucket is set to 14 days, meaning that users who have logged in more than 14 days ago will be placed in a bucket called `14+`.

The command will create a custom property named `User_Activity_Bucket` and populate it with values indicating how long ago users last logged into Sense.

The `--force` option is used to forcibly overwrite and replace the custom property and its values if the custom property already exists. This is only needed if the custom property already exists and has choice values that differ from the ones passed in via the command line.

```text
.\ctrl-q.exe qseow user-activity-bucket-cp-create `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --custom-property-name User_Activity_Bucket `
  --activity-buckets 1 7 14 `
  --force
```

```text
2024-11-19T06:11:52.344Z info: -----------------------------------------------------------
2024-11-19T06:11:52.344Z info: | Ctrl-Q
2024-11-19T06:11:52.344Z info: |
2024-11-19T06:11:52.344Z info: | Version      : 4.1.0
2024-11-19T06:11:52.344Z info: | Log level    : info
2024-11-19T06:11:52.344Z info: |
2024-11-19T06:11:52.344Z info: | Command      : user-activity-bucket-cp-create
2024-11-19T06:11:52.344Z info: |              : create custom property and populate it with values ("activity buckets") indicating how long ago users last logged into Sense
2024-11-19T06:11:52.344Z info: |
2024-11-19T06:11:52.344Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-19T06:11:52.344Z info: |
2024-11-19T06:11:52.344Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-19T06:11:52.344Z info: ----------------------------------------------------------
2024-11-19T06:11:52.344Z info:
2024-11-19T06:11:52.359Z info: == Step 1: Create custom property for tracking user activity in QMC
2024-11-19T06:11:52.719Z info:   Successfully retrieved 38 custom properties from QSEoW
2024-11-19T06:11:54.032Z info: Successfully updated custom property "User_Activity_Bucket"
2024-11-19T06:11:54.188Z info:
2024-11-19T06:11:54.188Z info: == Step 2 : Getting user activity for each license type enabled via the command line...
2024-11-19T06:11:54.344Z info:   Successfully retrieved 20 user activity records for license type "Analyzer" from QSEoW
2024-11-19T06:11:54.485Z info:   Successfully retrieved 0 user activity records for license type "Analyzer Time" from QSEoW
2024-11-19T06:11:54.641Z info:   Successfully retrieved 0 user activity records for license type "Login" from QSEoW
2024-11-19T06:11:54.797Z info:   Successfully retrieved 20 user activity records for license type "Professional" from QSEoW
2024-11-19T06:11:54.969Z info:   Successfully retrieved 0 user activity records for license type "User" from QSEoW
2024-11-19T06:11:54.969Z info:
2024-11-19T06:11:54.969Z info: == Step 3 : Calculate days since last activity for each user...
2024-11-19T06:11:54.969Z info:
2024-11-19T06:11:54.969Z info: == Step 4 : Get user data from Sense, one batch at a time (each batch is 25 users)...
2024-11-19T06:11:54.969Z info:   Total number of users to process: 40
2024-11-19T06:11:54.969Z info:   Total number of batches: 2
2024-11-19T06:11:54.969Z info:
2024-11-19T06:11:54.969Z info:   >> Batch 1 of 2 (users 1 to 25)
2024-11-19T06:11:54.969Z info:      Calculating activity buckets
2024-11-19T06:11:55.266Z info:      Preparing user activity custom property
2024-11-19T06:11:55.266Z info:      Pausing 3 seconds before next batch...
2024-11-19T06:11:58.292Z info:
2024-11-19T06:11:58.292Z info:   >> Batch 2 of 2 (users 26 to 50)
2024-11-19T06:11:58.292Z info:      Calculating activity buckets
2024-11-19T06:11:58.558Z info:      Preparing user activity custom property
2024-11-19T06:11:58.558Z info:      Pausing 3 seconds before next batch...
2024-11-19T06:12:01.584Z info:
2024-11-19T06:12:01.584Z info: Done calculating activity buckets for all users. Proceeding to update user activity custom property in Qlik Sense.
2024-11-19T06:12:01.584Z info:
2024-11-19T06:12:01.584Z info: == Step 5 : Update user activity custom property in Qlik Sense.
2024-11-19T06:12:01.584Z info:   Number of batches to process: 2 of 25 users each.
2024-11-19T06:12:01.584Z info:   Storing activity buckets for batch 1 of 2 in Sense repository.
2024-11-19T06:12:01.896Z info:     Updated user 1 of 40, "LAB\testuser_40" in batch 1 of 2
2024-11-19T06:12:03.334Z info:     Updated user 2 of 40, "LAB\testuser_34" in batch 1 of 2
2024-11-19T06:12:04.147Z info:     Updated user 3 of 40, "LAB\testuser_25" in batch 1 of 2
2024-11-19T06:12:04.943Z info:     Updated user 4 of 40, "LAB\testuser_38" in batch 1 of 2
2024-11-19T06:12:05.772Z info:     Updated user 5 of 40, "LAB\testuser_29" in batch 1 of 2
2024-11-19T06:12:06.569Z info:     Updated user 6 of 40, "LAB\testuser_30" in batch 1 of 2
2024-11-19T06:12:07.443Z info:     Updated user 7 of 40, "LAB\testuser_24" in batch 1 of 2
2024-11-19T06:12:08.241Z info:     Updated user 8 of 40, "LAB\testuser_31" in batch 1 of 2
2024-11-19T06:12:09.053Z info:     Updated user 9 of 40, "LAB\testuser_32" in batch 1 of 2
2024-11-19T06:12:09.943Z info:     Updated user 10 of 40, "LAB\testuser_8" in batch 1 of 2
2024-11-19T06:12:10.819Z info:     Updated user 11 of 40, "LAB\testuser_17" in batch 1 of 2
2024-11-19T06:12:11.787Z info:     Updated user 12 of 40, "LAB\testuser_10" in batch 1 of 2
2024-11-19T06:12:12.740Z info:     Updated user 13 of 40, "LAB\testuser_7" in batch 1 of 2
2024-11-19T06:12:13.865Z info:     Updated user 14 of 40, "LAB\testuser_19" in batch 1 of 2
2024-11-19T06:12:14.803Z info:     Updated user 15 of 40, "LAB\testuser_28" in batch 1 of 2
2024-11-19T06:12:15.771Z info:     Updated user 16 of 40, "LAB\testuser_23" in batch 1 of 2
2024-11-19T06:12:16.715Z info:     Updated user 17 of 40, "LAB\testuser_33" in batch 1 of 2
2024-11-19T06:12:17.663Z info:     Updated user 18 of 40, "LAB\testuser_37" in batch 1 of 2
2024-11-19T06:12:18.665Z info:     Updated user 19 of 40, "LAB\testuser_21" in batch 1 of 2
2024-11-19T06:12:19.665Z info:     Updated user 20 of 40, "LAB\testuser_39" in batch 1 of 2
2024-11-19T06:12:20.664Z info:     Updated user 21 of 40, "LAB\testuser_35" in batch 1 of 2
2024-11-19T06:12:21.765Z info:     Updated user 22 of 40, "LAB\testuser_36" in batch 1 of 2
2024-11-19T06:12:22.757Z info:     Updated user 23 of 40, "LAB\testuser_22" in batch 1 of 2
2024-11-19T06:12:23.710Z info:     Updated user 24 of 40, "LAB\testuser_26" in batch 1 of 2
2024-11-19T06:12:24.641Z info:     Updated user 25 of 40, "LAB\testuser_27" in batch 1 of 2
2024-11-19T06:12:25.158Z info:   Storing activity buckets for batch 2 of 2 in Sense repository.
2024-11-19T06:12:25.610Z info:     Updated user 26 of 40, "LAB\testuser_11" in batch 2 of 2
2024-11-19T06:12:26.516Z info:     Updated user 27 of 40, "LAB\testuser_2" in batch 2 of 2
2024-11-19T06:12:27.532Z info:     Updated user 28 of 40, "LAB\testuser_20" in batch 2 of 2
2024-11-19T06:12:28.815Z info:     Updated user 29 of 40, "LAB\goran" in batch 2 of 2
2024-11-19T06:12:29.938Z info:     Updated user 30 of 40, "LAB\testuser_12" in batch 2 of 2
2024-11-19T06:12:31.032Z info:     Updated user 31 of 40, "LAB\testuser_1" in batch 2 of 2
2024-11-19T06:12:32.115Z info:     Updated user 32 of 40, "LAB\testuser_4" in batch 2 of 2
2024-11-19T06:12:33.079Z info:     Updated user 33 of 40, "LAB\testuser_15" in batch 2 of 2
2024-11-19T06:12:34.017Z info:     Updated user 34 of 40, "LAB\testuser_16" in batch 2 of 2
2024-11-19T06:12:35.063Z info:     Updated user 35 of 40, "LAB\testuser_3" in batch 2 of 2
2024-11-19T06:12:36.094Z info:     Updated user 36 of 40, "LAB\testuser_18" in batch 2 of 2
2024-11-19T06:12:37.236Z info:     Updated user 37 of 40, "LAB\testuser_9" in batch 2 of 2
2024-11-19T06:12:38.266Z info:     Updated user 38 of 40, "LAB\testuser_6" in batch 2 of 2
2024-11-19T06:12:39.267Z info:     Updated user 39 of 40, "LAB\testuser_14" in batch 2 of 2
2024-11-19T06:12:40.282Z info:     Updated user 40 of 40, "LAB\testuser_13" in batch 2 of 2
2024-11-19T06:12:40.798Z info:
2024-11-19T06:12:40.798Z info: Done updating user activity custom property in Qlik Sense.
```

In this screeshot from the QMC we can see the custom property `User_Activity_Bucket` for some users.  
A couple of the users have been active during the last day, while have been inactive for more than 14 days. 

![User activity buckets in QMC](/img/ctrl-q_user-activity-bucket_qmc-1.png)
