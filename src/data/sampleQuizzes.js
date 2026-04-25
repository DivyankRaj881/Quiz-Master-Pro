export const sampleQuizzes = [
  {
    id: 'frontend-basics',
    title: 'Frontend Basics',
    description: 'Start with HTML, CSS, and JavaScript fundamentals.',
    questions: [
      {
        id: 'q1',
        text: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Text Machine Language',
          'Hyperlink Text Markdown Language',
          'Home Tool Markup Language',
        ],
        correctIndex: 0,
        explanation:
          'HTML expands to Hyper Text Markup Language and is used to structure web content.',
      },
      {
        id: 'q2',
        text: 'Which CSS property controls text size?',
        options: ['font-style', 'text-size', 'font-size', 'text-style'],
        correctIndex: 2,
        explanation:
          '`font-size` defines the size of text; properties like `font-style` control italics/oblique.',
      },
      {
        id: 'q3',
        text: 'Which JavaScript method converts JSON string to object?',
        options: [
          'JSON.stringify()',
          'JSON.parse()',
          'JSON.convert()',
          'JSON.objectify()',
        ],
        correctIndex: 1,
        explanation:
          '`JSON.parse()` converts a JSON string into a JavaScript object, while `JSON.stringify()` does the reverse.',
      },
      {
        id: 'q4',
        text: 'Which keyword declares a block-scoped variable?',
        options: ['var', 'const', 'function', 'static'],
        correctIndex: 1,
        explanation:
          '`const` and `let` are block-scoped; `var` is function-scoped.',
      },
      {
        id: 'q5',
        text: 'Which HTML tag is used to define an unordered list?',
        options: ['<ol>', '<list>', '<ul>', '<li>'],
        correctIndex: 2,
        explanation:
          '`<ul>` creates an unordered list, while each list item is defined using `<li>`.',
      },
      {
        id: 'q6',
        text: 'Which hook is used for side effects in React?',
        options: ['useState', 'useMemo', 'useEffect', 'useRef'],
        correctIndex: 2,
        explanation:
          '`useEffect` handles side effects such as API calls, subscriptions, and timers.',
      },
    ],
  },
]
