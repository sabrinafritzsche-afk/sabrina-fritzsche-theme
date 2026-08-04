# Sabrina Fritzsche WordPress Theme

Custom bilingual editorial theme for [sabrinafritzsche.com](https://sabrinafritzsche.com).

## Updates

This repository is connected to WordPress through Git Updater. Theme releases are detected through the `Version` field in `style.css` on the `main` branch.

## Structure

The WordPress theme files live directly in the repository root. Do not place them inside another `sabrina-fritzsche` directory.

## Fortune Portal

Version 1.4 adds the unlisted Fortune Portal template.

1. Create a WordPress page with the slug `fortune`.
2. Select **Fortune Portal** under Page > Template.
3. Publish the page. It is kept out of navigation, automatic page lists, site search, REST page search and the WordPress page sitemap. The response sends `noindex`, `nofollow` and `noarchive` as both metadata and an HTTP header.

Anyone who knows the direct URL can open and share the page. It is unlisted, not password-protected or secret.

The calculation runs in the visitor's browser. Open-Meteo is used only to resolve the entered birthplace to coordinates and an IANA time zone; the birth date, time, first name, chart and reading are not posted to WordPress or stored by the theme.

Astrological defaults:

- tropical zodiac
- Hellenistic day/night formulas from Paulus Alexandrinus for Fortune, Spirit and Eros
- Whole Sign houses
- traditional sign rulers
- conjunctions within a 3° orb

The bundled Astronomy Engine 2.1.19 is MIT-licensed and is stored under `assets/vendor/` so the calculation does not depend on a third-party JavaScript CDN.
