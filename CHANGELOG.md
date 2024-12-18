# Changelog

## 1.0.1 [2024.12.18]

This update mainly does some minor changes for compliance with Firefox Extension Guidelines.

### General

- Fixed the 32x32 icon previously being 34x34
- No longer use .innerHTML
- Bump minimum Firefox version from 109 to 126

## 1.0.0 [2024.12.18]

### General

- The extension was renamed from "aniSearch Utils" to "CRUGG's aniSearch Utils" to avoid any possible confusion.
- Added Firefox Support
- Completely reworked user interface

### Modules

#### Full Width

- Removed module because similar functionality already exists from aniSearch.

#### Mau2 Translator

- Added a button that lets you compile all the separate episode tables into a singular table without duplicates and an "episodes" field

#### Mau2 Link

- Fixed the extraction of the Japanese name to search on Mau2

#### Keyboard Shortcuts

- Added this new module to make adding a lot of entries to a list (currently only episodes and voice actors) quicker.

## 0.2.0 [2024.12.10]

- Adds the "Full Width" module
- Fixes #1, causing the Mau2 Translator to not work on some anime cast pages (the pages grouped by Episodes)

## 0.1.0 [2024.12.09]

- Initial release
