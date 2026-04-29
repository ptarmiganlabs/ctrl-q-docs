import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

import { version as ctrlQVersion } from "./version.js";

const siteUrl = "https://ctrl-q.ptarmiganlabs.com";

export default withMermaid(
  defineConfig({
    title: "Ctrl-Q",
    description: "Ctrl-Q documentation",
    base: "/",
    lang: "en-US",
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: false,
    sitemap: {
      hostname: siteUrl,
    },
    transformPageData(pageData) {
      const canonicalUrl = `${siteUrl}${pageData.relativePath
        .replace(/\/index\.md$/, "/")
        .replace(/\.md$/, "")}`;

      pageData.frontmatter = pageData.frontmatter || {};
      pageData.frontmatter.head = pageData.frontmatter.head || [];
      pageData.frontmatter.head.push([
        "link",
        { rel: "canonical", href: canonicalUrl },
      ]);
    },
    head: [
      ["link", { rel: "icon", href: "/logo/ctrl-q.png" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:title", content: "Ctrl-Q Documentation" }],
      [
        "meta",
        {
          property: "og:description",
          content: "Manage your Qlik Sense environment like a pro.",
        },
      ],
      [
        "script",
        {
          defer: "",
          "data-domain": "ctrl-q.ptarmiganlabs.com",
          src: "https://plausible.io/js/script.file-downloads.outbound-links.js",
        },
      ],
      [
        "script",
        {},
        "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }",
      ],
    ],
    markdown: {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    themeConfig: {
      logo: "/logo/ctrl-q-transp.png",
      siteTitle: "Ctrl-Q",
      search: {
        provider: "local",
      },
      nav: [
        { text: "Docs", link: "/docs/" },
        { text: "About", link: "/about" },
        { text: "Community", link: "/community" },
        {
          text: ctrlQVersion,
          items: [
            {
              text: "Downloads",
              link: "https://github.com/ptarmiganlabs/ctrl-q/releases",
            },
            {
              text: "Issues",
              link: "https://github.com/ptarmiganlabs/ctrl-q/issues",
            },
            {
              text: "Discussions",
              link: "https://github.com/ptarmiganlabs/ctrl-q/discussions",
            },
            {
              text: "Ptarmigan Labs",
              link: "https://ptarmiganlabs.com",
            },
          ],
        },
      ],
      sidebar: {
        "/docs/": [
          {
            text: "Overview",
            collapsed: false,
            items: [
              { text: "Documentation", link: "/docs/" },
              { text: "What is Ctrl-Q?", link: "/docs/overview/" },
            ],
          },
          {
            text: "Getting Started",
            collapsed: false,
            items: [
              { text: "Overview", link: "/docs/getting-started/" },
              { text: "Security", link: "/docs/getting-started/security/" },
              {
                text: "Authenticating with Sense",
                link: "/docs/getting-started/qseow-auth/",
              },
              {
                text: "Colors and Formatting",
                link: "/docs/getting-started/colors-formatting/",
              },
              { text: "Dry Runs", link: "/docs/getting-started/dry-runs/" },
            ],
          },
          {
            text: "Commands",
            collapsed: false,
            items: [
              { text: "Overview", link: "/docs/command/" },
              {
                text: "Client-managed",
                link: "/docs/command/qseow/",
                collapsed: false,
                items: [
                  { text: "App Metadata", link: "/docs/command/qseow/app-metadata/" },
                  { text: "App Scripts", link: "/docs/command/qseow/app-script/" },
                  { text: "Bookmarks", link: "/docs/command/qseow/bookmark/" },
                  {
                    text: "Connection Test",
                    link: "/docs/command/qseow/connection-test/",
                  },
                  {
                    text: "Custom Properties",
                    link: "/docs/command/qseow/custom-property/",
                  },
                  { text: "Dimensions", link: "/docs/command/qseow/dimension/" },
                  { text: "Export", link: "/docs/command/qseow/export/" },
                  {
                    text: "Import",
                    link: "/docs/command/qseow/import/",
                    collapsed: false,
                    items: [
                      { text: "Apps", link: "/docs/command/qseow/import/app/" },
                      {
                        text: "Master Items",
                        link: "/docs/command/qseow/import/master-item/",
                      },
                      { text: "Tasks", link: "/docs/command/qseow/import/task/" },
                    ],
                  },
                  { text: "Measures", link: "/docs/command/qseow/measure/" },
                  {
                    text: "Scramble Fields",
                    link: "/docs/command/qseow/scramble-field/",
                  },
                  { text: "Sessions", link: "/docs/command/qseow/session/" },
                  { text: "Tasks", link: "/docs/command/qseow/task/" },
                  {
                    text: "User Activity Buckets",
                    link: "/docs/command/qseow/user-activity-buckets/",
                  },
                  { text: "Variables", link: "/docs/command/qseow/variable/" },
                  { text: "Version", link: "/docs/command/qseow/version/" },
                ],
              },
              {
                text: "Cloud",
                link: "/docs/command/qscloud/",
                items: [
                  {
                    text: "Connection Test",
                    link: "/docs/command/qscloud/connection-test/",
                  },
                ],
              },
            ],
          },
          {
            text: "Examples",
            collapsed: false,
            items: [
              { text: "Overview", link: "/docs/example/" },
              {
                text: "Task Definition File",
                link: "/docs/example/dissecting-task-definition-file/",
              },
            ],
          },
        ],
      },
      socialLinks: [
        { icon: "github", link: "https://github.com/ptarmiganlabs/ctrl-q" },
      ],
      editLink: {
        pattern: "https://github.com/ptarmiganlabs/ctrl-q-docs/edit/main/docs/:path",
        text: "Edit this page on GitHub",
      },
      footer: {
        message: "Released under the Apache-2.0 License.",
        copyright: "Copyright Ptarmigan Labs AB",
      },
    },
  })
);