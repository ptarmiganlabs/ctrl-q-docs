---
title: App scripts
description: >
    Manage Qlik Sense app scripts
weight: 10
tags: [script]
---

<!-- {{% pageinfo %}} 
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

*Page contents:*

- [Get app script](#get-app-script)
  - [Syntax](#syntax)
  - [Example](#example)

---

## Get app script

Get script and associated metadata for a Sense app.

### Syntax

```plaintext
PS C:\tools\ctrl-q> .\ctrl-q.exe qseow script-get --help
Usage: ctrl-q qseow script-get [options]

get script from Qlik Sense app

Options:
  --log-level <level>               log level (choices: "error", "warn", "info", "verbose", "debug", "silly", default: "info")
  --host <host>                     Qlik Sense server IP/FQDN
  --port <port>                     Qlik Sense server engine port (usually 4747 for cert auth, 443 for jwt auth) (default: "4747")
  --schema-version <string>         Qlik Sense engine schema version (default: "12.612.0")
  --app-id <id>                     Qlik Sense app ID
  --open-without-data <true|false>  open app without data (choices: "true", "false", default: "true")
  --virtual-proxy <prefix>          Qlik Sense virtual proxy prefix (default: "")
  --secure <true|false>             https connection to Qlik Sense must use correct certificate. Invalid certificates will result in rejected/failed connection. (default: true)
  --auth-user-dir <directory>       user directory for user to connect with
  --auth-user-id <userid>           user ID for user to connect with
  -a, --auth-type <type>            authentication type (choices: "cert", "jwt", default: "cert")
  --auth-cert-file <file>           Qlik Sense certificate file (exported from QMC) (default: "./cert/client.pem")
  --auth-cert-key-file <file>       Qlik Sense certificate key file (exported from QMC) (default: "./cert/client_key.pem")
  --auth-root-cert-file <file>      Qlik Sense root certificate file (exported from QMC) (default: "./cert/root.pem")
  --auth-jwt <jwt>                  JSON Web Token (JWT) to use for authentication with Qlik Sense server
  -h, --help                        display help for command
```

### Example

```powershell
.\ctrl-q.exe qseow script-get `
  --host pro2-win1.lab.ptarmiganlabs.net `
  --app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
  --auth-user-dir LAB `
  --auth-user-id goran
```

```text
2024-11-15T14:21:19.066Z info: -----------------------------------------------------------
2024-11-15T14:21:19.070Z info: | Ctrl-Q
2024-11-15T14:21:19.071Z info: |
2024-11-15T14:21:19.071Z info: | Version      : 4.0.0
2024-11-15T14:21:19.071Z info: | Log level    : info
2024-11-15T14:21:19.071Z info: |
2024-11-15T14:21:19.071Z info: | Command      : script-get
2024-11-15T14:21:19.071Z info: |              : get script from Qlik Sense app
2024-11-15T14:21:19.071Z info: |
2024-11-15T14:21:19.073Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2024-11-15T14:21:19.073Z info: |
2024-11-15T14:21:19.073Z info: | https://github.com/ptarmiganlabs/ctrl-q
2024-11-15T14:21:19.073Z info: ----------------------------------------------------------
2024-11-15T14:21:19.073Z info:
2024-11-15T14:21:20.137Z info: ----- Script metadata -----
2024-11-15T14:21:20.137Z info: App id: a3e0f5d2-000a-464f-998d-33d333b175d7
2024-11-15T14:21:20.137Z info: Created date: 2021-06-03T22:04:52.283Z
2024-11-15T14:21:20.138Z info: Modified date: 2024-03-20T08:02:25.153Z
2024-11-15T14:21:20.138Z info: ----- End script metadata -----
///$tab Main
SET ThousandSep=',';
SET DecimalSep='.';
SET MoneyThousandSep=',';
SET MoneyDecimalSep='.';
SET MoneyFormat='$#,##0.00;-$#,##0.00';
SET TimeFormat='h:mm:ss TT';
SET DateFormat='M/D/YYYY';
SET TimestampFormat='M/D/YYYY h:mm:ss[.fff] TT';
SET FirstWeekDay=6;
SET BrokenWeeks=1;
SET ReferenceDay=0;
SET FirstMonthOfYear=1;
SET CollationLocale='en-US';
SET CreateSearchIndexOnReload=1;
SET MonthNames='Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec';
SET LongMonthNames='January;February;March;April;May;June;July;August;September;October;November;December';
SET DayNames='Mon;Tue;Wed;Thu;Fri;Sat;Sun';
SET LongDayNames='Monday;Tuesday;Wednesday;Thursday;Friday;Saturday;Sunday';
SET NumericalAbbreviation='3:k;6:M;9:G;12:T;15:P;18:E;21:Z;24:Y;-3:m;-6:μ;-9:n;-12:p;-15:f;-18:a;-21:z;-24:y';

Characters:
Load Chr(RecNo()+Ord('A')-1) as Alpha, RecNo() as Num autogenerate 26;

ASCII:
Load
 if(RecNo()>=65 and RecNo()<=90,RecNo()-64) as Num,
 Chr(RecNo()) as AsciiAlpha,
 RecNo() as AsciiNum
autogenerate 255
 Where (RecNo()>=32 and RecNo()<=126) or RecNo()>=160 ;

Transactions:
Load
 TransLineID,
 TransID,
 mod(TransID,26)+1 as Num,
 Pick(Ceil(3*Rand1),'A','B','C') as Dim1,
 Pick(Ceil(6*Rand1),'a','b','c','d','e','f') as Dim2,
 Pick(Ceil(3*Rand()),'X','Y','Z') as Dim3,
 Round(1000*Rand()*Rand()*Rand1) as Expression1,
 Round(  10*Rand()*Rand()*Rand1) as Expression2,
 Round(Rand()*Rand1,0.00001) as Expression3;
Load
 Rand() as Rand1,
 IterNo() as TransLineID,
 RecNo() as TransID
Autogenerate 1000
 While Rand()<=0.5 or IterNo()=1;

 Comment Field Dim1 With "This is a field comment";



let var1 = 'This is variable 1';
let var2 = 1234;


// Dummy country data.
// Courtesty of Bing AI chat "please give me an inline qlik sense table with countries in it"
LOAD * INLINE [
Country, Population
Afghanistan, 38,928,346
Albania, 2,877,797
Algeria, 43,851,044
Andorra, 77,265
Angola, 32,866,272
];
```
