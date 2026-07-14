import gita from "../assets/gita.png";
import mantra from "../assets/mantra.jpeg";
import kirtan from "../assets/kirtan.jpg";

const lessonVideo = "https://www.youtube-nocookie.com/embed/np2Y1femUSU";

const makeLesson = (id, title, duration, question, options, answer, assignment) => ({
  id,
  title,
  duration,
  videoUrl: lessonVideo,
  description:
    "Watch the complete lesson, review the key idea, and check your understanding before moving forward.",
  quiz: { question, options, answer },
  assignment,
});

export const youthCourses = [
  {
    id: "course123",
    title: "Introduction to Bhagavad Gita",
    description:
      "Explore the timeless wisdom of the Bhagavad Gita and its practical application",
    price: "$29.99",
    imgeUrl: gita,
    imageUrl: gita,
    instructor: "IYF Mayapur Faculty",
    rating: "4.8",
    students: "1,240",
    level: "Beginner",
    lessons: [
      makeLesson(
        "gita-1",
        "Understanding the setting of the Gita",
        "12:24",
        "Where was the Bhagavad Gita spoken?",
        ["Vrindavan", "Kurukshetra", "Mayapur", "Mathura"],
        1,
        "In 150–200 words, explain why the setting of the Bhagavad Gita is important to its message."
      ),
      makeLesson(
        "gita-2",
        "Arjuna's dilemma",
        "16:08",
        "What prevented Arjuna from performing his duty?",
        ["Lack of skill", "Confusion and attachment", "Physical weakness", "A missing weapon"],
        1,
        "Describe one difficult decision from daily life and how clarity of purpose could help resolve it."
      ),
      makeLesson(
        "gita-3",
        "Applying timeless wisdom",
        "14:36",
        "Which practice helps us apply spiritual wisdom consistently?",
        ["Regular reflection", "Avoiding all action", "Winning every debate", "Ignoring questions"],
        0,
        "Create a seven-day plan with one practical Gita teaching you will apply each day."
      ),
    ],
  },
  {
    id: "course124",
    title: "Meditation for Inner Peace",
    description:
      "Learn simple yet profound meditation technique to calm the mind and connect with your inner self.",
    price: "$19.99",
    imgeUrl: mantra,
    imageUrl: mantra,
    instructor: "IYF Mayapur Faculty",
    rating: "4.9",
    students: "980",
    level: "All levels",
    lessons: [
      makeLesson(
        "meditation-1",
        "Preparing the mind",
        "09:42",
        "What is the best foundation for a meditation practice?",
        ["Consistency", "Expensive equipment", "A perfect location", "Long sessions only"],
        0,
        "Choose a regular time and place for meditation and explain why they suit your routine."
      ),
      makeLesson(
        "meditation-2",
        "Meditating with mantra",
        "13:18",
        "What should you do when the mind wanders?",
        ["Stop immediately", "Gently return to the mantra", "Judge yourself", "Change the mantra"],
        1,
        "Practice mantra meditation for ten minutes and record three observations about your attention."
      ),
      makeLesson(
        "meditation-3",
        "Building a daily practice",
        "11:55",
        "Which approach makes a new habit sustainable?",
        ["Start small and remain regular", "Wait for motivation", "Practice once a month", "Avoid tracking"],
        0,
        "Design a realistic fourteen-day meditation schedule, including how you will track completion."
      ),
    ],
  },
  {
    id: "course125",
    title: "The Art of Kirtan",
    description:
      "Discover the power of mantra meditation through call-and-response chanting with musical instruments.",
    price: "$24.99",
    imgeUrl: kirtan,
    imageUrl: kirtan,
    instructor: "IYF Mayapur Faculty",
    rating: "4.7",
    students: "760",
    level: "Beginner",
    lessons: [
      makeLesson(
        "kirtan-1",
        "The mood and purpose of kirtan",
        "10:30",
        "What is central to the practice of kirtan?",
        ["Sincere attentive chanting", "Musical complexity", "Performance fame", "Playing loudly"],
        0,
        "Write a short reflection on how listening supports meaningful call-and-response chanting."
      ),
      makeLesson(
        "kirtan-2",
        "Learning call and response",
        "15:12",
        "When should the group respond in kirtan?",
        ["Before the leader", "After listening to the leader's phrase", "At random", "Only at the end"],
        1,
        "Practice three simple call-and-response cycles and note what helped you maintain rhythm."
      ),
      makeLesson(
        "kirtan-3",
        "Leading with confidence",
        "18:05",
        "A good kirtan leader primarily serves whom?",
        ["The gathered participants", "Only the musicians", "The recording equipment", "The venue"],
        0,
        "Prepare a five-minute beginner-friendly kirtan plan with mantra, tempo, and response cues."
      ),
    ],
  },
];
