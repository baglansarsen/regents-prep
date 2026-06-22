A circular node on the Duolingo-style study path. Chain them with little connector segments.

```jsx
<LessonNode state="done" icon="✓" label="Intro" />
<LessonNode state="active" icon="★" label="Now" />
<LessonNode state="locked" label="Unit 4" />
```

States: done (filled green + glow), active (the next lesson), locked. Pass `color` for subject/boss accents.