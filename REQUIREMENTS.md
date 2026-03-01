# WhitePandas — Requirements

A team standup icebreaker generator. One button, one question, every week.

---

## How It Works

- Single page app with a **Generate** button
- Each click produces a new random question from the pool
- Smart randomisation — avoids repeating the same question too soon (deprioritise recently shown questions)
- Users can **add their own custom questions** via a simple input form
- No categories — one unified question pool

---

## Question Pool

Located in `questions/questions.md` — 25 questions across:
- Work & Wins
- Food & Home
- Fun & Hypotheticals
- Personal
- Work Culture

---

## Visual Style

Follows the **RedPandas Brand Guidelines** (`Branding/brand-tokens.md`).

### Colours
- Background: White `#FFFFFF`
- Question card background: Beige `#FCE9E8`
- Primary text: Charcoal `#222222`
- Primary button: RP Red `#E1241B` → hover: Charcoal `#222222`
- Card shadow: Hard Beige `#FCE9E8`, offset 45%, no blur, 4pt size

### Typography
- Headings: Recoleta Bold (fallback: Cooper Black)
- Body / UI text: Glacial Indifference (fallback: Arial)
- Button text: uppercase, letter-spacing 50%
- Subheadings / meta: letter-spacing 25%

### UI Rules
- **Cards:** sharp corners (no border-radius)
- **Buttons:** pill shape (fully rounded)
- **Borders:** grey, used to separate same-colour elements
- **Hard shadow** on question card (Beige, no blur)
- Icons: Font Awesome Sharp Solid style where used

---

## Layout

1. **Header** — "WhitePandas" label + app title
2. **Question card** — displays current question (sharp corners, beige bg, hard shadow)
3. **Generate button** — RP Red pill button, uppercase white text
4. **Add your own** — simple text input + submit to add a custom question to the pool
5. **Footer hint** — "Don't love it? Generate another."

---

## Custom Questions

- Simple text input field below the generate button
- On submit: adds question to the in-session pool
- Custom questions are included in the randomisation pool immediately

---

## Smart Randomisation Logic

- Track the last 5 questions shown
- Never repeat a question that's in the recent history
- Once all questions have been shown, reset and start fresh

---

## Out of Scope (for now)

- Persistent storage / database (custom questions reset on page refresh)
- User accounts
- Sharing / exporting questions
- Category filtering
