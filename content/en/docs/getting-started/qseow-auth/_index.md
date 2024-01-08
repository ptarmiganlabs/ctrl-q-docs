---
title: Authentication with Sense
description: >
    Authentication with client-managed Qlik Sense Enterprise can be done in two ways: certificates and JWTs. 
tags: [security]
weight: 20
---

## Certificates

If the `--auth-type` option is set to `cert`, Ctrl-Q will authenticate with Qlik Sense Enterprise using certificates.  
This is the default authentication method that will be used if no `--auth-type` option is specified.

These certificates are [exported from the QMC](https://help.qlik.com/en-US/sense-admin/May2023/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/export-certificates.htm) and stored on disk in PEM format.

Ctrl-Q can reference these certificates in two ways:

1. if the `--auth-cert-file` and `auth-cert-key-file` options are used, Ctrl-Q will read the certificates from the disk files pointed to by those options.
   1. The `--auth-root-cert-file` option refers to the certificate CA, and is optional to use. In most cases it's not needed.
2. If the options above are _not_ specified when Ctrl-Q is started, it will look for certificates in the `config` folder in the same folder as the Ctrl-Q executable. The certificate files must be named `client.pem`, `client_key.pem` and `root.pem`.

The options `--auth-user-dir` and `-auth-user-id` are also needed to authenticate with Sense. They define which user will be used when interacting with both the engine and repository APIs.

## JWTs

If the `--auth-type` option is set to `jwt`, Ctrl-Q will authenticate with Qlik Sense Enterprise using JWTs.

JWTs - JSON Web Tokens - are a standard way of authenticating with web services, where a token is issued by an authentication service and then used to authenticate with other services.  
JWTs contain a number of claims, including the user ID, which is used to identify the user.

{{% alert title="💡 Remember" color="primary" %}}
JWTs are essentially full credentials in a single file.  
I.e. anyone with a JWT can authenticate with Sense as the user that the JWT was issued for.

Treat JWTs as you would any other credentials (e.g. passwords etc).
{{% /alert %}}

When Ctrl-Q is started with `--auth-type` option set to `jwt`, it will then look for an option called `--auth-jwt`.  
Pass in the JWT as the value of this option, and Ctrl-Q will use it to authenticate with Sense.  
Embed the JWT in double quotes if it contains special characters (e.g. spaces).
