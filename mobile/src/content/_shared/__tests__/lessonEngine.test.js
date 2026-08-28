import { makeLessonApi } from '../lessonEngine'

// First test file for this shared module (used by chemistry, algebra-1/2,
// living-environment, physics, earth-science, and geometry's units.js).
// Covers the getSubTopicLessonQuestions written-capstone fix made alongside
// the Geometry restructure (~/.claude/plans/expressive-meandering-lagoon.md):
// getLessonQuestions has always appended a written capstone matched by
// `topic`; getSubTopicLessonQuestions never did, even when a written
// question shared the exact same `subTopic` tag — silently weaker lessons
// for every subject-topic pair split into subtopic-routed units.

function exam(questions) {
  return { questions }
}

const mcQuestion = (n, topic, subTopic) => ({
  number: n, part: 'A', text: `Q${n}`, choices: ['a', 'b', 'c', 'd'], correct: 0,
  topic, subTopic, explanation: 'e', diveDeep: 'd',
})

const writtenQuestion = (n, topic, subTopic) => ({
  number: n, part: 'B', type: 'written', text: `Written ${n}`, modelAnswer: 'model',
  topic, subTopic, explanation: 'e', diveDeep: 'd',
})

const TOPIC_MAP = { 'RawTopic': 'Topic' }

describe('getSubTopicLessonQuestions written capstone', () => {
  it('appends a written question matching subTopic, same as getLessonQuestions does by topic', () => {
    const questions = [
      ...Array.from({ length: 5 }, (_, i) => mcQuestion(i + 1, 'RawTopic', 'SubA')),
      writtenQuestion(6, 'RawTopic', 'SubA'),
    ]
    const api = makeLessonApi({ exams: [exam(questions)], topicMap: TOPIC_MAP, lessonSize: 20 })
    const lesson = api.getSubTopicLessonQuestions('SubA', 0, 1)
    expect(lesson.some((q) => q.type === 'written')).toBe(true)
  })

  it('does not append a written question when none shares the subTopic', () => {
    const questions = [
      ...Array.from({ length: 5 }, (_, i) => mcQuestion(i + 1, 'RawTopic', 'SubA')),
      writtenQuestion(6, 'RawTopic', 'SubB'), // different subTopic
    ]
    const api = makeLessonApi({ exams: [exam(questions)], topicMap: TOPIC_MAP, lessonSize: 20 })
    const lesson = api.getSubTopicLessonQuestions('SubA', 0, 1)
    expect(lesson.some((q) => q.type === 'written')).toBe(false)
  })

  it('the challenge lesson (lessonIndex >= lessonCount) returns pure MC, no capstone', () => {
    const questions = [
      ...Array.from({ length: 5 }, (_, i) => mcQuestion(i + 1, 'RawTopic', 'SubA')),
      writtenQuestion(6, 'RawTopic', 'SubA'),
    ]
    const api = makeLessonApi({ exams: [exam(questions)], topicMap: TOPIC_MAP, lessonSize: 20 })
    const challenge = api.getSubTopicLessonQuestions('SubA', 5, 1)
    expect(challenge.every((q) => q.type !== 'written')).toBe(true)
  })

  it('getLessonQuestions capstone behavior is unchanged (regression guard)', () => {
    const questions = [
      ...Array.from({ length: 5 }, (_, i) => mcQuestion(i + 1, 'RawTopic', null)),
      writtenQuestion(6, 'RawTopic', null),
    ]
    const api = makeLessonApi({ exams: [exam(questions)], topicMap: TOPIC_MAP, lessonSize: 20 })
    const lesson = api.getLessonQuestions('Topic', 0, 1)
    expect(lesson.some((q) => q.type === 'written')).toBe(true)
  })
})
