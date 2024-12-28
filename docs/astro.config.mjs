// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";

// https://astro.build/config
export default defineConfig({
  site: "https://asu.crg.sh",
  integrations: [
    starlight({
      title: {
        en: "CRUGG's aniSearch Utils",
        "de-DE": "CRUGG's aniSearch Helfer",
      },
      customCss: ["./src/styles/custom.css"],
      editLink: {
        baseUrl:
          "https://github.com/OfficialCRUGG/anisearch-utils/edit/main/docs/",
      },
      lastUpdated: true,
      pagination: false,
      credits: true,
      defaultLocale: "en",
      locales: {
        en: {
          label: "English",
        },
        de: {
          label: "Deutsch",
          lang: "de-DE",
        },
      },
      social: {
        github: "https://github.com/OfficialCRUGG/anisearch-utils",
      },
      plugins: [
        starlightSidebarTopics([
          {
            label: "Usage",
            icon: "open-book",
            link: "/",
            items: [
              {
                label: "General information",
                translations: {
                  "de-DE": "Allgemeine Informationen",
                },
                items: [
                  {
                    label: "About",
                    translations: {
                      "de-DE": "Über",
                    },
                    link: "/",
                  },
                  "installation",
                  "getting-started",
                  "changelog",
                ],
              },
              {
                label: "Modules",
                translations: {
                  "de-DE": "Module",
                },
                autogenerate: { directory: "modules" },
              },
            ],
          },
          {
            label: "Chrome Web Store",
            icon: "external",
            link: "https://chromewebstore.google.com/detail/cruggs-anisearch-utils/eanhcibbgmgechngeeihlkijakallpeb",
            badge: { text: "v1.0.0" },
          },
          {
            label: "Firefox Addons",
            icon: "external",
            link: "https://addons.mozilla.org/firefox/addon/cruggs-asu/",
            badge: { text: "v1.0.1" },
          },
        ]),
      ],
    }),
  ],
});
