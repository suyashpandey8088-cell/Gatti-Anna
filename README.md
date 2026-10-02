# RankLab

A polished, local-first recommendation analytics application covering ingestion, preparation, deterministic ranking, leakage-safe evaluation, and bias/coverage review.

## Stack

This repository contained no existing application or usable dataset (only the repository title). RankLab therefore uses **React + TypeScript + Vite**, a current, well-supported stack with fast local development and strong typing. Recharts provides accessible chart support; Vitest tests the recommendation engine.

## Data and assumptions

A clearly labeled sample CSV is bundled: **32 interactions, 8 users, 10 items**, dated January–March 2025. Fields are `user_id`, `item_id`, `rating`, `timestamp`, `category`, and `title`; there are no missing sample values. A user/item is the trimmed mapped identifier. An interaction is one mapped row after validation and user–item deduplication. Ratings ≥4 are positive. Latest event wins duplicate pairs. Timestamps use parseable date/time text. Category/title are display metadata, not ranking inputs. Users can load a CSV up to 5 MB and explicitly map its columns.

The personalized method finds other users sharing positive items with the selected user, then ranks unseen items by similar-user positive support. Popularity is the count of positive events. Item ID ascending resolves ties. The chronological evaluation uses the last event per eligible user for test, second-last for validation, and earlier events for training. Test is not used in ranking or model selection.

## Run

```bash
npm install
npm run dev
# open the URL printed by Vite
```

Production and tests:

```bash
npm run build
npm test
```

## Verification and limitations

Automated tests cover parsing/preparation, required mappings, missing IDs, duplicate handling, chronological split isolation, seen-item exclusion, ranking determinism, tie handling, and metric bounds. Build and tests were run before handoff. The sample supports the full flow. The UI is responsive at desktop/tablet/mobile breakpoints, keyboard controls have visible focus, chart metrics have a text definition/table equivalent, and status text does not rely only on color.

Known limitations: CSV parsing supports quoted values but not embedded newlines; processing is browser-memory based and capped at 5 MB; collaborative ranking is intentionally interpretable rather than production-scale; evaluation is unreliable on users with fewer than three events and excludes them from held-out scoring; no impression/availability data exists, so exposure and position bias cannot be directly measured; no user-group attributes are present, so group fairness is deliberately not inferred. Observed bias summaries are measurements or hypotheses, not causal findings.
