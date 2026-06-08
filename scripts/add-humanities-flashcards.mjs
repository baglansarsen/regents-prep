#!/usr/bin/env node
// Adds ELA, Global History, and US History flashcards to the main flashcards.js files on all three platforms.
// Run: node scripts/add-humanities-flashcards.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const englishCards = [
  { id: 'en1', term: 'Metaphor', definition: 'Comparison of two unlike things without using "like" or "as"; creates vivid imagery.', topic: 'english-literature' },
  { id: 'en2', term: 'Simile', definition: 'Comparison of two unlike things using "like" or "as" to highlight a shared quality.', topic: 'english-literature' },
  { id: 'en3', term: 'Personification', definition: 'Attributing human characteristics, emotions, or behaviors to non-human entities.', topic: 'english-literature' },
  { id: 'en4', term: 'Hyperbole', definition: 'Exaggerated statements or claims used for emphasis or effect, not meant to be taken literally.', topic: 'english-literature' },
  { id: 'en5', term: 'Alliteration', definition: 'Repetition of initial consonant sounds in close proximity to create rhythm or emphasis.', topic: 'english-literature' },
  { id: 'en6', term: 'Irony', definition: 'Contrast between expectation and reality (situational, dramatic, or verbal).', topic: 'english-literature' },
  { id: 'en7', term: 'Onomatopoeia', definition: 'Words that mimic the natural sounds associated with the objects or actions they refer to.', topic: 'english-literature' },
  { id: 'en8', term: 'Imagery', definition: 'Vivid sensory language that appeals to sight, sound, smell, taste, or touch to create mental pictures.', topic: 'english-literature' },
  { id: 'en9', term: 'Symbolism', definition: 'The use of an object, person, or situation to represent a deeper meaning beyond its literal sense.', topic: 'english-literature' },
  { id: 'en10', term: 'Foreshadowing', definition: 'Clues or hints in a narrative that suggest events that will occur later in the story.', topic: 'english-literature' },
  { id: 'en11', term: 'Tone', definition: 'The author\'s attitude toward the subject matter or audience, conveyed through diction and syntax.', topic: 'english-literature' },
  { id: 'en12', term: 'Mood', definition: 'The emotional atmosphere or feeling created in a text for the reader.', topic: 'english-literature' },
  { id: 'en13', term: 'Theme', definition: 'The underlying message, moral, or universal truth explored throughout a literary work.', topic: 'english-literature' },
  { id: 'en14', term: 'Point of View', definition: 'The perspective from which a story is narrated, such as first, second, or third person.', topic: 'english-literature' },
  { id: 'en15', term: 'Subject-Verb Agreement', definition: 'Grammatical rule requiring a verb to match its subject in number (singular or plural).', topic: 'english' },
  { id: 'en16', term: 'Pronoun-Antecedent Agreement', definition: 'Rule requiring a pronoun to match the noun it replaces in number, gender, and person.', topic: 'english' },
  { id: 'en17', term: 'Parallel Structure', definition: 'Using the same pattern of words or grammatical form to show that ideas are of equal importance.', topic: 'english' },
  { id: 'en18', term: 'Fragment', definition: 'An incomplete sentence that lacks a subject, a verb, or a complete thought.', topic: 'english' },
  { id: 'en19', term: 'Run-On Sentence', definition: 'Two or more independent clauses joined incorrectly without proper punctuation or conjunctions.', topic: 'english' },
  { id: 'en20', term: 'Dangling Modifier', definition: 'A modifier that does not clearly or logically refer to any specific word in the sentence.', topic: 'english' },
  { id: 'en21', term: 'Active Voice', definition: 'Sentence structure where the subject performs the action denoted by the verb.', topic: 'english' },
  { id: 'en22', term: 'Passive Voice', definition: 'Sentence structure where the subject receives the action of the verb.', topic: 'english' },
  { id: 'en23', term: 'Inference', definition: 'A logical conclusion drawn from evidence in the text and personal reasoning.', topic: 'english' },
  { id: 'en24', term: 'Main Idea', definition: 'The primary point or central concept that the author wants to convey about a topic.', topic: 'english' },
  { id: 'en25', term: 'Author\'s Purpose', definition: 'The primary reason an author writes, typically to persuade, inform, entertain, or describe.', topic: 'english' },
  { id: 'en26', term: 'Bias', definition: 'A prejudice or leaning toward a particular perspective, opinion, or group.', topic: 'english' },
  { id: 'en27', term: 'Fact vs. Opinion', definition: 'Facts can be objectively proven; opinions express subjective beliefs, feelings, or values.', topic: 'english' },
  { id: 'en28', term: 'Context Clues', definition: 'Information near an unfamiliar word in a text that helps clarify its meaning.', topic: 'english' },
  { id: 'en29', term: 'Credibility', definition: 'The trustworthiness, reliability, and authority of a source or author.', topic: 'english' },
  { id: 'en30', term: 'Ethos', definition: 'Rhetorical appeal to character, credibility, or ethics to persuade an audience.', topic: 'english-rhetoric' },
  { id: 'en31', term: 'Pathos', definition: 'Rhetorical appeal to emotion, sympathy, or passion to persuade an audience.', topic: 'english-rhetoric' },
  { id: 'en32', term: 'Logos', definition: 'Rhetorical appeal to logic, reason, statistics, or evidence to persuade an audience.', topic: 'english-rhetoric' },
  { id: 'en33', term: 'Diction', definition: 'The author\'s purposeful choice of words to convey meaning, tone, or style.', topic: 'english-rhetoric' },
  { id: 'en34', term: 'Syntax', definition: 'The arrangement of words and phrases to create well-formed, impactful sentences.', topic: 'english-rhetoric' },
  { id: 'en35', term: 'Register', definition: 'The level of formality in language use, ranging from formal and academic to casual.', topic: 'english-rhetoric' },
  { id: 'en36', term: 'Rhetorical Question', definition: 'A question asked for effect or emphasis rather than to elicit an answer.', topic: 'english-rhetoric' },
  { id: 'en37', term: 'Juxtaposition', definition: 'Placing two contrasting concepts or images side-by-side to highlight differences.', topic: 'english-rhetoric' },
  { id: 'en38', term: 'Oxymoron', definition: 'A figure of speech pairing contradictory terms for rhetorical effect.', topic: 'english-rhetoric' },
  { id: 'en39', term: 'Paradox', definition: 'A statement that seems self-contradictory but reveals a deeper, underlying truth.', topic: 'english-rhetoric' },
  { id: 'en40', term: 'Allegory', definition: 'A narrative work that carries a symbolic meaning beneath the surface story.', topic: 'english-literature' }
]

const globalHistoryCards = [
  { id: 'gh1', term: 'Peninsula', definition: 'A body of land surrounded by water on three sides (e.g., India, Italy, Korea).', topic: 'geography' },
  { id: 'gh2', term: 'Archipelago', definition: 'A chain or cluster of islands close together (e.g., Japan, Philippines).', topic: 'geography' },
  { id: 'gh3', term: 'Monsoons', definition: 'Seasonal winds that bring heavy rain or dry seasons, particularly affecting South Asia.', topic: 'geography' },
  { id: 'gh4', term: 'Trade Route', definition: 'A systematic network of pathways used for the commercial transport of cargo (e.g., Silk Road).', topic: 'geography' },
  { id: 'gh5', term: 'Cultural Diffusion', definition: 'The spread of cultural beliefs, values, and social activities from one group to another.', topic: 'world-cultures' },
  { id: 'gh6', term: 'Migration', definition: 'Physical movement by humans from one area to another for better resources or safety.', topic: 'geography' },
  { id: 'gh7', term: 'Feudalism', definition: 'Medieval social and political system based on mutual obligations between lords, vassals, and serfs.', topic: 'global-history' },
  { id: 'gh8', term: 'Manorialism', definition: 'The economic system of the Middle Ages centered around self-sufficient agricultural estates.', topic: 'global-history' },
  { id: 'gh9', term: 'Byzantine Empire', definition: 'The Eastern half of the Roman Empire that survived the fall of Rome; capital at Constantinople.', topic: 'global-history' },
  { id: 'gh10', term: 'Islamic Caliphate', definition: 'A state led by a Caliph; preserved and advanced scientific and philosophical knowledge.', topic: 'global-history' },
  { id: 'gh11', term: 'Crusades', definition: 'Holy wars fought between European Christians and Muslims for control of Jerusalem.', topic: 'global-history' },
  { id: 'gh12', term: 'Black Death', definition: 'A devastating plague that swept through Eurasia in the 14th century, reducing the population.', topic: 'global-history' },
  { id: 'gh13', term: 'Renaissance', definition: 'Era of cultural, artistic, and scientific rebirth in Europe, beginning in 14th-century Italy.', topic: 'global-history' },
  { id: 'gh14', term: 'Scientific Revolution', definition: 'A period of drastic change in scientific thought emphasizing observation and reason (16th-17th centuries).', topic: 'global-history' },
  { id: 'gh15', term: 'Enlightenment', definition: 'Intellectual movement of the 18th century emphasizing reason, individualism, and natural rights.', topic: 'global-history' },
  { id: 'gh16', term: 'Monarchy', definition: 'Form of government with a monarch (king or queen) at the head, usually hereditary.', topic: 'global-history' },
  { id: 'gh17', term: 'Absolutism', definition: 'A political system in which a ruler holds total, unchecked power (e.g., Louis XIV).', topic: 'global-history' },
  { id: 'gh18', term: 'Democracy', definition: 'Government system where power is vested in the people, ruling directly or through representatives.', topic: 'global-history' },
  { id: 'gh19', term: 'Theocracy', definition: 'Government system ruled by religious leaders who claim divine guidance.', topic: 'global-history' },
  { id: 'gh20', term: 'Oligarchy', definition: 'A form of government in which a small group of people holds control.', topic: 'global-history' },
  { id: 'gh21', term: 'Communism', definition: 'Economic and political system aiming for a classless society with collective ownership of property.', topic: 'global-history' },
  { id: 'gh22', term: 'Capitalism', definition: 'Economic system based on private ownership of resources and free-market competition.', topic: 'global-history' },
  { id: 'gh23', term: 'Mercantilism', definition: 'Economic theory that a nation\'s power depends on accumulating gold and keeping colonies dependent.', topic: 'global-history' },
  { id: 'gh24', term: 'Imperialism', definition: 'A policy of extending a country\'s power and influence through diplomacy or military force.', topic: 'global-history' },
  { id: 'gh25', term: 'Colonialism', definition: 'The practice of acquiring political control over another country and occupying it with settlers.', topic: 'global-history' },
  { id: 'gh26', term: 'Nationalism', definition: 'Strong feeling of pride, loyalty, and devotion to one\'s own nation and self-determination.', topic: 'global-history' },
  { id: 'gh27', term: 'Social Hierarchy', definition: 'A system in which members of a society are ranked according to status or power.', topic: 'world-cultures' },
  { id: 'gh28', term: 'Cultural Exchange', definition: 'The sharing and blending of ideas, technology, and traditions between different cultures.', topic: 'world-cultures' },
  { id: 'gh29', term: 'Industrial Revolution', definition: 'Transition to new manufacturing processes using machinery and steam power, starting in Britain.', topic: 'global-history' },
  { id: 'gh30', term: 'Sovereignty', definition: 'The authority of a state to govern itself or another state independently.', topic: 'global-history' },
  { id: 'gh31', term: 'Social Contract', definition: 'Theory that individuals surrender some freedoms to government in exchange for protection.', topic: 'global-history' },
  { id: 'gh32', term: 'Secularism', definition: 'The principle of separating government and state affairs from religious beliefs.', topic: 'global-history' },
  { id: 'gh33', term: 'Totalitarianism', definition: 'Government system that is dictatorial and requires complete subservience to the state.', topic: 'global-history' },
  { id: 'gh34', term: 'Appeasement', definition: 'Policy of making concessions to dictatorial powers to avoid conflict (e.g., Munich Agreement).', topic: 'global-history' },
  { id: 'gh35', term: 'Cold War', definition: 'State of hostility between the US and USSR characterized by threats, propaganda, and proxy wars.', topic: 'global-history' },
  { id: 'gh36', term: 'Decolonization', definition: 'The process by which colonies become independent of the colonizing country after WWII.', topic: 'global-history' },
  { id: 'gh37', term: 'Globalization', definition: 'The process of increasing integration and interdependence of national economies and cultures.', topic: 'world-cultures' },
  { id: 'gh38', term: 'Humanism', definition: 'Renaissance intellectual movement focusing on human potential, achievements, and worldly matters.', topic: 'global-history' },
  { id: 'gh39', term: 'Magna Carta', definition: '1215 English document that limited the power of the king and established the rule of law.', topic: 'global-history' },
  { id: 'gh40', term: 'Neolithic Revolution', definition: 'The prehistoric transition of humans from nomadic hunter-gatherers to settled farming communities.', topic: 'global-history' },
  { id: 'gh41', term: 'Pax Romana', definition: 'A 200-year period of relative peace and stability across the Roman Empire starting under Augustus.', topic: 'global-history' },
  { id: 'gh42', term: 'Silk Road', definition: 'Ancient overland trade network connecting East Asia to the Mediterranean, facilitating exchange.', topic: 'geography' },
  { id: 'gh43', term: 'Spheres of Influence', definition: 'Territorial area in which an outside nation holds exclusive economic or political influence.', topic: 'global-history' },
  { id: 'gh44', term: 'Treaty of Versailles', definition: 'Peace treaty ending WWI that imposed harsh reparations on Germany, sparking resentment.', topic: 'global-history' },
  { id: 'gh45', term: 'Urbanization', definition: 'The process of population shift from rural areas to cities, driving city growth.', topic: 'geography' },
  { id: 'gh46', term: 'Westernization', definition: 'The adoption of Western culture, technology, and political ideas by non-Western societies.', topic: 'world-cultures' },
  { id: 'gh47', term: 'Reformation', definition: '16th-century religious movement started by Martin Luther that split Western Christianity.', topic: 'global-history' },
  { id: 'gh48', term: 'French Revolution', definition: '1789 uprising that overthrew the absolute monarchy and feudal privileges in France.', topic: 'global-history' },
  { id: 'gh49', term: 'Russian Revolution', definition: '1917 political upheaval that dismantled the Tsarist autocracy and established the Soviet Union.', topic: 'global-history' },
  { id: 'gh50', term: 'Code of Hammurabi', definition: 'Ancient Mesopotamian written legal code establishing strict guidelines and punishments.', topic: 'global-history' }
]

const usHistoryCards = [
  { id: 'us1', term: 'Separation of Powers', definition: 'Division of legislative, executive, and judicial powers among three independent branches.', topic: 'us-government' },
  { id: 'us2', term: 'Checks and Balances', definition: 'Constitutional mechanism allowing each branch of government to limit the powers of the others.', topic: 'us-government' },
  { id: 'us3', term: 'Federalism', definition: 'System of government where power is shared between the national and state governments.', topic: 'us-government' },
  { id: 'us4', term: 'Due Process', definition: 'Constitutional guarantee of fair treatment through the normal judicial system (5th/14th Amendments).', topic: 'us-government' },
  { id: 'us5', term: 'Amendment', definition: 'A formal change or addition to the US Constitution (requires 2/3 of Congress and 3/4 of states).', topic: 'us-government' },
  { id: 'us6', term: 'Ratification', definition: 'The official approval of a constitution, treaty, or amendment by voting states.', topic: 'us-government' },
  { id: 'us7', term: 'Bill of Rights', definition: 'The first ten amendments to the US Constitution, safeguarding individual liberties.', topic: 'us-government' },
  { id: 'us8', term: 'Declaration of Independence', definition: '1776 document written by Thomas Jefferson declaring the colonies free from British rule.', topic: 'us-history' },
  { id: 'us9', term: 'US Constitution', definition: '1787 document establishing the supreme law and government framework of the United States.', topic: 'us-government' },
  { id: 'us10', term: 'Emancipation Proclamation', definition: '1863 executive order by Lincoln declaring all enslaved people in Confederate territory free.', topic: 'us-history' },
  { id: 'us11', term: 'Reconstruction', definition: 'The period (1865–1877) after the Civil War dedicated to rebuilding the South and integrating freedmen.', topic: 'us-history' },
  { id: 'us12', term: 'Abolitionism', definition: 'The antebellum reform movement to immediately end slavery in the United States.', topic: 'us-history' },
  { id: 'us13', term: 'Women\'s Suffrage', definition: 'The political struggle for women\'s right to vote, won with the 19th Amendment in 1920.', topic: 'us-history' },
  { id: 'us14', term: 'Labor Movement', definition: 'Organized effort by workers to secure better wages, shorter hours, and safer working conditions.', topic: 'us-history' },
  { id: 'us15', term: 'Civil Rights Movement', definition: 'Mid-20th-century campaign to end racial segregation and secure constitutional equality for African Americans.', topic: 'us-history' },
  { id: 'us16', term: 'Environmentalism', definition: 'Social and political movement focusing on environmental protection and conservation.', topic: 'us-history' },
  { id: 'us17', term: 'Progressive Era', definition: 'Period of reform (1890s–1920s) aiming to correct political, economic, and social abuses of industrialization.', topic: 'us-history' },
  { id: 'us18', term: 'New Deal', definition: 'FDR\'s package of relief, recovery, and reform programs to combat the Great Depression in the 1930s.', topic: 'us-history' },
  { id: 'us19', term: 'Judicial Review', definition: 'Power of the Supreme Court to declare laws or actions unconstitutional (Marbury v. Madison).', topic: 'us-government' },
  { id: 'us20', term: 'Monroe Doctrine', definition: '1823 policy statement opposing European colonization or intervention in the Americas.', topic: 'us-history' },
  { id: 'us21', term: 'Manifest Destiny', definition: '19th-century belief that the US was destined to expand westward to the Pacific Ocean.', topic: 'us-history' },
  { id: 'us22', term: 'Jim Crow Laws', definition: 'State and local laws enforcing racial segregation and disenfranchisement in the Southern US (1870s-1960s).', topic: 'us-history' },
  { id: 'us23', term: 'Great Migration', definition: 'Movement of millions of African Americans from the rural South to the urban North and West (1916-1970).', topic: 'us-history' },
  { id: 'us24', term: 'Cold War', definition: 'Post-WWII state of geopolitical tension and ideological rivalry between the US and the USSR.', topic: 'us-history' },
  { id: 'us25', term: 'Electoral College', definition: 'Constitutional system for the indirect election of the US president based on state electoral votes.', topic: 'us-civics' },
  { id: 'us26', term: 'Popular Sovereignty', definition: 'Principle that a territory\'s residents should vote to decide political issues, such as slavery.', topic: 'us-civics' },
  { id: 'us27', term: 'Nullification', definition: 'The theory that states hold the right to declare a federal law void within their borders.', topic: 'us-civics' },
  { id: 'us28', term: 'Sectionalism', definition: 'Loyalty or devotion to regional interests rather than national unity, leading to the Civil War.', topic: 'us-history' },
  { id: 'us29', term: 'Social Darwinism', definition: '19th-century belief applying "survival of the fittest" to society, justifying extreme wealth and inequality.', topic: 'us-history' },
  { id: 'us30', term: 'Gilded Age', definition: 'Late 19th-century era of rapid industrial growth masked by underlying poverty and corruption.', topic: 'us-history' },
  { id: 'us31', term: 'Isolationism', definition: 'Foreign policy of avoiding political alliances or entanglements with other nations.', topic: 'us-history' },
  { id: 'us32', term: 'Containment', definition: 'US Cold War foreign policy aimed at stopping the expansion of communism globally.', topic: 'us-history' },
  { id: 'us33', term: 'Great Society', definition: 'President Johnson\'s social reforms in the 1960s targeting poverty, healthcare, and education.', topic: 'us-history' },
  { id: 'us34', term: 'Sharecropping', definition: 'Southern farming system where tenant farmers paid landlords rent using a portion of their harvested crops.', topic: 'us-history' },
  { id: 'us35', term: 'Muckrakers', definition: 'Progressive Era journalists who exposed institutional and industrial corruption to the public.', topic: 'us-history' },
  { id: 'us36', term: 'Nativism', definition: 'A policy or sentiment favoring native-born citizens over newly arrived immigrants.', topic: 'us-history' },
  { id: 'us37', term: 'Mercantilism', definition: 'Economic system where colonies exist to enrich the mother country through strict trade controls.', topic: 'us-history' },
  { id: 'us38', term: 'Common Sense', definition: '1776 pamphlet by Thomas Paine urging colonies to declare independence from Great Britain.', topic: 'us-history' },
  { id: 'us39', term: 'Articles of Confederation', definition: 'The first governing constitution of the US (1781–1789), featuring a very weak central government.', topic: 'us-history' },
  { id: 'us40', term: 'Federalists vs. Antifederalists', definition: 'Federalists supported the Constitution; Antifederalists opposed it due to fear of federal tyranny.', topic: 'us-history' },
  { id: 'us41', term: 'Great Compromise', definition: '1787 constitutional agreement creating a bicameral Congress: House (by population) and Senate (equal representation).', topic: 'us-history' },
  { id: 'us42', term: 'Marshall Court', definition: 'The Supreme Court era under John Marshall (1801–1835) that expanded federal power over states.', topic: 'us-history' },
  { id: 'us43', term: 'Seneca Falls Convention', definition: '1848 women\'s rights meeting in New York that drafted the Declaration of Sentiments.', topic: 'us-history' },
  { id: 'us44', term: 'Homestead Act', definition: '1862 law offering 160 acres of free Western public land to settlers who improved it.', topic: 'us-history' },
  { id: 'us45', term: 'Civil Rights Act of 1964', definition: 'Landmark federal law outlawing discrimination based on race, color, religion, sex, or national origin.', topic: 'us-history' }
]

const allNewCards = [
  ...englishCards,
  ...globalHistoryCards,
  ...usHistoryCards
]

const targets = [
  'mobile/src/content/flashcards.js',
  'shared/content/flashcards.js',
  'src/data/flashcards.js'
]

function run() {
  console.log('📚 Appending Humanities Flashcards to registries...\n')

  for (const relPath of targets) {
    const fPath = path.join(ROOT, relPath)
    if (!fs.existsSync(fPath)) {
      console.log(`⚠️ File not found: ${fPath}`)
      continue
    }

    const content = fs.readFileSync(fPath, 'utf8')
    
    // Find the closing bracket ']' of the flashcards array
    const closingBracketIndex = content.lastIndexOf(']')
    if (closingBracketIndex === -1) {
      console.error(`❌ Could not locate closing bracket of flashcards array in: ${fPath}`)
      continue
    }

    // Format new cards nicely as JS objects
    const formattedCards = allNewCards.map(c => {
      const termEscaped = c.term.replace(/'/g, "\\'")
      const defEscaped = c.definition.replace(/'/g, "\\'")
      return `  { id: '${c.id}', topic: '${c.topic}', term: '${termEscaped}', definition: '${defEscaped}' }`
    }).join(',\n')

    // Construct new content
    const banner = `\n  // ── HUMANITIES (ENGLISH, GLOBAL, US HISTORY) ─────────────────────────────\n`
    const updatedContent = content.slice(0, closingBracketIndex) + banner + formattedCards + ',\n' + content.slice(closingBracketIndex)

    fs.writeFileSync(fPath, updatedContent)
    console.log(`✅ Appended ${allNewCards.length} flashcards to ${relPath}`)
  }

  console.log('\n🎉 Finished adding humanities flashcards!')
}

run()
