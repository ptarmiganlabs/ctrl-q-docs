---
title: Overview
description: What is Ctrl-Q and how can I use it?
weight: 10
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## What is Ctrl-Q?

The focus of Ctrl-Q is on slightly more complex use cases that are not handled out of the box by other tools such as [Qlik's official Qlik CLI tool](https://qlik.dev/libraries-and-tools/qlik-cli) or [Adam Haydon's Qlik CLI Windows](https://github.com/ahaydon/Qlik-Cli-Windows) tool.

Both are exceptional tools and extremely useful, but especially when it comes to interactions with the Qlik Sense engine they fall a bit short.

Ctrl-Q also tries to fill niches that are not covered by the various members of the [Butler family](https://ptarmiganlabs.com/the-butler-family/) of open source SenseOps tools.

The Butler tools each focus on a specific feature (or features in the case of [the original Butler tool](https://github.com/ptarmiganlabs/butler)) and goes fairly deep in those areas.  
For example, [Butler SOS](https://github.com/ptarmiganlabs/butler-sos) focus on getting real-time metrics and events out of Sense and into a wide range of target databases and monitoring tools.  
[Butler Sheet Icons](https://github.com/ptarmiganlabs/butler-sheet-icons) creates sheet thumbnails for Sense apps - but offers lots of flexibility and power around that use case.

## Cloud and client-managed Sense

Ctrl-Q works with both client-managed Qlik Sense Enterprise on Windows and Qlik Sense Cloud.

Given Ctrl-Q's background in the client-managed world, most commands focus on that environment.  
Still, new use cases are added to Ctrl-Q with the cloud in mind, and over time it is expected that the number of cloud-specific features will grow.

## What can Ctrl-Q do for me?

Ctrl-Q focus on specific, high-value uses cases that tend to be very time consuming and/or error prone to do manually.

The list of features include:

- Get all current sessions, including user ID, virtual proxy, load balanced servers and more.
- Delete all or some sessions for a given virtual proxy / proxy service.
- Get complete definition of all reload tasks and external program tasks as tree view, network graph, tabular view or JSON. Show on screen or save to disk file.
- Bulk import of reload and external program tasks from disk files. Optionally also import QVF files.
- Build task chains using newly imported and/or existing tasks.
- All options available in the QMC (and then some!) can be defined.
- Bulk import of QVF files into Sense apps, including (re-)publishing of the apps.
- Update custom properties for multiple tasks.
- Import master dimensions and master measures from definitions in Excel file, including per dimension/measure colors.
- Show complete definitions for all master measures in a Sense app.
- Delete master measures from a Sense app.
- Show complete definitions for all master dimensions in a Sense app.
- Delete variables in one or more apps.
- List complete defintions for all variables in one or more apps.
- Delete master dimensions from a Sense app.
- Show complete definition of all bookmarks in a Sense app.
- Scramble fields in Sense apps.
- Get load script from Sense app.
- Create a custom property on all users and insert a value indicating how long it has been since the user last logged in. I.e. user activity buckets in a custom property.

As Ctrl-Q is completely command line driven it is very suitable to be used in CI/CD pipelines, with time savings, increased reusability and higher app quality as a result.

Maybe Qlik's CLI tool will evolve to include more of these use cases and engine-focused features too - great if so.  
Until then Ctrl-Q can hopefully make life a bit easier for Sense developers and admins out there.

## Where can I find out more?

There are several blog posts on [ptarmiganlabs.com](https://ptarmiganlabs.com/) where various Ctrl-Q features are examined in detail.  
Everything from short overviews of new features to very thorough, step-by-step instructions for how to use Ctrl-Q to solve some challenging Qlik Sense related task.

## Where should I go next?

- [Getting Started](/docs/getting-started/): Get started with Ctrl-Q
