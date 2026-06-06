import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { T, duoBtn, elevatedCard } from '../styles/duo';
import { QUESTIONS, PET_RESULTS, computePetMatch } from '../data/petPersonality';

const LETTER_COLORS = ['#1CB0F6', '#CE82FF', '#FF9600', '#FF4B4B'];

export default function PetPersonalityQuizScreen({ navigation }) {
  const { C } = useTheme();
  const styles = makeStyles(C);

  // State management
  const [phase, setPhase] = useState('intro'); // 'intro' | 'quiz' | 'result'
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ O: 0, C: 0, E: 0, A: 0, N: 0 });
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [petResult, setPetResult] = useState(null);

  const currentQuestion = QUESTIONS[questionIndex];

  // Handle answer selection
  const handleChoose = (choiceIndex) => {
    if (selectedChoice !== null) return; // Prevent double-tap

    setSelectedChoice(choiceIndex);

    // Auto-advance after 0.8s
    const timer = setTimeout(() => {
      const newScores = {
        ...scores,
        [currentQuestion.trait]:
          scores[currentQuestion.trait] + currentQuestion.choices[choiceIndex].score,
      };
      setScores(newScores);

      if (questionIndex < QUESTIONS.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setSelectedChoice(null);
      } else {
        // Quiz complete
        const pet = computePetMatch(newScores);
        setPetResult(pet);
        setPhase('result');
      }
    }, 800);

    return () => clearTimeout(timer);
  };

  // Reset quiz
  const handleRetake = () => {
    setPhase('intro');
    setQuestionIndex(0);
    setSelectedChoice(null);
    setScores({ O: 0, C: 0, E: 0, A: 0, N: 0 });
    setPetResult(null);
  };

  // --- INTRO PHASE ---
  if (phase === 'intro') {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.introHero}>
            <Text style={[T.h1, styles.heroEmoji]}>🐾</Text>
            <Text style={[T.h2, styles.heroTitle]}>Find Your Perfect Pet</Text>
          </View>

          <Text style={[T.body, styles.introDescription]}>
            Answer 10 quick questions and discover which pet matches your personality!
            Based on your unique traits, we'll suggest your ideal companion.
          </Text>

          <View style={styles.traitsPreview}>
            <Text style={[T.label, styles.traitsTitle]}>We measure:</Text>
            <Text style={[T.body, styles.traitsText]}>
              • Openness to experience{'\n'}
              • Conscientiousness{'\n'}
              • Extraversion{'\n'}
              • Agreeableness{'\n'}
              • Emotional sensitivity
            </Text>
          </View>

          <TouchableOpacity
            style={duoBtn('#58CC02', '#3D8B02')}
            onPress={() => setPhase('quiz')}
          >
            <Text style={[T.btn, { color: '#FFF' }]}>Start Quiz →</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // --- QUIZ PHASE ---
  if (phase === 'quiz') {
    const progress = (questionIndex + 1) / QUESTIONS.length;

    return (
      <View style={styles.container}>
        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>

        <ScrollView contentContainerStyle={styles.quizContent}>
          {/* Question number */}
          <Text style={[T.small, styles.questionNumber]}>
            Question {questionIndex + 1} of {QUESTIONS.length}
          </Text>

          {/* Question text */}
          <Text style={[T.h3, styles.questionText]}>{currentQuestion.text}</Text>

          {/* Choice buttons */}
          <View style={styles.choicesContainer}>
            {currentQuestion.choices.map((choice, idx) => {
              const isSelected = selectedChoice === idx;
              const letterColor = LETTER_COLORS[idx];
              const letter = String.fromCharCode(65 + idx); // A, B, C, D

              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.choiceRow,
                    isSelected && styles.choiceRowSelected,
                  ]}
                  onPress={() => handleChoose(idx)}
                  disabled={selectedChoice !== null}
                  activeOpacity={0.7}
                >
                  {/* Letter badge */}
                  <View
                    style={[
                      styles.letterBadge,
                      { backgroundColor: letterColor, opacity: isSelected ? 1 : 0.7 },
                    ]}
                  >
                    <Text style={[T.label, styles.letterText]}>{letter}</Text>
                  </View>

                  {/* Choice text */}
                  <Text
                    style={[
                      T.body,
                      styles.choiceText,
                      isSelected && styles.choiceTextSelected,
                    ]}
                  >
                    {choice.text}
                  </Text>

                  {/* Right chevron (if selected) */}
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  // --- RESULT PHASE ---
  if (phase === 'result' && petResult) {
    const pet = PET_RESULTS[petResult];

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.resultContent}>
          {/* Pet emoji hero */}
          <Text style={styles.petEmoji}>{pet.emoji}</Text>

          {/* Pet name */}
          <Text style={[T.h1, styles.petName]}>{pet.name}</Text>

          {/* Tagline */}
          <Text style={[T.body, styles.petTagline]}>{pet.tagline}</Text>

          {/* Description card */}
          <View style={[elevatedCard(C), styles.descriptionCard]}>
            <Text style={[T.body, styles.descriptionText]}>
              {pet.description}
            </Text>
          </View>

          {/* Tips section */}
          <View style={styles.tipsSection}>
            <Text style={[T.label, styles.tipsTitle]}>Your person tips:</Text>
            {pet.tips.map((tip, idx) => (
              <View key={idx} style={styles.tipRow}>
                <Text style={[T.body, styles.tipNumber]}>{idx + 1}.</Text>
                <Text style={[T.body, styles.tipText]}>{tip}</Text>
              </View>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={duoBtn('#58CC02', '#3D8B02')}
              onPress={handleRetake}
            >
              <Text style={[T.btn, { color: '#FFF' }]}>Retake Quiz</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[T.body, { color: C.brand }]}>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return null;
}

const makeStyles = (C) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: C.bg,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 60,
      paddingBottom: 40,
    },
    quizContent: {
      padding: 20,
      paddingTop: 80,
      paddingBottom: 40,
    },
    resultContent: {
      padding: 20,
      paddingTop: 60,
      paddingBottom: 40,
      alignItems: 'center',
    },

    // --- INTRO ---
    introHero: {
      alignItems: 'center',
      marginBottom: 40,
    },
    heroEmoji: {
      fontSize: 80,
      marginBottom: 12,
    },
    heroTitle: {
      textAlign: 'center',
      color: C.text,
    },
    introDescription: {
      color: C.text,
      lineHeight: 24,
      marginBottom: 32,
      textAlign: 'center',
    },
    traitsPreview: {
      backgroundColor: C.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 40,
    },
    traitsTitle: {
      color: C.brand,
      marginBottom: 8,
    },
    traitsText: {
      color: C.text,
      lineHeight: 22,
    },

    // --- QUIZ ---
    progressBarContainer: {
      height: 4,
      backgroundColor: C.surface,
      width: '100%',
    },
    progressBar: {
      height: 4,
      backgroundColor: C.brand,
    },
    questionNumber: {
      color: C.textMuted,
      marginBottom: 8,
    },
    questionText: {
      color: C.text,
      marginBottom: 24,
      lineHeight: 28,
    },
    choicesContainer: {
      gap: 12,
    },
    choiceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: C.surface,
      borderRadius: 8,
      padding: 16,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    choiceRowSelected: {
      backgroundColor: `${C.brand}15`,
      borderColor: C.brand,
    },
    letterBadge: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    letterText: {
      color: '#FFF',
      fontWeight: '700',
    },
    choiceText: {
      flex: 1,
      color: C.text,
      lineHeight: 20,
    },
    choiceTextSelected: {
      fontWeight: '600',
    },
    checkmark: {
      fontSize: 18,
      color: C.brand,
      marginLeft: 8,
    },

    // --- RESULT ---
    petEmoji: {
      fontSize: 120,
      marginBottom: 16,
    },
    petName: {
      color: C.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    petTagline: {
      color: C.textMuted,
      fontStyle: 'italic',
      marginBottom: 24,
      textAlign: 'center',
    },
    descriptionCard: {
      backgroundColor: C.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 28,
      width: '100%',
    },
    descriptionText: {
      color: C.text,
      lineHeight: 24,
      textAlign: 'center',
    },
    tipsSection: {
      width: '100%',
      marginBottom: 32,
    },
    tipsTitle: {
      color: C.brand,
      marginBottom: 12,
    },
    tipRow: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    tipNumber: {
      color: C.brand,
      fontWeight: '700',
      marginRight: 8,
      minWidth: 20,
    },
    tipText: {
      flex: 1,
      color: C.text,
      lineHeight: 20,
    },
    buttonRow: {
      width: '100%',
      marginBottom: 16,
    },
    backButton: {
      padding: 12,
      alignItems: 'center',
    },
  });
