# KR_vocab

A single-file Korean vocabulary flashcard app. It runs in the browser: study with spaced repetition, add words, import CSV or JSON, and keep the deck in sync with a published spreadsheet.

**Live app:** https://ianpixlr.github.io/KR_vocab/

## CSV format

One header row, then one word per row:

`id, korean, hanja, pos, meaning_en, example_ko, example_en, notes, related, unit, tags, date_added`

Only `korean` and `meaning_en` are required. Separate multiple tags with `;` (for example `daily life;home`).

A sample sheet is in [`templates/vocab-template.csv`](templates/vocab-template.csv). The same fields as JSON are in [`templates/vocab-template.json`](templates/vocab-template.json), where `tags` is an array.

## Sync from a Google Sheet

1. Put the words in a Google Sheet with the columns above, including the header row.
2. In Sheets, choose **File → Share → Publish to web**.
3. Select the sheet, choose **Comma-separated values (.csv)**, and publish it.
4. Copy the link. It looks like `https://docs.google.com/spreadsheets/d/e/…/pub?output=csv`.
5. In the app, open **Settings → Sync**, paste the link, and press **Save & Sync now**.

Each time you open the app, and whenever you press **Save & Sync now**, new rows are merged in. Existing study progress stays, and blank cells leave stored fields unchanged. A raw CSV or JSON URL (including a GitHub raw file) works the same way.
