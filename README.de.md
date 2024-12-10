<div align="center">

# aniSearch Helfer

| Available in English | Verfügbar auf Deutsch |
|----------------------|-----------------------|

  <a href="https://github.com/OfficialCRUGG/anisearch-utils/blob/main/README.md">Readme in English</a>
</div>

aniSearch Helfer (kurz aSutils oder aSu; vom englischen Namen "aniSearch Utils") ist eine Browserweiterung, die verschiedene (einzeln aktivierbare) Funktionen zu aniSearch hinzufügt, die hauptsächlich für *Power-User*[^1] gedacht sind.

> [!NOTE]
> Der aniSearch Helfer steht in keinerlei Verbindung zu aniSearch. Es handelt sich hierbei um eine Browsererweiterung eines Drittanbieters.

## Inhaltsverzeichnis

- [Installation](#installation)
  - [Web Store](#web-store)
  - [Manuell](#manuell)
    - [Chrome](#chrome)
    - [Edge, Opera, Opera GX, Brave, Vivaldi, Chromium](#edge-opera-opera-gx-brave-vivaldi-chromium)
    - [Firefox](#firefox)
- [Module](#module)
  - [Anime-Seite](#anime-seite)
  - [Eingabemaske](#eingabemaske)
  - [Extras (Externe Seiten)](#extras-externe-seiten)

## Installation

### Web Store

Noch nicht verfügbar

### Manuell

Lade die neueste Version von der [Releases-Seite](https://github.com/OfficialCRUGG/anisearch-utils/releases) herunter und folge den Anweisungen für deinen Browser im folgenden.

#### Chrome

Öffne `chrome://extensions` und aktiviere den "Entwicklermodus" oben rechts. Ziehe dann die heruntergeladene Zip in das Fenster.

#### Edge, Opera, Opera GX, Brave, Vivaldi, Chromium

Da diese Browser auf Chromium basieren, sollte der Prozess derselbe wie bei Chrome sein.

#### Firefox

Noch nicht unterstützt. Ich werde das hoffentlich sehr bald zum Laufen bekommen. Firefox ist leider ein bisschen speziell bei einigen Dingen.

## Module

### Visuelle Anpassungen

- **Volle Breite**: Lässt die Website die volle Breite des Bildschirms nutzen.

### Anime-Seite

- **Link zu Mau2**: Fügt einen Button hinzu, der zur Suchseite des jeweiligen Anime auf Mau 2 führt, einer japanischen Website für Informationen bezüglich Synchronsprechern.
- **Link zu Mau2 (Google Übersetzer)**: Dasselbe wie oben, nur dass der Link diesmal über den Google Übersetzer geht. Nicht nötig, wenn das Übersetzer-Modul für Mau2 unter "Extras (Externe Seiten)" verwendet wird.

### Eingabemaske

- **Farbige Buttons**: Macht die "Ersetzen"-Buttons orange und die "Zurücksetzen"-Buttons rot für alle listenartigen Abschnitte der Eingabemaske. Gemacht, um versehentliche Fehlklicks zu vermeiden.

### Extras (Externe Seiten)

Diese Module beziehen sich nicht auf aniSearch selbst, sondern auf andere, externe Websites. Diese sind hauptsächlich Websites, die im Informationsbeschaffungsprozess für das Hinzufügen von Daten zu aniSearch wichtig sind.

- **Übersetzer (mau2.com)**: Fügt oben bei jeder Sprecherliste auf Mau2 einen Button hinzu, der bei Klick die Romaji und englischen Formen der jeweiligen Einträge darunter anzeigt. Diese Daten stammen von RomajiDesu und Google Übersetzer. Dies kann etwas dauern, aber alle Übersetzungen werden in einem lokalen Wörterbuch ("Dictionary") gespeichert, sodass, wenn diese Namen erneut auftauchen, sie sofort angezeigt werden. Bitte beachte auch auch, dass dieses Modul extrem experimentell ist und einige Probleme haben kann.[^2]

[^1]: Wikipedia definiert einen "Power-User" als: "einen Benutzer [...], der erweiterte Funktionen von [...] Webseiten nutzt, die vom durchschnittlichen Benutzer nicht verwendet werden. Ein Power-User muss nicht unbedingt über umfangreiche technische Kentnisse der von ihm genutzen System verfügen, sondern zeichnet sich vielmehr durch Kompetenz oder den Wunsch aus, Computerprogramme oder -system intensiv und effektiv zu nutzen." (übersetzt aus dem Englischen)

[^2]: Das Mau2-Übersetzer-Modul verwendet die APIs von RomajiDesu und Google Übersetzer. Diese unterliegen einigen Begrenzungen. Wenn die Funktion auf kurze Zeit sehr oft genutzt wird, kann es sein, dass die Dienste vorübergehend deine IP-Adresse blockieren. Das ist kein Weltuntergang, bedeutet aber, dass du etwas warten musst, bist du die Dienste erneut nutzen kannst. (meiner Erfahrung nach dauert es zwischen 5 und 30 Minuten). Wichtig zu bedenken ist, dass beim manuellen Benutzen dieser Dienste die gleichen Begrenzungen vorliegen, nur dass man mit diesem Modul schneller ist und somit potenziell schneller das Limit erreichen kann. Außerdem wichtig zu wissen ist, dass das loakale Wörterbuch eine kleine Menge Speicherplatz beansprucht. Du kannst die verwendete Menge im Popup oder in den Einstellungen unten sehen. Sollte diese jemals über 20MB steigen, kontaktiere mich bitte.
