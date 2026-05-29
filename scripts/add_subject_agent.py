#!/usr/bin/env python3
import os
import sys
import asyncio
import json
import argparse
import pydantic
from google.antigravity import Agent, LocalAgentConfig

# Define schemas for structured outputs

class QuestionSchema(pydantic.BaseModel):
    topic: str
    text: str
    choices: list[str]
    correct: int
    explanation: str

class QuestionListSchema(pydantic.BaseModel):
    questions: list[QuestionSchema]

class FlashcardSchema(pydantic.BaseModel):
    topic: str
    term: str
    definition: str

class FlashcardListSchema(pydantic.BaseModel):
    flashcards: list[FlashcardSchema]

class AchievementSchema(pydantic.BaseModel):
    id: str
    title: str
    description: str
    icon: str
    topic_ref: str # The topic name this corresponds to

class AchievementListSchema(pydantic.BaseModel):
    achievements: list[AchievementSchema]

class StrategySchema(pydantic.BaseModel):
    mentalPrep: list[str]
    answeringTechniques: list[str]
    guessingStrategy: list[str]
    processOfElimination: list[str]
    timeManagement: list[str]

class StrategyListSchema(pydantic.BaseModel):
    strategies: list[StrategySchema] # 5 items, one for each unit in order


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--subject', default='chemistry', help='Subject slug')
    args = parser.parse_args()

    subject_slug = args.subject
    print(f"=== Starting Chemistry Subject-Adding Agent for: {subject_slug} ===")

    # Create target directory
    dest_dir = os.path.abspath(f"src/data/{subject_slug}")
    os.makedirs(dest_dir, exist_ok=True)
    print(f"Destination directory: {dest_dir}")

    # Core metadata definition
    subject_topics = {
        "ATOMIC_STRUCTURE": "Atomic Structure",
        "PERIODIC_TABLE": "Periodic Table",
        "CHEMICAL_BONDING": "Chemical Bonding",
        "MATTER_AND_ENERGY": "Matter & Energy",
        "ORGANIC_CHEMISTRY": "Organic Chemistry"
    }

    units_data = [
        {
            "id": f"{subject_slug}-u1",
            "title": "Atomic Structure",
            "icon": "⚛️",
            "color": "#ec4899",
            "darkColor": "#be185d",
            "topic": "Atomic Structure",
            "lessonCount": 3
        },
        {
            "id": f"{subject_slug}-u2",
            "title": "Periodic Table",
            "icon": "📊",
            "color": "#db2777",
            "darkColor": "#9d174d",
            "topic": "Periodic Table",
            "lessonCount": 3
        },
        {
            "id": f"{subject_slug}-u3",
            "title": "Chemical Bonding",
            "icon": "🤝",
            "color": "#c084fc",
            "darkColor": "#a855f7",
            "topic": "Chemical Bonding",
            "lessonCount": 3
        },
        {
            "id": f"{subject_slug}-u4",
            "title": "Matter & Energy",
            "icon": "🔥",
            "color": "#f43f5e",
            "darkColor": "#e11d48",
            "topic": "Matter & Energy",
            "lessonCount": 3
        },
        {
            "id": f"{subject_slug}-u5",
            "title": "Organic Chemistry",
            "icon": "🌿",
            "color": "#fb7185",
            "darkColor": "#f43f5e",
            "topic": "Organic Chemistry",
            "lessonCount": 3
        }
    ]

    # Write units.js
    units_file_content = f"""import {{ TOPICS, TOPIC_ICONS, getByTopic }} from './questions'

export const UNITS = [
  {{ id: '{subject_slug}-u1', title: 'Atomic Structure', icon: TOPIC_ICONS[TOPICS.ATOMIC_STRUCTURE], color: '#ec4899', darkColor: '#be185d', topic: TOPICS.ATOMIC_STRUCTURE, lessonCount: 3 }},
  {{ id: '{subject_slug}-u2', title: 'Periodic Table',   icon: TOPIC_ICONS[TOPICS.PERIODIC_TABLE],   color: '#db2777', darkColor: '#9d174d', topic: TOPICS.PERIODIC_TABLE,   lessonCount: 3 }},
  {{ id: '{subject_slug}-u3', title: 'Chemical Bonding', icon: TOPIC_ICONS[TOPICS.CHEMICAL_BONDING], color: '#c084fc', darkColor: '#a855f7', topic: TOPICS.CHEMICAL_BONDING, lessonCount: 3 }},
  {{ id: '{subject_slug}-u4', title: 'Matter & Energy',  icon: TOPIC_ICONS[TOPICS.MATTER_AND_ENERGY], color: '#f43f5e', darkColor: '#e11d48', topic: TOPICS.MATTER_AND_ENERGY,  lessonCount: 3 }},
  {{ id: '{subject_slug}-u5', title: 'Organic Chemistry',icon: TOPIC_ICONS[TOPICS.ORGANIC_CHEMISTRY],color: '#fb7185', darkColor: '#f43f5e', topic: TOPICS.ORGANIC_CHEMISTRY,lessonCount: 3 }},
]

const LESSON_SIZE = 10

export function getLessonQuestions(topic, lessonIndex, lessonCount) {{
  const pool = getByTopic(topic)
  const sorted = [...pool].sort((a, b) => a.id - b.id)

  if (lessonIndex >= lessonCount) {{
    return [...pool].sort(() => Math.random() - 0.5)
  }}

  const chunkSize = Math.ceil(sorted.length / lessonCount)
  const start = lessonIndex * chunkSize
  const slice = sorted.slice(start, start + chunkSize)
  return slice.slice(0, LESSON_SIZE)
}}
"""
    with open(f"{dest_dir}/units.js", "w") as f:
        f.write(units_file_content)
    print("Created units.js placeholder")

    # Generate Questions unit-by-unit using the Antigravity SDK
    print("Generating Questions using Google Antigravity Agent...")
    questions_list = []
    question_id_counter = 1

    config = LocalAgentConfig(
        response_schema=QuestionListSchema,
        system_instructions="You are an expert high school Chemistry teacher specializing in NY Regents exam prep."
    )

    async with Agent(config) as agent:
        for topic_key, topic_name in subject_topics.items():
            print(f" -> Querying agent for topic: {topic_name}...")
            prompt = (
                f"Generate 12 extremely realistic, multiple-choice questions for the NY Regents Chemistry curriculum "
                f"specifically on the topic: '{topic_name}'.\n"
                f"Ensure the choices have exactly 4 items, correct is 0-indexed, and explanation explains why the correct "
                f"option is correct and why others are incorrect in a friendly and educational way."
            )
            response = await agent.chat(prompt)
            result = await response.structured_output()
            if result and 'questions' in result:
                for q in result['questions']:
                    q['id'] = question_id_counter
                    # Overwrite/ensure exact topic name
                    q['topic'] = f"TOPICS.{topic_key}"
                    questions_list.append(q)
                    question_id_counter += 1
                print(f"    Added {len(result['questions'])} questions.")
            else:
                print(f"    Failed to parse response for {topic_name}.")

    # Generate Flashcards
    print("Generating Flashcards...")
    flashcards_list = []
    config_fc = LocalAgentConfig(
        response_schema=FlashcardListSchema,
        system_instructions="You are an expert high school Chemistry teacher."
    )
    async with Agent(config_fc) as agent:
        prompt = (
            f"Generate 25 high-quality flashcards for NY Regents Chemistry distributed across these topics: "
            f"{', '.join(subject_topics.values())}.\n"
            f"Each flashcard must contain a term and a clear, descriptive definition."
        )
        response = await agent.chat(prompt)
        result = await response.structured_output()
        if result and 'flashcards' in result:
            flashcards_list = result['flashcards']
            # Map topic names to TOPICS constants
            for fc in flashcards_list:
                for key, val in subject_topics.items():
                    if fc['topic'].lower() in val.lower() or val.lower() in fc['topic'].lower():
                        fc['topic'] = f"TOPICS.{key}"
                        break
            print(f"Generated {len(flashcards_list)} flashcards.")
        else:
            print("Failed to generate flashcards.")

    # Generate Achievements
    print("Generating Achievements...")
    achievements_list = []
    config_ach = LocalAgentConfig(
        response_schema=AchievementListSchema,
        system_instructions="You are an expert gamification designer."
    )
    async with Agent(config_ach) as agent:
        prompt = (
            f"Create 8 fun, chemistry-themed study achievements. Create one achievement for each of our 5 topics: "
            f"{', '.join(subject_topics.values())}, plus 3 general ones (e.g. perfect quiz score, streak, etc.).\n"
            f"Make the titles and descriptions sound fun and related to science/chemistry.\n"
            f"Provide a descriptive ID (e.g., 'chem_atomic_master') and a suitable emoji icon."
        )
        response = await agent.chat(prompt)
        result = await response.structured_output()
        if result and 'achievements' in result:
            achievements_list = result['achievements']
            print(f"Generated {len(achievements_list)} achievements.")
        else:
            print("Failed to generate achievements.")

    # Generate Strategies
    print("Generating Test-Taking Strategies...")
    strategies_list = []
    config_strat = LocalAgentConfig(
        response_schema=StrategyListSchema,
        system_instructions="You are a seasoned test strategist specializing in the NY Chemistry Regents."
    )
    async with Agent(config_strat) as agent:
        prompt = (
            f"Create detailed, highly practical test strategies for each of our 5 units in order:\n"
            f"1. Atomic Structure\n2. Periodic Table\n3. Chemical Bonding\n4. Matter & Energy\n5. Organic Chemistry\n"
            f"For each unit, provide exactly 3 bullet points for each category in the StrategySchema:\n"
            f"- mentalPrep: checklist or key equations / reference table pages to remember\n"
            f"- answeringTechniques: specific tips to identify the right answer\n"
            f"- guessingStrategy: rule-of-thumb indicators or standard patterns\n"
            f"- processOfElimination: common traps/incorrect options to throw out\n"
            f"- timeManagement: time budgeting guidelines"
        )
        response = await agent.chat(prompt)
        result = await response.structured_output()
        if result and 'strategies' in result:
            strategies_list = result['strategies']
            print(f"Generated strategies for {len(strategies_list)} units.")
        else:
            print("Failed to generate strategies.")

    # Write questions.js
    questions_js_content = f"""export const TOPICS = {{
  ATOMIC_STRUCTURE: 'Atomic Structure',
  PERIODIC_TABLE: 'Periodic Table',
  CHEMICAL_BONDING: 'Chemical Bonding',
  MATTER_AND_ENERGY: 'Matter & Energy',
  ORGANIC_CHEMISTRY: 'Organic Chemistry',
}}

export const TOPIC_ICONS = {{
  [TOPICS.ATOMIC_STRUCTURE]: '⚛️',
  [TOPICS.PERIODIC_TABLE]: '📊',
  [TOPICS.CHEMICAL_BONDING]: '🤝',
  [TOPICS.MATTER_AND_ENERGY]: '🔥',
  [TOPICS.ORGANIC_CHEMISTRY]: '🌿',
}}

export const questions = [
"""
    for q in questions_list:
        # We need to render the topic without quotes as it's a constant
        escaped_choices = []
        for c in q['choices']:
            escaped_choices.append("'" + c.replace("'", "\\'") + "'")
        choices_str = ", ".join(escaped_choices)
        exp_clean = q['explanation'].replace("'", "\\'")
        text_clean = q['text'].replace("'", "\\'")
        questions_js_content += f"""  {{
    id: {q['id']},
    topic: {q['topic']},
    text: '{text_clean}',
    choices: [{choices_str}],
    correct: {q['correct']},
    explanation: '{exp_clean}'
  }},
"""
    questions_js_content += f"""]

export function getByTopic(topic) {{
  return questions.filter(q => q.topic === topic)
}}

export function getContextual() {{
  return questions.filter(q => q.context)
}}

export function buildDiagnosticSet() {{
  // Get 3 questions from each topic
  return Object.values(TOPICS).flatMap(topic => {{
    const pool = getByTopic(topic)
    return pool.sort(() => Math.random() - 0.5).slice(0, 3)
  }})
}}

export function shuffled(arr) {{
  return [...arr].sort(() => Math.random() - 0.5)
}}
"""
    with open(f"{dest_dir}/questions.js", "w") as f:
        f.write(questions_js_content)
    print("Created questions.js successfully")

    # Write flashcards.js
    flashcards_js_content = "import { TOPICS } from './questions'\n\nexport const flashcards = [\n"
    for fc in flashcards_list:
        # Fallback in case topic mapping failed
        topic_val = fc['topic'] if fc['topic'].startswith('TOPICS.') else f"TOPICS.ATOMIC_STRUCTURE"
        term_clean = fc['term'].replace("'", "\\'")
        def_clean = fc['definition'].replace("'", "\\'")
        flashcards_js_content += f"  {{ topic: {topic_val}, term: '{term_clean}', definition: '{def_clean}' }},\n"
    flashcards_js_content += "]\n\nexport const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)\n"
    
    with open(f"{dest_dir}/flashcards.js", "w") as f:
        f.write(flashcards_js_content)
    print("Created flashcards.js successfully")

    # Write achievements.js
    ach_js_content = "import { TOPICS } from './questions'\n\nexport const ACHIEVEMENTS = [\n"
    for ach in achievements_list:
        # Try to map topic_ref to a topic constant
        topic_const = "TOPICS.ATOMIC_STRUCTURE"
        for key, val in subject_topics.items():
            if ach['topic_ref'].lower() in val.lower() or val.lower() in ach['topic_ref'].lower():
                topic_const = f"TOPICS.{key}"
                break
        
        ach_js_content += f"""  {{
    id: '{ach['id']}',
    title: '{ach['title'].replace("'", "\\'")}',
    description: '{ach['description'].replace("'", "\\'")}',
    icon: '{ach['icon']}',
    condition: s => s.topicsPassed?.has({topic_const})
  }},
"""
    # Append the perfect study, speed, and streak ones in JS syntax
    ach_js_content += f"""  {{
    id: '{subject_slug}_perfect_quiz',
    title: 'Perfect Synthesis',
    description: 'Score 100% on any Chemistry quiz',
    icon: '💯',
    condition: s => s.perfectScore
  }},
  {{
    id: '{subject_slug}_speed',
    title: 'Kinetics Master',
    description: 'Complete a Chemistry quiz without any timeouts',
    icon: '⚡',
    condition: s => s.noTimeouts
  }},
  {{
    id: '{subject_slug}_streak_5',
    title: 'Stable Element',
    description: 'Maintain a 5-day study streak',
    icon: '🔥',
    condition: s => (s.streak ?? 0) >= 5
  }}
]
"""
    with open(f"{dest_dir}/achievements.js", "w") as f:
        f.write(ach_js_content)
    print("Created achievements.js successfully")

    # Write strategies.js
    strat_js_content = "export const STRATEGIES = {\n"
    for i, strat in enumerate(strategies_list):
        unit_id = f"{subject_slug}-u{i+1}"
        strat_js_content += f"  '{unit_id}': {{\n"
        
        for key in ["mentalPrep", "answeringTechniques", "guessingStrategy", "processOfElimination", "timeManagement"]:
            escaped_items = []
            for item in getattr(strat, key):
                escaped_items.append("'" + item.replace("'", "\\'") + "'")
            items_str = ", ".join(escaped_items)
            strat_js_content += f"    {key}: [{items_str}],\n"
            
        strat_js_content += "  },\n"
    strat_js_content += "}\n"
    
    with open(f"{dest_dir}/strategies.js", "w") as f:
        f.write(strat_js_content)
    print("Created strategies.js successfully")

    # Write index.js (full implementation)
    index_js_content = f"""export {{
  questions,
  TOPICS,
  TOPIC_ICONS,
  getByTopic,
  getContextual,
  buildDiagnosticSet,
  shuffled,
}} from './questions'

export {{ flashcards, FLASHCARD_TOPIC_LIST }} from './flashcards'
export {{ ACHIEVEMENTS as achievements }} from './achievements'
export {{ UNITS, getLessonQuestions }} from './units'
export {{ STRATEGIES as strategies }} from './strategies'

import {{ TOPICS }} from './questions'

export const TOPIC_ORDER = [
  TOPICS.ATOMIC_STRUCTURE,
  TOPICS.PERIODIC_TABLE,
  TOPICS.CHEMICAL_BONDING,
  TOPICS.MATTER_AND_ENERGY,
  TOPICS.ORGANIC_CHEMISTRY,
]

export function getExamContextQuestions(topic) {{
  // Returns empty until past exam questions are scraped/generated
  return []
}}
"""
    with open(f"{dest_dir}/index.js", "w") as f:
        f.write(index_js_content)
    print("Created index.js successfully")

    print(f"=== Successfully Generated and Wrote All Chemistry Curriculum Files to {dest_dir}! ===")

if __name__ == "__main__":
    asyncio.run(main())
