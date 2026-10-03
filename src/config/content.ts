/**
 * EDITABLE CONTENT
 * Every piece of text for each stage lives here. Stages 2-6 will be added
 * to this file as we build them.
 */
export const TOTAL_STAGES = 6

export const stage1 = {
  annotation: 'A little something for my favorite human…',
  heading: 'Hello, handsome. 💌',
  intro: 'Before you proceed, we need to establish something very important.',
  question: 'Do you love Adun?',
  yes: 'YES, OBVIOUSLY ❤️',
  no: 'NO 🙄',
  insideJoke: 'For all times. Always. ♾️',
  successMessage: 'I KNEW IT. This man is obsessed with me. 🥰',
  proceed: 'PROCEED, LOVER BOY →',
  /** Shown for NO attempts 1, 2 and 3. */
  firstNoReactions: [
    'EXCUSE ME??? 🤨',
    'No, no, no. You know you love her.',
    'Boy, stop embarrassing yourself.',
  ],
  /** Cycled from the 4th NO attempt onward. */
  laterNoReactions: [
    'Adun is watching you. 👀',
    'You really thought that would work?',
    'Wrong answer, handsome.',
    'Be serious for once.',
    "We both know that's a lie.",
    'The audacity is actually impressive.',
  ],
}

export interface QuizOption {
  id: string
  text: string
  correct?: boolean
  /** Playful message shown when this wrong option is picked. */
  feedback?: string
}

export const stage2 = {
  heading: "Let's Measure Something Important.",
  intro: "Since we're being honest, let's measure just how much you love being loved by me.",
  question: 'How much do you think Adun loves you?',
  wrongLabel: 'WRONG!',
  successMessage: 'CORRECT! Finally, some academic excellence in this relationship. ❤️',
  proceed: "LET'S SEE IF YOU'RE ACTUALLY SMART →",
  options: [
    { id: 'A', text: 'A little bit 🥹', feedback: "A LITTLE BIT??? Who is this woman you think you're dating?" },
    { id: 'B', text: 'Quite a lot 💗', feedback: 'Quite a lot? Sir, this is not a school assignment. Try again.' },
    { id: 'C', text: 'More than you deserve 😌', feedback: "You're getting warmer, but your confidence is concerning." },
    {
      id: 'D',
      text: 'An amount that cannot be measured by human science, mathematics, or common sense. ♾️❤️',
      correct: true,
    },
  ] as QuizOption[],
}

export const stage3 = {
  heading: "WHO WANTS TO BE ADUN'S MILLIONAIRE?",
  intro: 'Welcome, contestant. Your relationship is on the line. You have one question. Use your brain wisely.',
  question: 'According to Adun, her boyfriend is a…',
  wrongLabel: 'WRONG!',
  winTitle: 'THAT IS CORRECT! 🏆',
  winText: 'You have won one million imaginary naira and the privilege of dating Adun for another day. Congratulations, genius.',
  proceed: 'ON TO THE NEXT ROUND →',
  options: [
    { id: 'A', text: 'Genius 🧠', correct: true },
    { id: 'B', text: 'Annoying little creature 🙄', feedback: 'FINAL ANSWER??? You have known this woman for how long?' },
    { id: 'C', text: 'Condescending know-it-all 🤓', feedback: 'Adun would like to speak to your manager.' },
    { id: 'D', text: 'A suspiciously handsome man who needs to be studied 🔬', feedback: 'Handsome, yes. But did you answer the question?' },
  ] as QuizOption[],
  lifelines: [
    { id: 'ask', label: 'ASK ADUN', icon: '🙋🏾‍♀️' },
    { id: 'fifty', label: '50/50', icon: '✂️' },
    { id: 'call', label: 'CALL YOUR GIRLFRIEND', icon: '📞' },
  ] as { id: 'ask' | 'fifty' | 'call'; label: string; icon: string }[],
  modals: {
    ask: { title: 'ASK ADUN', lines: ["Adun says you're overthinking it. Pick A."] },
    call: { title: 'CALL YOUR GIRLFRIEND', lines: ['Your girlfriend has one thing to say:', 'PICK A, BABY.'] },
  },
  closeLabel: 'GOT IT',
}

export interface EncyclopediaQuestion {
  id: string
  question: string
  /** Little handwritten scrapbook note beside the question. */
  note: string
  options: QuizOption[]
  /** Shown when the right answer is picked. */
  correctMessage: string
}

export const stage4 = {
  heading: "Enough About You. Let's Talk About Your Girl.",
  intro: "Let's see whether you've actually been paying attention to me.",
  wrongLabel: 'WRONG!',
  next: 'NEXT QUESTION →',
  finalMessage: "Okay, okay. You actually pay attention. I'm impressed. Don't let it get to your head. 💗",
  proceed: 'ON TO YOUR REVIEW →',
  questions: [
    {
      id: 'q1',
      question: 'What is the quickest way to make Adun happy?',
      note: 'easy one…',
      correctMessage: 'Attention, affection, and time together. See? You do know me. 💗',
      options: [
        { id: 'A', text: 'Buy her an expensive car.', feedback: 'Interesting. Is this your first day knowing me?' },
        { id: 'B', text: 'Give her attention, affection, and quality time.', correct: true },
        { id: 'C', text: 'Leave her alone for three business days.', feedback: 'Interesting. Is this your first day knowing me?' },
        { id: 'D', text: 'Send her ₦50 and say “manage this.” 😂', feedback: 'Interesting. Is this your first day knowing me?' },
      ],
    },
    {
      id: 'q2',
      question: 'When Adun says “I’m fine,” what should you do?',
      note: 'pay attention!',
      correctMessage: 'A gentle check-in and room to talk. Exactly right. 🥰',
      options: [
        { id: 'A', text: 'Say “okay” and disappear.', feedback: 'Sir, emotional intelligence is also part of the curriculum.' },
        { id: 'B', text: 'Start playing FIFA.', feedback: 'Sir, emotional intelligence is also part of the curriculum.' },
        { id: 'C', text: 'Check in gently and give her room to tell you how she feels.', correct: true },
        { id: 'D', text: 'Submit a formal written inquiry.', feedback: 'Sir, emotional intelligence is also part of the curriculum.' },
      ],
    },
    {
      id: 'q3',
      question: 'What is Adun’s favourite thing about you?',
      note: 'no pressure 😌',
      correctMessage: 'All of it. Every little thing that makes you you. ❤️',
      options: [
        { id: 'A', text: 'Your kindness.', feedback: 'You’re making me explain why I love you? In this economy?' },
        { id: 'B', text: 'Your sense of humour.', feedback: 'You’re making me explain why I love you? In this economy?' },
        { id: 'C', text: 'The way you make her feel.', feedback: 'You’re making me explain why I love you? In this economy?' },
        { id: 'D', text: 'All the little things that make you uniquely you.', correct: true },
      ],
    },
  ] as EncyclopediaQuestion[],
}

export interface Metric {
  label: string
  value: string
  /** Bar fill, 0-100. */
  pct: number
  kind?: 'normal' | 'investigating' | 'classified'
}

export const stage5 = {
  heading: 'BOYFRIEND PERFORMANCE REVIEW',
  intro: 'Welcome to your annual evaluation. HR stands for Heart and Romance, and Adun is the entire department.',
  fileLabel: 'Employee: Boyfriend',
  stamp: 'APPROVED',
  metrics: [
    { label: 'Handsomeness', value: '100/10', pct: 100 },
    { label: 'Ability to distract Adun', value: 'Unreasonably high', pct: 96 },
    { label: 'Annoying tendencies', value: 'Under investigation', pct: 55, kind: 'investigating' },
    { label: 'Ability to make Adun smile', value: 'Classified information', pct: 100, kind: 'classified' },
    { label: 'Boyfriend privileges', value: 'PERMANENTLY APPROVED ❤️', pct: 100 },
  ] as Metric[],
  question: "Do you accept your position as Adun's favourite person?",
  yes: "YES, MA'AM ❤️",
  lawyer: 'I NEED TO CONSULT MY LAWYER',
  lawyerAdvice: 'Your lawyer has advised you to click YES.',
  confirmedTitle: 'EMPLOYMENT CONFIRMED.',
  confirmedText: 'Salary: kisses, hugs, love, and occasional premium-grade nagging.',
  proceed: 'CLAIM YOUR EMPLOYEE BENEFITS →',
}

export const stage6 = {
  annotation: 'final level ✨',
  heading: 'You Have Survived.',
  intro: 'You have survived the questions, the accusations, and the emotional warfare. You may now claim your reward.',
  question: 'What would you like to claim?',
  wrongLabel: 'WRONG!',
  wrongFeedback: 'Interesting. So you want to negotiate with the woman who controls your rewards?',
  options: [
    { id: 'A', text: 'One million kisses 💋', feedback: 'Interesting. So you want to negotiate with the woman who controls your rewards?' },
    { id: 'B', text: 'Unlimited hugs 🫂', feedback: 'Interesting. So you want to negotiate with the woman who controls your rewards?' },
    { id: 'C', text: 'A very long cuddle session 🧸', feedback: 'Interesting. So you want to negotiate with the woman who controls your rewards?' },
    { id: 'D', text: "All of the above, because I'm dating Adun and I know my rights. 👑", correct: true },
  ] as QuizOption[],
  envelopeLine: 'One last thing, baby. This part is not a game. ❤️',
  openLetter: 'OPEN YOUR LETTER 💌',
  replay: '↺ Replay from the beginning',
}

/**
 * THE LOVE LETTER
 * Edit freely. Wrap text in **double asterisks** to make it bold.
 * Order on the page: title → before → jokeIntro → jokeLine1/2 → after → signoff → name.
 */
export const letter = {
  title: "Happy Boyfriend's Day, My Love ❤️",
  before: [
    'Baby,',
    "If you've made it this far, congratulations. You've officially survived my nonsense, passed my extremely biased examinations, and proven that you deserve to keep your position as my boyfriend. 😂❤️",
    'But seriously, my love, I made this little website because I wanted to do something different for you. Something that would make you laugh, make you roll your eyes at me, and hopefully leave you blushing at your screen.',
    'And somewhere between all the jokes, I wanted you to know something.',
    "**You have changed my life in ways I don't think you fully understand.**",
    'There is something so beautiful about having someone come into your life and make things feel different simply by being in it. Someone who gives you new reasons to smile, new memories to look forward to, and little moments that end up meaning so much more than you expected.',
    'You have brought so much into my life, baby. You have made ordinary moments feel special, given me reasons to smile when I least expect it, and reminded me how beautiful it can be to have someone you genuinely care about.',
    'And I hope you know that I see you, too.',
    'Not just as my boyfriend, but as the person you are. Your mind, your heart, your personality, your ridiculousness, your little habits, and all the things that make you uniquely you. Even the annoying things. Unfortunately, those have been included in the package. No refunds. 😂',
    "I think you're amazing. And I hope that, in the moments when you forget that, I can remind you.",
    "I hope I make you feel loved, appreciated, wanted, and understood. I hope you know that you don't have to be perfect to be precious to me. You can have your off days, your worries, your uncertainties, and your moments when you don't have everything figured out. You are still someone I admire and someone I'm grateful to have in my life.",
    'Thank you for being you. Thank you for the happiness you have brought into my life, for the memories we have made, and for all the little moments that belong only to us.',
    "I don't know every beautiful thing the future has waiting for us, but I know I'm grateful that I get to share this part of my life with you.",
    "And if I could give you one thing today, it would be the ability to see yourself through my eyes for just a moment. Maybe then you'd understand why I think you're so special, why you make me smile the way you do, and why, out of all the people in this world, **you are the person I want to celebrate today.**",
    'So, Happy Boyfriend\'s Day, my handsome boy.',
    'I hope life is kind to you. I hope your dreams find their way to you. I hope you keep growing into the person you want to become. And I hope you never run out of reasons to laugh, to dream, or to feel loved.',
    'Because you deserve good things, baby. So many of them.',
    "And just in case the entire website hasn't made it obvious yet...",
    'I love you. More than my little quizzes can measure, more than my dramatic buttons can communicate, and definitely more than any multiple-choice answer could ever explain.',
    "Now come and collect your kisses. You've earned them. 💋❤️",
  ],
  jokeIntro:
    'Whatever life brings us, I hope we keep finding our way back to the little things that make us us. Our jokes, our memories, our ridiculous conversations, and those two little words that somehow say so much.',
  jokeLine1: 'For all times.',
  jokeLine2: 'Always. ❤️♾️',
  after: ["**Happy Boyfriend's Day, my love.**"],
  signoff: 'Your favorite human, for all times.',
  name: 'Adun ❤️',
}
