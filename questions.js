// ================================================================
//  EDIT THIS FILE to change Ava's onboarding chat
// ================================================================
//
//  SKIP_TO — land on a specific scene instantly (great for testing)
//  Set to: 'welcome' | 'chat' | 'generate' | 'customize' | 'arrival' | 'party'
//  Set to null to start normally from the welcome screen.
//
window.SKIP_TO = null;

// ----------------------------------------------------------------
//  FAL_API_KEY — local dev only.
//  Leave empty when deploying to Netlify — the key lives in
//  Netlify dashboard → Site → Environment variables → FAL_API_KEY
//  and is called server-side via netlify/functions/generate-avatar.js
//
window.FAL_API_KEY = '';

// ----------------------------------------------------------------
//  QUESTIONS — the chat flow, in order
//
//  Each question needs:
//    id          a key saved to the profile (e.g. 'name', 'feel')
//    kind        'text'       → free-type input
//                'choice'     → tap-to-pick buttons
//                'appearance' → combined picker: groups of swatches/chips
//                               answered all-at-once before advancing
//    ava         what Ava says before the input appears
//                  • array of strings  ["line 1", "line 2"]
//                  • or a function of the previous answer:
//                    (prevAnswer) => ["line 1", "line 2"]
//    placeholder (text only)   hint inside the text box
//    options     (choice only) [{ v: 'label', emoji: '🎵' }, ...]
//    writeIn     (choice only, optional) shows a custom write-in button
//    groups      (appearance only) array of { id, label, options: [{ v, emoji?, color? }] }
//                  color  → renders as a round colour swatch instead of a chip
// ----------------------------------------------------------------

window.QUESTIONS = [
  {
    id: 'name',
    kind: 'text',
    ava: [
      "So glad you're here — I've been looking forward to this.",
      "First things first, what's your name?",
    ],
    placeholder: 'your name',
  },
  {
    id: 'identity',
    kind: 'text',
    ava: (n) => [
      `${n}, love that. Welcome.`,
      "Tell me — who do you want to be tonight? Just a couple of words.",
    ],
    placeholder: 'e.g. untouchable, soft and devastating, chaotic glamour',
  },
  {
    id: 'song',
    kind: 'text',
    ava: () => [
      "Yes. I can already picture it.",
      "One more — if you had a theme song walking in tonight, what would it be?",
    ],
    placeholder: 'a song, an artist, a vibe',
  },
  {
    id: 'feel',
    kind: 'choice',
    ava: () => [
      "Perfect. Now this is the fun part.",
      "When you walk into a room, how do you want people to feel?",
    ],
    options: [
      { v: 'intrigued',      emoji: '👀' },
      { v: 'charmed',        emoji: '🫶' },
      { v: 'underestimated', emoji: '😌' },
      { v: 'a little feral', emoji: '🔥' },
    ],
    writeIn: 'or write your own feeling',
  },
  {
    id: 'appearance',
    kind: 'appearance',
    ava: (v) => [
      `${v[0].toUpperCase() + v.slice(1)} — I love that for you.`,
      "Almost done! Just a few details so I can get the look right.",
    ],
    groups: [
      {
        id: 'presents',
        label: 'Presenting as',
        options: [
          { v: 'Female',      emoji: '♀' },
          { v: 'Male',        emoji: '♂' },
          { v: 'Non-binary',  emoji: '⚧' },
          { v: 'surprise me', emoji: '✨' },
        ],
      },
      {
        id: 'hair',
        label: 'Hair colour',
        options: [
          { v: 'blonde',   color: '#e8d5a3' },
          { v: 'brunette', color: '#5c3317' },
          { v: 'black',    color: '#1a1a1a' },
          { v: 'red',      color: '#b22222' },
          { v: 'silver',   color: '#c0c0c0' },
          { v: 'pink',     color: '#e75480' },
          { v: 'blue',     color: '#4169e1' },
        ],
      },
      {
        id: 'eyes',
        label: 'Eye colour',
        options: [
          { v: 'brown',  color: '#6b3a2a' },
          { v: 'blue',   color: '#4682b4' },
          { v: 'green',  color: '#228b22' },
          { v: 'hazel',  color: '#8b7355' },
          { v: 'grey',   color: '#808080' },
          { v: 'amber',  color: '#ffbf00' },
        ],
      },
    ],
  },
];
