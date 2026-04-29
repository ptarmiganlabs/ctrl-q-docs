---
layout: home

hero:
  name: Ctrl-Q
  text: Manage your Qlik Sense environment like a pro
  tagline: Automate tedious, repetitive, and error-prone Qlik Sense administration tasks from the command line. Works with both client-managed Qlik Sense and Qlik Sense Cloud.
  image:
    src: /logo/ctrl-q-transp.png
    alt: Ctrl-Q logo
  actions:
    - theme: brand
      text: Documentation
      link: /docs/
    - theme: alt
      text: Download
      link: https://github.com/ptarmiganlabs/ctrl-q/releases/latest
    - theme: alt
      text: Discussion Forum
      link: https://github.com/ptarmiganlabs/ctrl-q/discussions

features:
  - icon: 🕸️
    title: Reload Task Automation
    details: Export task definitions, create reload tasks from Excel or CSV files, and inspect dependencies as network diagrams, trees, tables, or JSON.
    link: /docs/command/qseow/task/
  - icon: 📦
    title: App Import and Export
    details: Import QVF files, create associated reload tasks, and export apps from client-managed Qlik Sense environments.
    link: /docs/command/qseow/import/app/
  - icon: 🔖
    title: Master Items and Bookmarks
    details: List, delete, and import master dimensions, measures, and bookmarks across Sense apps.
    link: /docs/command/qseow/import/master-item/
  - icon: 📝
    title: Variables and Scripts
    details: Inspect app variables and retrieve app load scripts from the command line.
    link: /docs/command/qseow/variable/
  - icon: 🎭
    title: Field Scrambling
    details: Create anonymized demo apps by scrambling selected fields and optionally publishing or replacing apps.
    link: /docs/command/qseow/scramble-field/
  - icon: ☁️
    title: Cloud and Client-Managed
    details: Test connectivity to both Qlik Sense Enterprise on Windows and Qlik Sense Cloud.
    link: /docs/command/
  - icon: 🔍
    title: App Metadata Extraction
    details: Extract load scripts, sheets, master items, variables and data model info from Sense apps. Optionally produce intel QVDs ready for analysis in Qlik.
    link: /docs/command/qseow/app-metadata/
  - icon: 👥
    title: User Activity Buckets
    details: Bucket users by how long ago they last logged in to Qlik Sense, and tag them with custom properties for follow-up.
    link: /docs/command/qseow/user-activity-buckets/
  - icon: 🔐
    title: Proxy Sessions
    details: List and delete active proxy sessions on one or more virtual proxies.
    link: /docs/command/qseow/session/
  - icon: 🌍
    title: Cross-Platform
    details: Runs on Windows, Linux and Mac OS. Pre-built binaries available for all platforms — no Node.js installation required.
    link: /docs/getting-started/
  - icon: 🚀
    title: Latest Release v4.5
    details: New app-metadata-get command extracts rich app metadata to JSON or QVD. Task network visualization gains filtering, circular chain detection, duplicate trigger warnings, and a node info modal.
    link: /docs/command/qseow/app-metadata/
  - icon: 💝
    title: Free and Open Source
    details: Ctrl-Q is an open source project, using the MIT license. All source code, documentation and releases are available at no cost.
    link: https://github.com/ptarmiganlabs/ctrl-q
---
