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

- [Get script](#get-script)

---

## Get script

Get script and associated metadata for a Sense app.

```powershell
.\ctrl-q.exe script-get `
--host 192.168.100.109 `
--app-id a3e0f5d2-000a-464f-998d-33d333b175d7 `
--auth-user-dir LAB `
--auth-user-id goran
```

```text
2023-11-19T19:22:59.746Z info: -----------------------------------------------------------
2023-11-19T19:22:59.746Z info: | Ctrl-Q
2023-11-19T19:22:59.746Z info: |
2023-11-19T19:22:59.746Z info: | Version      : 3.14.0
2023-11-19T19:22:59.746Z info: | Log level    : info
2023-11-19T19:22:59.746Z info: |
2023-11-19T19:22:59.746Z info: | Command      : script-get
2023-11-19T19:22:59.746Z info: |              : get script from Qlik Sense app
2023-11-19T19:22:59.746Z info: |
2023-11-19T19:22:59.746Z info: | Run Ctrl-Q with the '--help' option to see a list of all available options for this command.
2023-11-19T19:22:59.746Z info: |
2023-11-19T19:22:59.746Z info: | https://github.com/ptarmiganlabs/ctrl-q
2023-11-19T19:22:59.746Z info: ----------------------------------------------------------
2023-11-19T19:22:59.746Z info:
2023-11-19T19:23:00.229Z info: ----- Script metadata -----
2023-11-19T19:23:00.229Z info: App id: a3e0f5d2-000a-464f-998d-33d333b175d7
2023-11-19T19:23:00.229Z info: Created date: 2021-06-03T22:04:52.283Z
2023-11-19T19:23:00.229Z info: Modified date: 2023-05-05T06:17:05.456Z
2023-11-19T19:23:00.229Z info: ----- End script metadata -----
2023-11-19T19:23:00.229Z info:
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
