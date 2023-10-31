---
title: Authentication with Sense
description: >
    Authentication with Qlik Sense.
tags: [security]
weight: 20
---

## Certificates

Ctrl-Q will authenticate with Sense using certificates.  
These certificates are [exported from the QMC](https://help.qlik.com/en-US/sense-admin/May2023/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/export-certificates.htm) and stored on disk in PEM format.

Ctrl-Q can reference these certificates in two ways:

1. if the `--auth-cert-file` and `auth-cert-key-file` options are used, Ctrl-Q will read the certificates from the disk files pointed to by those options.
   1. The `--auth-root-cert-file` option refers to the certificate CA, and is optional to use. In most cases it's not needed.
2. If the options above are _not_ specified when Ctrl-Q is started, it will look for certificates in the `config` folder in the same folder as the Ctrl-Q executable. The certificate files must be named `client.pem`, `client_key.pem` and `root.pem`.

The options `--auth-user-dir` and `-auth-user-id` are also needed to authenticate with Sense. They define which user will be used when interacting with both the engine and repository APIs.
