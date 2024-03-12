---
title: Colors & formatting
description: >
    Colors & formatting: Windows vs Windows Server vs macOS/Linux
tags: []
weight: 40
tags: [colors, formatting]
---

- [All OSs: plain text](#all-oss-plain-text)
- [Windows 10 using Windows Terminal](#windows-10-using-windows-terminal)
- [macOS and Linux](#macos-and-linux)

---

Some of the Ctrl-Q commands use colors and emojis to better communicate the information retrieved from Qlik Sense.  
The task tree view is an example, but more commands may use colors in the future.

The use of colors in console/command line applications has been around since at least the 80s.  
MS-DOS supported it, as did early Windows versions.

Today this feature is quite fragmented.

Console applications using colors are natively supported on macOS and Linux.  
On Windows Server 2016 and earlier it's _very_ hard to get this working, later versions may be easier.  
On Windows 10 and later it's possible to use Microsoft's excellent new command line shell, [Windows Terminal](https://github.com/microsoft/terminal).  
Highly recommended if you use a desktop Windows operating system!

Ctrl-Q tries to offer plain text visuals unless extra features, flare and color is enabled via command line parameters.

Some examples follow, showing different views of reload task trees.

## All OSs: plain text

The command for the most basic task tree is

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format tree `
--output-dest screen
```

![Qlik Sense task tree 1](/img/task-tree-no-color-1.png "Qlik Sense task tree with no colors or task details")

Add the `--tree-details` option and the result contains a lot more details for each task. Not very easy to read though.  
Note: the `task-get` command has lots of options, these are described in more detail on [this page](/docs/command/task/#list-tasks-as-tree).

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format tree `
--output-dest screen `
--tree-details
```

![Qlik Sense task tree 2](/img/task-tree-no-color-details-1.png "Qlik Sense task tree with task details but no colors")

## Windows 10 using Windows Terminal

Thanks to Windows Terminal handling text coloring and emojis we can add a couple of options:

- `--tree-icons` to get emojis showing the result from each task's last execution (success, fail etc)
- `--text-color yes` to get nicely colored text in the task tree

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format tree `
--output-dest screen `
--tree-icons `
--text-color yes
```

![Qlik Sense task tree 3](/img/task-tree-color-1.png "Qlik Sense task tree with colors but no task details")

Adding `--tree-details` gives us a tree that's a lot easier to read compared to previous, uncolored version.

```powershell
.\ctrl-q.exe task-get `
--auth-type cert `
--host pro2-win1.lab.ptarmiganlabs.net `
--auth-user-dir LAB `
--auth-user-id goran `
--output-format tree `
--output-dest screen `
--tree-icons `
--text-color yes `
--tree-details
```

![Qlik Sense task tree 4](/img/task-tree-color-details-1.png "Qlik Sense task tree with task details and colors")

## macOS and Linux

A task tree with colors on macOS and Linux versions of Ctrl-Q looks exactly like same as in Windows Terminal.  
The only difference is that you don't have to install a new command line shell.
