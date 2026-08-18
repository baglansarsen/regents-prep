/**
 * homeAgenda — composes the Home screen's single "do this next" hero plus its
 * chip row of runners-up, from the three things that used to decide this
 * independently: the priority ladder (todayMission), the Rescue Plan override
 * (rescuePlan), and the day's multi-task plan (buildTodayPlan).
 *
 * Pure — no storage, no navigation, no hooks. HomeScreen drives it via useMemo
 * and dispatches whatever it returns through the existing runMission().
 */

import { pickTodayMission, buildTodayPlan, nextActionChips } from './todayMission'
import { pickRescueAction } from './rescuePlan'

/**
 * @param {object} args — every input pickTodayMission/buildTodayPlan/pickRescueAction need,
 *   plus:
 * @param {boolean} args.ready       — false while goal/history are still loading; returns an
 *   empty agenda rather than risk computing from an unloaded (falsely cold-start) state.
 * @param {object|null} args.rescuePlan — the committed goal's rescuePlan profile, if any
 *
 * @returns {{
 *   hero:     object|null,   // mission-shaped — render as the hero card
 *   plan:     object,        // buildTodayPlan() output — plan.tasks.slice(1) is the disclosure
 *   chips:    Array,         // ≤3 runner-up actions, excludes whatever won the hero
 *   rescue:   boolean,       // true when the Rescue Plan is overriding the normal ladder
 *   planLabel: string|null,  // rescue's kicker copy, e.g. "CRUNCH WEEK PLAN"
 * }}
 */
export function buildHomeAgenda({ ready = true, rescuePlan = null, ...args } = {}) {
  if (!ready) {
    return { hero: null, plan: { pointsToGo: null, headline: '', tasks: [], lead: null }, chips: [], rescue: false, planLabel: null }
  }

  const ranked = pickTodayMission(args)
  const plan = buildTodayPlan(args)

  // Rescue takes over the hero slot inside 30 days of the exam — but only once
  // there's a goal and enough data to act on (set_goal/checkup still win, same
  // as before: without a goal or any history there's nothing for the plan to
  // work with).
  const rescueEligible = rescuePlan && args.daysToExam != null && args.daysToExam <= 30 &&
    ranked.actionType !== 'set_goal' && ranked.actionType !== 'checkup'

  const hero = rescueEligible
    ? pickRescueAction({
        plan: rescuePlan,
        daysToExam: args.daysToExam,
        weakestUnit: args.weakestUnit,
        dueCount: args.dueCount,
        hasTakenPracticeExam: args.hasTakenPracticeExam,
      })
    : ranked

  // Before a goal exists, or before there's any data to estimate from, the
  // single onboarding action IS the agenda — chips would be noise with
  // nothing real behind them yet (mirrors buildTodayPlan's same call).
  const blocksChips = ranked.actionType === 'set_goal' || ranked.actionType === 'checkup'

  // Runner-ups always come from the normal ladder's signals — even in rescue
  // mode, so a rescue hero doesn't hide the Level 0 / trap chips underneath it.
  const chips = blocksChips ? [] : nextActionChips(args, hero.actionType)

  return { hero, plan, chips, rescue: hero.rescue === true, planLabel: hero.rescue ? hero.planLabel : null }
}
