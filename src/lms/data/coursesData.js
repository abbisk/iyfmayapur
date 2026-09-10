import gita from '../assets/gita.png';
import mantra from '../assets/mantra.jpeg';
import kirtan from '../assets/kirtan.jpg';

export const initialCourses = [
  {
    id: 'course-gita-101',
    title: 'Introduction to Bhagavad Gita',
    category: 'Youth',
    description: 'Explore the timeless wisdom of the Bhagavad Gita and its practical application in modern life.',
    longDescription: 'This course provides a comprehensive introduction to the core teachings of the Bhagavad Gita. Over several modules, you will explore the nature of the self, the concept of duty (dharma), and the path of yoga and devotion. Designed especially for youth seeking clarity, purpose, and direction in life.',
    price: '$29.99',
    imageUrl: gita,
    level: 'Beginner',
    duration: '2.5 Hours',
    modules: [
      {
        id: 'mod1',
        title: 'Module 1: Getting Started',
        lessons: [
          {
            id: 'l1',
            title: '1.1 The Context of the Gita',
            duration: '12 mins',
            videoUrl: 'https://www.youtube.com/embed/A8gE72pI4W4',
            resources: [{ title: 'Overview Handout (PDF)', url: '#' }]
          },
          {
            id: 'l2',
            title: '1.2 Understanding the Soul (Gita Ch. 2)',
            duration: '15 mins',
            videoUrl: 'https://www.youtube.com/embed/e1mH3g0lZgU',
            resources: [{ title: 'Chapter 2 Summary Notes', url: '#' }]
          }
        ]
      },
      {
        id: 'mod2',
        title: 'Module 2: Practical Application',
        lessons: [
          {
            id: 'l3',
            title: '2.1 Karma Yoga: The Art of Action',
            duration: '18 mins',
            videoUrl: 'https://www.youtube.com/embed/406W8Gv64kQ',
            resources: []
          },
          {
            id: 'l4',
            title: '2.2 Navigating Modern Stresses',
            duration: '20 mins',
            videoUrl: 'https://www.youtube.com/embed/Prc5S5p58Gg',
            resources: [{ title: 'Practical Exercises Guide', url: '#' }]
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'Who spoke the Bhagavad Gita to Arjuna?',
        options: ['Lord Krishna', 'Lord Shiva', 'Brahma', 'Vyasa'],
        answer: 'Lord Krishna'
      },
      {
        question: 'In which chapter of the Gita is the soul described as eternal and indestructible?',
        options: ['Chapter 1', 'Chapter 2', 'Chapter 4', 'Chapter 18'],
        answer: 'Chapter 2'
      },
      {
        question: 'What is Karma Yoga?',
        options: [
          'Path of meditation',
          'Path of selfless action',
          'Path of ritual worship',
          'Path of philosophical study'
        ],
        answer: 'Path of selfless action'
      }
    ]
  },
  {
    id: 'course-meditation-101',
    title: 'Meditation for Inner Peace',
    category: 'Youth',
    description: 'Learn simple yet profound meditation techniques to calm the mind and connect with your inner self.',
    longDescription: 'Find peace amidst the chaos of everyday life. This course covers the fundamentals of mantra meditation, focusing on the powerful Hare Krishna Maha Mantra. Learn how sound vibration impacts the mind, improves concentration, and establishes deep spiritual connection.',
    price: '$19.99',
    imageUrl: mantra,
    level: 'All levels',
    duration: '1.8 Hours',
    modules: [
      {
        id: 'med-mod1',
        title: 'Module 1: The Science of Sound',
        lessons: [
          {
            id: 'med-l1',
            title: '1.1 How Sound Shapes the Mind',
            duration: '10 mins',
            videoUrl: 'https://youtu.be/wLoxTowoBsk?si=Lw8WliphProRcwSU',
            resources: []
          },
          {
            id: 'med-l2',
            title: '1.2 Introduction to Mantra Meditation',
            duration: '15 mins',
            videoUrl: 'https://www.youtube.com/embed/e1mH3g0lZgU',
            resources: [{ title: 'Mantra Sheets (Printable)', url: '#' }]
          }
        ]
      },
      {
        id: 'med-mod2',
        title: 'Module 2: Daily Practice',
        lessons: [
          {
            id: 'med-l3',
            title: '2.1 Setting Up Your Meditation Space',
            duration: '12 mins',
            videoUrl: 'https://www.youtube.com/embed/406W8Gv64kQ',
            resources: []
          },
          {
            id: 'med-l4',
            title: '2.2 Chanting Japa: Guided Session',
            duration: '22 mins',
            videoUrl: 'https://www.youtube.com/embed/Prc5S5p58Gg',
            resources: [{ title: 'Audio Tracker', url: '#' }]
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the primary mantra practiced in this meditation course?',
        options: ['Om Namah Shivaya', 'Gayatri Mantra', 'Hare Krishna Maha Mantra', 'Om Mani Padme Hum'],
        answer: 'Hare Krishna Maha Mantra'
      },
      {
        question: 'What does "Japa" meditation involve?',
        options: [
          'Group singing',
          'Silent breathing',
          'Soft individual chanting on beads',
          'Stretching and poses'
        ],
        answer: 'Soft individual chanting on beads'
      }
    ]
  },
  {
    id: 'course-kirtan-101',
    title: 'The Art of Kirtan',
    category: 'Youth',
    description: 'Discover the power of mantra meditation through call-and-response chanting with musical instruments.',
    longDescription: 'Kirtan is the heart of Bhakti Yoga. In this course, you will learn the historical significance of Kirtan, the standard instruments used (mridanga, kartalas, harmonium), and how to lead or participate in ecstatic congregational chanting.',
    price: '$24.99',
    imageUrl: kirtan,
    level: 'Beginner',
    duration: '2 Hours',
    modules: [
      {
        id: 'kir-mod1',
        title: 'Module 1: Foundations of Kirtan',
        lessons: [
          {
            id: 'kir-l1',
            title: '1.1 History and Philosophy of Kirtan',
            duration: '14 mins',
            videoUrl: 'https://www.youtube.com/embed/A8gE72pI4W4',
            resources: []
          },
          {
            id: 'kir-l2',
            title: '1.2 The Spirit of Humility in Chanting',
            duration: '16 mins',
            videoUrl: 'https://www.youtube.com/embed/e1mH3g0lZgU',
            resources: []
          }
        ]
      },
      {
        id: 'kir-mod2',
        title: 'Module 2: Practical Rhythms',
        lessons: [
          {
            id: 'kir-l3',
            title: '2.1 Standard Kartala Beats (Cymbals)',
            duration: '15 mins',
            videoUrl: 'https://www.youtube.com/embed/406W8Gv64kQ',
            resources: [{ title: 'Kartala Beat Cheat Sheet', url: '#' }]
          },
          {
            id: 'kir-l4',
            title: '2.2 Basic Mridanga Mantras (Drumming)',
            duration: '25 mins',
            videoUrl: 'https://www.youtube.com/embed/Prc5S5p58Gg',
            resources: []
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'Which instrument is a double-sided clay/terracotta drum widely used in Kirtan?',
        options: ['Tabla', 'Mridanga', 'Harmonium', 'Dholak'],
        answer: 'Mridanga'
      },
      {
        question: 'What does "Kirtan" translate to?',
        options: ['Silent meditation', 'Glorification or congregational chanting', 'Ritual fire sacrifice', 'Yoga posture'],
        answer: 'Glorification or congregational chanting'
      }
    ]
  },
  {
    id: 'course-bhakti-sastri',
    title: 'Bhakti Sastri Course',
    category: 'Vedic',
    description: 'A deep systematic study of Bhagavad Gita, Nectar of Instruction, Nectar of Devotion, and Sri Isopanisad.',
    longDescription: 'Bhakti Sastri is a formal certification course in Vedic theology. It covers a detailed verse-by-verse analysis of key scriptures, exploring absolute philosophy, practical devotional service, and spiritual leadership principles.',
    price: 'Free',
    imageUrl: '/radha_madhava.jpg',
    level: 'Advanced',
    duration: '15 Hours',
    modules: [
      {
        id: 'bs-mod1',
        title: 'Module 1: Sri Isopanisad',
        lessons: [
          {
            id: 'bs-l1',
            title: '1.1 Invocation and Mantra 1: The Isavasya Principle',
            duration: '25 mins',
            videoUrl: 'https://www.youtube.com/embed/A8gE72pI4W4',
            resources: [{ title: 'Sri Isopanisad translation pdf', url: '#' }]
          },
          {
            id: 'bs-l2',
            title: '1.2 Understanding the Supreme Controller',
            duration: '30 mins',
            videoUrl: 'https://www.youtube.com/embed/e1mH3g0lZgU',
            resources: []
          }
        ]
      },
      {
        id: 'bs-mod2',
        title: 'Module 2: Nectar of Instruction',
        lessons: [
          {
            id: 'bs-l3',
            title: '2.1 Controlling the Six Urges (Upadesamrta Verse 1)',
            duration: '28 mins',
            videoUrl: 'https://www.youtube.com/embed/406W8Gv64kQ',
            resources: []
          },
          {
            id: 'bs-l4',
            title: '2.2 Positive and Negative Factors in Bhakti',
            duration: '35 mins',
            videoUrl: 'https://www.youtube.com/embed/Prc5S5p58Gg',
            resources: [{ title: 'Study Guide', url: '#' }]
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'Who compiled the Sri Isopanisad?',
        options: ['Srila Prabhupada', 'Srila Rupa Goswami', 'Srila Vyasadeva', 'Lord Chaitanya'],
        answer: 'Srila Vyasadeva'
      },
      {
        question: 'How many verses are there in the Sri Isopanisad?',
        options: ['11 verses', '18 verses', '108 verses', '700 verses'],
        answer: '18 verses'
      }
    ]
  },
  {
    id: 'course-vedic-cosmology',
    title: 'Vedic Cosmology & Science',
    category: 'Vedic',
    description: 'Explore the universe through the lens of Srimad Bhagavatam and modern scientific analogies.',
    longDescription: 'This course bridges the gap between Vedic description of the universe (from the Fifth Canto of Srimad Bhagavatam) and contemporary physical cosmology. Explore structural models of the universe, dimensional science, and the concept of time.',
    price: '$9.99',
    imageUrl: '/youth.jpg',
    level: 'Intermediate',
    duration: '4.5 Hours',
    modules: [
      {
        id: 'cos-mod1',
        title: 'Module 1: The Structure of the Universe',
        lessons: [
          {
            id: 'cos-l1',
            title: '1.1 The Vedic View of Space & Matter',
            duration: '20 mins',
            videoUrl: 'https://www.youtube.com/embed/A8gE72pI4W4',
            resources: []
          },
          {
            id: 'cos-l2',
            title: '1.2 The Concept of Bhu-mandala',
            duration: '25 mins',
            videoUrl: 'https://www.youtube.com/embed/e1mH3g0lZgU',
            resources: []
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'Which scripture contains detailed descriptions of Vedic cosmology?',
        options: ['Bhagavad Gita', 'Srimad Bhagavatam (Bhagavata Purana)', 'Ramayana', 'Rig Veda'],
        answer: 'Srimad Bhagavatam (Bhagavata Purana)'
      }
    ]
  }
];
