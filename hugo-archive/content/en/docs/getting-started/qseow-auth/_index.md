---
title: Authenticating with Sense
description: >
    How authentication is done varies slightly between client-managed Qlik Sense and Qlik Sense Cloud.
tags: [security]
weight: 20
---

## Client-managed Qlik Sense on Windows

When connecting to a client-managed Qlik Sense Enterprise on Windows (QSEoW) instance, the following auth options are available:

- Certificates
- JWTs

Both are described below.

### Certificates

If the `--auth-type` option is set to `cert`, Ctrl-Q will authenticate with Qlik Sense Enterprise using certificates.  
This is the default authentication method that will be used if no `--auth-type` option is specified.

These certificates are [exported from the QMC](https://help.qlik.com/en-US/sense-admin/May2023/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/export-certificates.htm) and stored on disk in PEM format.

Three certificate files are needed (export these from the QMC):

1. The client certificate, which is used to authenticate with the Sense engine.
2. The client key, which is used to authenticate with the Sense engine.
3. The root certificate, which is needed to verify the Sense server's certificate (as Qlik Sense uses a self-signed certificate).

Ctrl-Q can reference these certificates in two ways:

1. if one or more of the `--auth-cert-file`, `auth-cert-key-file` and `--auth-root-cert-file` options are used, Ctrl-Q will read the certificates from the disk file(s) pointed to by those options.
2. If one or more of the options above are _not_ specified when Ctrl-Q is started, it will look for certificates in the `config` folder in the same folder as the Ctrl-Q executable. 
   1. The certificate files must then be named `client.pem`, `client_key.pem` and `root.pem`, i.e. the names used by the QMC when exporting the certificates.

The options `--auth-user-dir` and `-auth-user-id` are also needed to authenticate with Sense.  
They define which user will be used when interacting with both the engine and repository APIs.

#### Strict or relaxed certificate validation

When using certificate authentication, Ctrl-Q will by default validate the Sense server's certificate.  
This happens as the default value for the `--secure` option is `true`.

What does "validate the certificate" mean?

Validating a certificate means that Ctrl-Q will check that the certificate is signed by a trusted authority, that it has not expired, and that the server's hostname matches the certificate's common name.

For example, if the certificate is created for a host called `pro2-win1.lab.ptarmiganlabs.net`, Ctrl-Q will - by verifying the server certificate - check that the server it is connecting to is indeed `pro2-win1.lab.ptarmiganlabs.net`.  
If the server's hostname does not match the certificate's common name, Ctrl-Q will refuse to connect.  
Looks like this:

```powershell
.\ctrl-q.exe qseow connection-test `
  --host pro2-win1.ptarmiganlabs.net `
  --auth-user-dir LAB `
  --auth-user-id goran
```

Output:

```powershell
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow connection-test `
>>   --host pro2-win1.ptarmiganlabs.net `
>>   --auth-user-dir LAB `
>>   --auth-user-id goran
2024-11-15T13:13:06.029Z info: -----------------------------------------------------------
2024-11-15T13:13:06.032Z info: | Ctrl-Q
2024-11-15T13:13:06.033Z info: |
2024-11-15T13:13:06.033Z info: | Version      : 4.0.0
2024-11-15T13:13:06.033Z info: | Log level    : info
2024-11-15T13:13:06.034Z info: |
2024-11-15T13:13:06.034Z info: | Command      : connection-test
2024-11-15T13:13:06.034Z info: |              : test connection to Qlik Sense server.
2024-11-15T13:13:06.034Z info: |
2024-11-15T13:13:06.035Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T13:13:06.035Z info: |
2024-11-15T13:13:06.035Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T13:13:06.035Z info: ----------------------------------------------------------
2024-11-15T13:13:06.035Z info:
2024-11-15T13:13:06.038Z info: Testing connection to Qlik Sense server pro2-win1.ptarmiganlabs.net on port 4242
2024-11-15T13:13:06.644Z error: GET ABOUT INFO: Error: Hostname/IP does not match certificate's altnames: Host: pro2-win1.ptarmiganlabs.net. is not in the cert's altnames: DNS:pro2-win1.lab.ptarmiganlabs.net
...
```

Ctrl-Q tells us that something is not right with the certificate and we even get a pretty clear message about what is wrong.

Changing the command to use the correct hostname makes the error go away and the command works as expected:

```powershell
.\ctrl-q.exe qseow connection-test `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --auth-user-dir LAB `
  --auth-user-id goran
```

```powershell
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow connection-test `
>>   --host pro2-win1.lab.ptarmiganlabs.net `
>>   --auth-user-dir LAB `
>>   --auth-user-id goran
2024-11-15T13:15:13.204Z info: -----------------------------------------------------------
2024-11-15T13:15:13.207Z info: | Ctrl-Q
2024-11-15T13:15:13.207Z info: |
2024-11-15T13:15:13.207Z info: | Version      : 4.0.0
2024-11-15T13:15:13.209Z info: | Log level    : info
2024-11-15T13:15:13.209Z info: |
2024-11-15T13:15:13.209Z info: | Command      : connection-test
2024-11-15T13:15:13.210Z info: |              : test connection to Qlik Sense server.
2024-11-15T13:15:13.210Z info: |
2024-11-15T13:15:13.211Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T13:15:13.211Z info: |
2024-11-15T13:15:13.211Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T13:15:13.211Z info: ----------------------------------------------------------
2024-11-15T13:15:13.211Z info:
2024-11-15T13:15:13.215Z info: Testing connection to Qlik Sense server pro2-win1.lab.ptarmiganlabs.net on port 4242
2024-11-15T13:15:13.642Z info: Successfully connected to Qlik Sense server pro2-win1.lab.ptarmiganlabs.net on port 4242
2024-11-15T13:15:13.643Z info: Qlik Sense repository build version: 31.43.0.0
2024-11-15T13:15:13.643Z info: Qlik Sense repository build date: 4/12/2024 18:12:20 PM
```

All this said, if you are having trouble getting Ctrl-Q to connect to Sense, you can use the `--secure false` option to disable certificate validation.
Not preferred from a security perspective, but it can still be useful if you are having trouble getting Ctrl-Q to authenticate with Sense.

#### Ports used for certificate authentication

When using certificate authentication, Ctrl-Q will connect directly to the various Qlik Sense services on the port exposed by each service:

- Qlik Repository Service (QRS) on port 4242
- Qlik Proxy Service (QPS) on port 4243
- Qlik Engine Service (QES) on port 4747

If the default ports are not used, each Ctrl-Q command allows you to specify the port to use for each Sense service via command line options.

### JWTs

If the `--auth-type` option is set to `jwt`, Ctrl-Q will authenticate with Qlik Sense Enterprise using JWTs.

JWTs - JSON Web Tokens - are a standardised way of authenticating with web services, where a token is issued by an authentication service and then used to authenticate with other services.

JWTs contain a number of claims, including the user ID, which is used to identify the user.  
JWTs can also include an expiry timestamp, which is used to limit the time the JWT is valid.

{{% alert title="💡 Remember" color="primary" %}}
JWTs are essentially full credentials in a single file.  
I.e. anyone with a JWT can authenticate with Sense as the user that the JWT was issued to.

Treat JWTs as you would any other credentials (e.g. passwords etc).
{{% /alert %}}

When Ctrl-Q is started with `--auth-type` option set to `jwt`, it will then look for an option called `--auth-jwt`.  
Pass in the JWT as the value of this option, and Ctrl-Q will use it to authenticate with Sense.  
Embed the JWT in double quotes if it contains special characters (e.g. spaces).

#### Ports used for JWT authentication

Given the nature of JWT authentication and the fact that it is handled on a virtual proxy level, Ctrl-Q cannot connect directly to the Qlik Sense services when using JWT authentication.  
Instead all access must go via a virtual proxy that is configured to use JWT authentication.

This in turn means that Ctrl-Q will need to use whatever port the virtual proxy is configured to use.  
Usually this is port 443, but it can be any port, as configured in the proxy linked to the virtual proxy.  

**Remember to specify the correct port when using JWT authentication, using the `--port` (might be called `--proxy-port` or similar in some Ctrl-Q commands) option.**

## Qlik Sense Cloud

When connecting to Qlik Sense Cloud, the following auth options are available:

- API key

### API key

When connecting to Qlik Sense Cloud, Ctrl-Q can authenticate using API keys.  
These are created in QS Cloud and can be set to have different expiration dates,

Set the `--auth-type` option to `apikey` and the `--apikey` option to the API key.  
Or leave it out, as `apikey` is the default value for the `--auth-type` option.

Full help for the ` qscloud connection-test` command:

```powershell
PS C:\tools\ctrl-q> .\ctrl-q.exe qscloud connection-test --help
Usage: ctrl-q qscloud connection-test [options]

test connection to Qlik Sense Cloud.

Options:
  --log-level <level>     log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --tenant-host <host>    Host of Qlik Sense cloud tenant. Example: "tenant.eu.qlikcloud.com"
  -a, --auth-type <type>  authentication type (choices: "apikey", default: "apikey")
  --apikey <key>          API key used to access the Sense APIs
  -h, --help              display help for command
```

Running the actual command looks like this:

```powershell
.\ctrl-q.exe qscloud connection-test `
  --tenant-host sometenant.eu.qlikcloud.com `
  --apikey "eyJhb...
```

```powershell
PS C:\tools\ctrl-q> .\ctrl-q.exe qscloud connection-test `
>>   --tenant-host sometenant.eu.qlikcloud.com `
>>   --apikey "eyJhb..."
2024-11-15T13:32:07.662Z info: -----------------------------------------------------------
2024-11-15T13:32:07.667Z info: | Ctrl-Q
2024-11-15T13:32:07.669Z info: |
2024-11-15T13:32:07.669Z info: | Version      : 4.0.0
2024-11-15T13:32:07.670Z info: | Log level    : info
2024-11-15T13:32:07.670Z info: |
2024-11-15T13:32:07.670Z info: | Command      : connection-test
2024-11-15T13:32:07.670Z info: |              : test connection to Qlik Sense Cloud.
2024-11-15T13:32:07.670Z info: |
2024-11-15T13:32:07.672Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T13:32:07.672Z info: |
2024-11-15T13:32:07.672Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T13:32:07.672Z info: ----------------------------------------------------------
2024-11-15T13:32:07.672Z info:
2024-11-15T13:32:07.674Z info: Testing connection to Qlik Sense Cloud tenant "sometenant.eu.qlikcloud.com"
2024-11-15T13:32:09.461Z info: Successfully connected to Qlik Sense Cloud tenant "sometenant.eu.qlikcloud.com"
2024-11-15T13:32:09.462Z info: Tenant ID  : ....
2024-11-15T13:32:09.462Z info: User ID    : ....
2024-11-15T13:32:09.462Z info: User name  : Göran Sander
2024-11-15T13:32:09.462Z info: User email : goran@ptarmiganlabs.com
2024-11-15T13:32:09.462Z info: User status: active
```
