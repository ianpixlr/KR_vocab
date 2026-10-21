# KR_vocab

A single-file Korean vocabulary app. It runs in the browser: study words with spaced repetition, read graded stories, import CSV or JSON, and keep the deck in sync with a published spreadsheet.

**Live app:** https://ianpixlr.github.io/KR_vocab/

## CSV format

One header row, then one word per row:

`id, korean, hanja, pos, meaning_en, example_ko, example_en, notes, related, unit, tags, date_added`

Only `korean` and `meaning_en` are required. Separate multiple tags with `;` (for example `daily life;home`).

A sample sheet is in [`templates/vocab-template.csv`](templates/vocab-template.csv). The same fields as JSON are in [`templates/vocab-template.json`](templates/vocab-template.json), where `tags` is an array.

## Sync from a Google Sheet

1. Put the words in a Google Sheet with the columns above, including the header row.
2. In Sheets, choose **File → Share → Publish to web**.
3. Choose **Entire document** and **Comma-separated values (.csv)**, then publish it. Publishing the whole document lets one link load both the vocabulary sheet and the Stories tab.
4. Copy the link. It looks like `https://docs.google.com/spreadsheets/d/e/…/pub?output=csv`.
5. In the app, open **Settings → Sync**, paste the link, and press **Save & Sync now**.

Each time you open the app, and whenever you press **Save & Sync now**, new rows are merged in. Existing study progress stays, and blank cells leave stored fields unchanged. A raw CSV or JSON URL (including a GitHub raw file) works the same way.

## Stories

The **Stories** tab has 16 graded stories in 4 stages. Each story is shown in Korean first. English stays hidden behind a toggle, then there is a comprehension check, plus the new words and grammar.

The **Quiz** tab has a Words / Stories switch. Story Quiz runs in Korean only.

Stories live on the Google Sheet’s **Stories** tab (gid `1019870171`). Columns:

`story_id, stage, order, theme, format, title_ko, title_en, type, speaker, ko, en, word_ref, notes, qtype`

Row `type` is one of `meta`, `line`, `vocab`, `grammar`, or `question`. Question `qtype` is one of `tf`, `mcq`, `who`, `order`, `blank`, or `short`.

One sync link does both. Publish the spreadsheet to the web as the **entire document**. The app takes the vocabulary sync link and swaps in `gid=1019870171` to fetch the Stories tab. The 16 built-in stories are also in [`templates/stories-starter.csv`](templates/stories-starter.csv) and [`templates/stories-starter.json`](templates/stories-starter.json).
