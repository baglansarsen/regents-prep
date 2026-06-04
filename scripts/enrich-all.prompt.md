# Prompt: Complete Humanities Enrichment & Flashcard Generation

**Goal:** Enrich all humanities exam questions (English, Global History, US History) with explanation + diveDeep, and generate a comprehensive humanities flashcard deck.

---

## Part 1: Question Enrichment

For each humanities subject (english, global-history, us-history), enrich every MC question missing `explanation` or `diveDeep`:

**Subject-Specific Context:**

### English (ELA)
- Test reading comprehension, literary analysis, rhetorical devices, grammar/mechanics.
- `explanation`: 1-2 sentences directly answering the question, explaining why the correct choice is right.
- `diveDeep`: 4-5 sentences covering:
  - The Regents reading skill tested (e.g., "inference," "main idea," "author's tone")
  - Why each wrong choice is incorrect (reference by letter: "Choice A is wrong because...")
  - Common student mistakes (e.g., confusing narrator with author, mistaking tone for mood)
  - Test-taking strategy (e.g., "Re-read the specific line cited to confirm meaning")

### Global History & Geography
- Test historical causation, document analysis, geographic concepts, cultural/political systems.
- `explanation`: 1-2 sentences stating the correct historical context/concept and why this choice fits.
- `diveDeep`: 4-5 sentences covering:
  - Broader historical period or geographic principle (name movements, empires, concepts)
  - Why each wrong choice is historically inaccurate (cite specific dates/events if they clash)
  - How to recognize similar patterns (e.g., "Document-based questions often pair primary sources with synthesis questions")
  - Key takeaway (e.g., "The Regents tests long-term consequences, not isolated events")

### US History
- Test American political institutions, constitutional concepts, social movements, economic/diplomatic history.
- `explanation`: 1-2 sentences explaining the historical/constitutional principle and why the correct answer fits.
- `diveDeep`: 4-5 sentences covering:
  - The historical period, key actors, and movements (e.g., "Jacksonian Democracy (1825–1850) expanded voting rights to white men...")
  - Why each wrong choice is historically wrong (cite dates/events if they reference different eras)
  - How to distinguish similar events (e.g., "Reconstruction era (1865–1877) ≠ Progressive Era (1900–1920)")
  - Test-taking hint (e.g., "Watch for date-based distractors")

**Enrichment Rules:**
- Non-destructive: only fill missing fields, never delete or reorder existing content.
- For written questions: skip (they already have `modelAnswer`).
- Preserve `topic`, `context`, `image` fields exactly as-is.
- Output enriched files to all three platforms:
  - `mobile/src/content/regents-exams/<subject>/<session>.js`
  - `shared/content/regents-exams/<subject>/<session>.js`
  - `src/data/regents-exams/<subject>/<session>.js`

---

## Part 2: Humanities Flashcards

Create a new `flashcards-humanities.js` file in each platform with vocabulary cards for humanities subjects.

**Structure:** Each card `{ id, term, definition, topic }` where topic is one of:
- `'english'`, `'english-literature'`, `'english-rhetoric'`
- `'global-history'`, `'world-cultures'`, `'geography'`
- `'us-history'`, `'us-government'`, `'us-civics'`

**English Flashcards (~40 cards):**
- Literary devices: metaphor, simile, alliteration, personification, irony, tone, mood, theme, symbolism, foreshadowing
- Grammar/mechanics: subject-verb agreement, pronoun reference, tense consistency, parallel structure, fragments, run-ons
- Reading comprehension: inference, main idea, supporting detail, author's purpose, audience, credibility
- Rhetoric: ethos, pathos, logos, diction, syntax, register, bias, fact vs. opinion

**Global History Flashcards (~50 cards):**
- Empires/civilizations: Byzantine, Islamic Caliphate, Feudalism, Renaissance, Enlightenment, Imperialism
- Geographic terms: peninsula, archipelago, monsoon, trade route, cultural diffusion, migration
- Political systems: monarchy, democracy, theocracy, autocracy, oligarchy, communism
- Key events: Fall of Rome, Crusades, Black Death, Industrial Revolution, colonialism, nationalism
- Concepts: sovereignty, mercantilism, revolution, reform, social hierarchy, cultural exchange

**US History Flashcards (~45 cards):**
- Constitutional concepts: separation of powers, checks and balances, federalism, due process, amendment, ratification
- Historical periods: Colonial era, Revolutionary era, Antebellum, Civil War, Reconstruction, Progressive Era, New Deal, Civil Rights
- Movements: abolitionism, women's suffrage, labor movement, civil rights, environmentalism
- Key figures: Washington, Jefferson, Lincoln, FDR, MLK, Kennedy
- Documents: Declaration of Independence, Constitution, Bill of Rights, Emancipation Proclamation, Civil Rights Act

**Definition Quality:**
- 1 sentence, 15–40 words (parallel STEM flashcard style)
- Include context (e.g., time period, geographic region, key actors) when relevant
- Avoid jargon; explain if necessary
- Example: "Feudalism: Medieval social system where vassals pledge loyalty to lords in exchange for land protection; based on mutual obligations."

**Placement:**
- Add to existing `flashcards.js` files in all three platforms (do NOT create separate `flashcards-humanities.js`)
- Or, if too large, create `flashcards-humanities.js` and import both in app consumers

---

## Part 3: Sync & Validation

After enrichment and flashcard generation:

1. **Verify all three registries resolve:**
   - `mobile/src/content/regents-exams/index.js`
   - `shared/content/regents-exams/index.js`
   - `src/data/regents-exams/index.js`
   - Each should have 180+ modules with valid exam objects.

2. **Check flashcard structure:**
   - Every card has `{ id, term, definition, topic }`
   - No duplicate IDs across all flashcards
   - All topics are valid (in ENGLISH_TOPICS, GLOBAL_HISTORY_TOPICS, US_HISTORY_TOPICS)

3. **Build test:**
   - `npm run build` (root Vite) — should pass
   - `cd chromebook && npm run build` — should pass

4. **Report:**
   - Total questions enriched (by subject)
   - Total flashcard cards added (by subject)
   - Any errors or skipped questions (with reasons)

---

## Acceptance Criteria

✅ All English exam questions (MC) have explanation + diveDeep  
✅ All Global History exam questions (MC) have explanation + diveDeep  
✅ All US History exam questions (MC) have explanation + diveDeep  
✅ ~130–140 humanities flashcard entries created and distributed across three platforms  
✅ All three registries resolve with no duplicate IDs  
✅ Both Vite builds pass (root + chromebook)  
✅ Files written to mobile/src/content, shared/content, and src/data (all in sync)
