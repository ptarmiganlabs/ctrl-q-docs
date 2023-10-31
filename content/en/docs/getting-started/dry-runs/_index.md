---
title: Dry runs
description: >
    Dry-runs are a good idea
tags: []
weight: 50
---

Many of Ctrl-Q's commands will create, update or delete things in Sense.  
As long as you have specified the correct parameters that's all good - but there is also the risk of using incorrect parameters or filters, causing too many (or too few or the wrong ones) resources in Sense to be affected.

Most Ctrl-Q commands that change things in Sense have a `--dry-run` option.  
If it is used, Ctrl-Q will not make any changes in Sense, but instead only show what _would_ happen.

It's thus a _very_ good idea to first do a dry run of the intended command, verify that the correct things would happen and then finally do a real execution of the desired Ctrl-Q command.

Might take a bit of extra time, but better safe than sorry.
