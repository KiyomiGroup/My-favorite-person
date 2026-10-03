# HANDOFF: finish "For My Favorite Human" (Stages 4, 5, 6)

How to use this file in a NEW Claude chat:
1. Upload the latest project ZIP (or the unzipped files).
2. Paste the original MASTER PROJECT PROMPT too (it holds the exact love letter and wording).
3. Paste: "Read HANDOFF.md and the master prompt. Build Stage 4 only, following the rules, then give me an updated ZIP." Repeat for 5 and 6.

## Status
- Stage 1 (Love Confirmation): DONE (`src/stages/Stage1.tsx`)
- Stage 2 (Love Measurement Test): DONE (`Stage2.tsx`)
- Stage 3 (Millionaire + lifelines): DONE (`Stage3.tsx`)
- Stage 4 (Adun Encyclopedia): DONE (`Stage4.tsx`)
- Stage 5 (Performance Review): DONE (`Stage5.tsx`; reusable `lib/useRoaming.ts` hook)
- Stage 6 (Final Reward + Love Letter): DONE (`Stage6.tsx`, `components/FinalLetter.tsx`). PROJECT COMPLETE.

## Project facts
- React 18 + TypeScript + Vite. No backend. Static site for GitHub Pages. `npm run build` must pass (it type-checks).
- Global state: `useReducer` in `src/App.tsx` (stage, muted). Stage renders are chosen there; `ComingNext` is the placeholder for unbuilt stages. Advance with the `onNext` prop (guarded against double-click skipping).
- All text/quiz data goes in `src/config/content.ts` (export one object per stage, reuse the `QuizOption` type: `{id, text, correct?, feedback?}`).
- Photos: `src/config/images.ts` (`photos.opening | scrapbook | letter`), shown with `components/Photo.tsx`. Never invent photos; the CSS fallback must look finished.
- Existing reusable pieces: `AnswerOption` (icon + style for wrong/correct, not colour alone), `Modal`, `HeartBurst`, `FloatingHearts` (has `slow` prop), `Progress`, `Heart`, `LoveMeter`, `SoundToggle`, `lib/sound.ts` (`sfx.pop/buzz/win/envelope`, respects mute, no autoplay).
- Pattern for a stage: component in `src/stages/StageN.tsx`, text in `content.ts`, styles appended to `src/styles.css`, wire in `App.tsx`. A stage with its own theme (like Stage 3's dark set) uses a class on `.app` plus a `body` class effect in `App.tsx`.
- Palette tokens are CSS variables in `styles.css` (blush #FFF1F4, soft pink #FFD6E0, pink #F28BA8, cherry #E84A68, wine #76283F, cream #FFF9F0, text #35232A, muted #886F78, success #4F8B69, error #D93650). Fonts: Fredoka (headings), DM Sans (body), Caveat (handwriting).

## Rules that apply to every stage
- Mobile first. Test at 320, 375, 390, 430px. Single column, 44px+ touch targets, no hover dependence, no horizontal overflow, safe areas and `dvh`.
- Wrong answers: shake, show the exact playful message, allow retry. Correct answers: celebration, message, then a continue button. Never auto-advance.
- Respect `prefers-reduced-motion` (already global in CSS; check new animations). No heavy infinite animations. Clean up timers/listeners in `useEffect`.
- Real `<button>`s, visible focus, aria-live for feedback, not colour alone. Keep contrast readable.
- Don't add dependencies. Keep the base-aware image URL helper for all local images.
- Keep the "For all times. Always." phrase out of Stages 4 and 5 (only a tiny, understated infinity touch at most). It belongs on the opening screen and in the final letter.
- Update the README status line, run `npm run build`, delete `dist`, zip without `node_modules`.

## STAGE 4: THE ADUN ENCYCLOPEDIA
Look: personal scrapbook. Cream and blush surfaces, stickers, handwritten annotations, rounded question cards. Include the scrapbook photo slot (`photos.scrapbook`) as a taped polaroid.
Heading: **Enough About You. Let's Talk About Your Girl.**
Text: "Let's see whether you've actually been paying attention to me."
Three questions, ONE at a time, with "Question 1 of 3" and a small progress indicator. Data lives in `content.ts`.
1. What is the quickest way to make Adun happy? A. Buy her an expensive car. B. Give her attention, affection, and quality time. (correct) C. Leave her alone for three business days. D. Send her ₦50 and say "manage this." 😂 → wrong feedback: "Interesting. Is this your first day knowing me?"
2. When Adun says "I'm fine," what should you do? A. Say "okay" and disappear. B. Start playing FIFA. C. Check in gently and give her room to tell you how she feels. (correct) D. Submit a formal written inquiry. → wrong: "Sir, emotional intelligence is also part of the curriculum."
3. What is Adun's favourite thing about you? A. Your kindness. B. Your sense of humour. C. The way you make her feel. D. All the little things that make you uniquely you. (correct) → wrong: "You're making me explain why I love you? In this economy?"
Each correct answer: small success animation + a brief affectionate message; advance to the next question only when he taps continue. Wrong answers can be retried.
After question 3 is correct show: "Okay, okay. You actually pay attention. I'm impressed. Don't let it get to your head. 💗" then a button to Stage 5.

## STAGE 5: THE BOYFRIEND PERFORMANCE REVIEW
Look: adorable, ridiculous employee evaluation card, animated progress bars, a playful approval stamp.
Heading: **BOYFRIEND PERFORMANCE REVIEW**
Text: "Welcome to your annual evaluation. HR stands for Heart and Romance, and Adun is the entire department."
Metrics (funny labels, animated bars):
- Handsomeness: 100/10
- Ability to distract Adun: Unreasonably high
- Annoying tendencies: Under investigation
- Ability to make Adun smile: Classified information
- Boyfriend privileges: PERMANENTLY APPROVED ❤️
Question: **Do you accept your position as Adun's favourite person?**
Buttons: "YES, MA'AM ❤️" and "I NEED TO CONSULT MY LAWYER".
The lawyer button dodges ONCE (stays inside its area, works on touch like the Stage 1 NO button), then shows: "Your lawyer has advised you to click YES." After that it should stay put and be clickable, with the message still showing (don't trap him).
YES shows: **EMPLOYMENT CONFIRMED.** + "Salary: kisses, hugs, love, and occasional premium-grade nagging." then a button **CLAIM YOUR EMPLOYEE BENEFITS →** to Stage 6.

## STAGE 6: THE FINAL REWARD + LOVE LETTER
Part A, the reward quiz. Climactic "game level" screen.
Heading: **You Have Survived.**
Text: "You have survived the questions, the accusations, and the emotional warfare. You may now claim your reward."
Question: **What would you like to claim?** A. One million kisses 💋 B. Unlimited hugs 🫂 C. A very long cuddle session 🧸 D. All of the above, because I'm dating Adun and I know my rights. 👑 (only D is correct)
Wrong feedback (all of A, B, C): "Interesting. So you want to negotiate with the woman who controls your rewards?" Allow retry.
On D: fade the background gently, switch `FloatingHearts` to `slow`, show an illustrated envelope with a wax seal (CSS/SVG), play `sfx.envelope()`, subtle entrance animation. Show "One last thing, baby. This part is not a game. ❤️" then button **OPEN YOUR LETTER 💌**. The letter is only reachable after D.

Part B, the letter (the emotional centre). Tone shift: calm. Remove game elements, reduce motion, cream paper, generous spacing, readable serif or comfortable body type, subtle decorative hearts. The ENTIRE letter is in ONE scrollable view, never clipped in a fixed-height container, never split into forced clicks. Use `photos.letter` near the letter (CSS fallback if absent).
- Use the exact letter text from sections 12 and 13 of the master prompt (starts "Happy Boyfriend's Day, My Love ❤️ / Baby,").
- Placement of the inside joke: near the end, after the main message and before the signature, add: "Whatever life brings us, I hope we keep finding our way back to the little things that make us us. Our jokes, our memories, our ridiculous conversations, and those two little words that somehow say so much."
- Then, on separate lines with their own treatment (big vertical spacing, elegant type, a restrained ♾️ motif, a slow subtle fade-in as it scrolls into view, intimate not game-like): **For all times.** then **Always. ❤️♾️**
- Sign-off: "Your favorite human, for all times." then **Adun ❤️**
- Provide a **Replay** button at the end that resets ALL state (stage 1, muted preference may be kept).
- Letter text should live in `content.ts` (an array of paragraphs with a flag for bold lines) so it is easy to edit.
- Reduced-motion: the fade-ins must simply appear.

## Final QA checklist (run before delivering the final ZIP)
All six stages render; works at 320/375/390/430px; NO and lawyer buttons work by touch and stay in bounds; every wrong message is exact; retries work; only correct answers advance; lifelines single-use; progress shows 1/6 to 6/6; D unlocks the letter only; letter complete and scrollable on mobile; photos optional without broken images; sound toggle works; Replay resets everything; reduced motion respected; production build passes with the GitHub Pages base path (`VITE_BASE=/boyfriend-day/ npm run build`); no console errors.
