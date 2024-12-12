<div align="center">

# CRUGG's aniSearch Utils

| Available in English | Verfügbar auf Deutsch |
|----------------------|-----------------------|

  <a href="https://github.com/OfficialCRUGG/anisearch-utils/blob/main/README.de.md">Readme auf Deutsch</a>
</div>

CRUGG's aniSearch Utils (aSutils for short) is a browser extension that adds various (toggleable) features to aniSearch, mainly intended for *power users*[^1].

> [!NOTE]
> CRUGG's aniSearch Utils is not affiliated with or endorsed by aniSearch. This is a third-party extension.

## Contents

- [Installation](#installation)
  - [Web Store](#web-store)
  - [Manual](#manual)
    - [Chrome](#chrome)
    - [Edge, Opera, Opera GX, Brave, Vivaldi, Chromium](#edge-opera-opera-gx-brave-vivaldi-chromium)
    - [Firefox](#firefox)
- [Modules](#modules)
  - [Anime Page](#anime-page)
  - [Input](#input)
  - [Extras (External Sites)](#extras-external-sites)

## Installation

### Web Store

Not available yet

### Manual

Download the latest release from the [releases page](https://github.com/OfficialCRUGG/anisearch-utils/releases) and follow the instructions for your browser below.

#### Chrome

Open `chrome://extensions` and enable "Developer mode" in the top right corner. Then, drag and drop the downloaded zip into the window.

#### Edge, Opera, Opera GX, Brave, Vivaldi, Chromium

Since these browsers are based on Chromium, the process should be the same as for Chrome.

#### Firefox

Not supported yet. Will get this to work very soon hopefully. Firefox is just a little bit extra on some things.

## Modules

### Anime Page

- **Link to Mau2**: Adds a button that leads to the search page for the respective anime on Mau2, a japanese website for voice actor information.
- **Link to Mau2 (Google Translate)**: Same as above, just that this time, the link goes through Google Translate. Not needed when using the Translator module for Mau2 under "Extras (External Sites)"

### Input

- **Colorful Buttons**: Makes the "Replace" buttons orange and the "Reset" buttons red for any list-like sections of the input page. Made to avoid accidental misclicks.

### Extras (External Sites)

These modules don't apply to aniSearch itself, but to other, external websites. These are primarily websites that are important in the information gathering process for adding data to aniSearch.

- **Translator (mau2.com)**: adds a button to the top of each voice actor list on Mau2 that when clicked, adds the romaji and english forms below. Courtesy of RomajiDesu and Google Translate. This can take a bit, but all translations are saved in a local dictionary, so when any of these names appear again, they will be displayed instantly. Also, please note that this module is extremely experimental and may have some problems.[^2]

[^1]: Wikipedia defines a "power user" as: "a user [...] who uses advanced features of [...] websites which are not used by the average user. A power user might not have extensive technical knowledge of the systems they use but is rather characterized by competence or desire to make the most intensive use of computer programs or systems.

[^2]: The Mau2 Translator modules relies on the APIs of RomajiDesu and Google Translate, which have some limitations. If you use the feature a lot, either of the two services may temporarily block your IP from accessing their services. This is not the end of the world, but means you'll have to wait for a bit (in my experience, between 5 and 30 minutes) until you can use them again. Please note that you'd face the same limitations when using these services directly, just with the module you're way quicker and therefore could potentially reach the limit faster. Also, please note that the local dictionary takes up some disk space. You can see the amount used on the extension popup or settings at the bottom. If this ever goes above 20MB, please contact me.
