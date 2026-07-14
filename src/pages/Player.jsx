import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCircle,
  FiClipboard,
  FiFileText,
  FiMenu,
  FiPlayCircle,
  FiX,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { youthCourses } from "../data/youthCourses.jsx";

const readAssignment = (courseId, lessonId) => {
  try {
    return localStorage.getItem(`assignment-${courseId}-${lessonId}`) ?? "";
  } catch {
    return "";
  }
};

export default function Player() {
  const { courseId } = useParams();
  const course = youthCourses.find((item) => item.id === courseId) ?? youthCourses[0];
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const firstAssignment = readAssignment(course.id, course.lessons[0].id);
  const [assignment, setAssignment] = useState(firstAssignment);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(Boolean(firstAssignment));
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`course-progress-${course.id}`)) ?? [];
    } catch {
      return [];
    }
  });

  const lesson = course.lessons[activeLessonIndex];
  const progress = Math.round((completedLessons.length / course.lessons.length) * 100);
  const isCorrect = selectedAnswer === lesson.quiz.answer;

  useEffect(() => {
    try {
      localStorage.setItem(`course-progress-${course.id}`, JSON.stringify(completedLessons));
    } catch {
      // Progress still works for this session when browser storage is unavailable.
    }
  }, [completedLessons, course.id]);

  const completeLesson = () => {
    setCompletedLessons((current) =>
      current.includes(lesson.id) ? current : [...current, lesson.id]
    );
  };

  const submitQuiz = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
    if (selectedAnswer === lesson.quiz.answer) completeLesson();
  };

  const submitAssignment = () => {
    if (!assignment.trim()) return;
    try {
      localStorage.setItem(`assignment-${course.id}-${lesson.id}`, assignment.trim());
    } catch {
      // Keep the submitted state in memory when browser storage is unavailable.
    }
    setAssignmentSubmitted(true);
    completeLesson();
  };

  const selectLesson = (index) => {
    if (index < 0 || index >= course.lessons.length) return;
    const nextAssignment = readAssignment(course.id, course.lessons[index].id);
    setActiveLessonIndex(index);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setAssignment(nextAssignment);
    setAssignmentSubmitted(Boolean(nextAssignment));
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="learning-page">
      <header className="learning-header">
        <Link to={`/course/${course.id}`} className="learning-header__back" aria-label="Back to course details">
          <FiChevronLeft />
        </Link>
        <div className="learning-header__title">
          <span>{course.title}</span>
          <small>{progress}% complete</small>
        </div>
        <div className="learning-header__progress" aria-label={`${progress}% complete`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <button
          type="button"
          className="learning-header__menu"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open course content"
        >
          <FiMenu />
        </button>
      </header>

      <div className="learning-layout">
        <main className="learning-main">
          <div className="learning-video-wrap">
            <iframe
              key={lesson.id}
              src={lesson.videoUrl}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="learning-content">
            <div className="learning-lesson-heading">
              <div>
                <p>Lesson {activeLessonIndex + 1} of {course.lessons.length}</p>
                <h1>{lesson.title}</h1>
              </div>
              <span>{lesson.duration}</span>
            </div>
            <p className="learning-description">{lesson.description}</p>

            <section className="learning-card quiz-card">
              <div className="learning-card__heading">
                <span className="learning-card__icon"><FiClipboard /></span>
                <div>
                  <p>Quick knowledge check</p>
                  <h2>Answer one question</h2>
                </div>
              </div>

              <p className="quiz-question">{lesson.quiz.question}</p>
              <div className="quiz-options">
                {lesson.quiz.options.map((option, index) => {
                  const selected = selectedAnswer === index;
                  const answerIsCorrect = quizSubmitted && index === lesson.quiz.answer;
                  const answerIsWrong = quizSubmitted && selected && !isCorrect;

                  return (
                    <button
                      type="button"
                      key={option}
                      className={`${selected ? "is-selected" : ""} ${answerIsCorrect ? "is-correct" : ""} ${answerIsWrong ? "is-wrong" : ""}`}
                      onClick={() => !quizSubmitted && setSelectedAnswer(index)}
                      disabled={quizSubmitted}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                      {answerIsCorrect && <FiCheckCircle />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className={`quiz-feedback ${isCorrect ? "is-correct" : "is-wrong"}`} role="status">
                  {isCorrect
                    ? "Correct — great work! This lesson is now marked complete."
                    : "Not quite. Review the highlighted answer and try the idea in your own words."}
                </div>
              )}

              <div className="learning-card__actions">
                {quizSubmitted && !isCorrect ? (
                  <button type="button" className="learning-secondary-button" onClick={() => { setSelectedAnswer(null); setQuizSubmitted(false); }}>
                    Try again
                  </button>
                ) : (
                  <button type="button" className="learning-primary-button" onClick={submitQuiz} disabled={selectedAnswer === null || quizSubmitted}>
                    Check answer
                  </button>
                )}
              </div>
            </section>

            <section className="learning-card assignment-card">
              <div className="learning-card__heading">
                <span className="learning-card__icon"><FiFileText /></span>
                <div>
                  <p>Lesson assignment</p>
                  <h2>Apply what you learned</h2>
                </div>
                {assignmentSubmitted && <span className="assignment-status"><FiCheck /> Submitted</span>}
              </div>
              <p className="assignment-prompt">{lesson.assignment}</p>
              <label htmlFor="assignment-response">Your response</label>
              <textarea
                id="assignment-response"
                value={assignment}
                onChange={(event) => { setAssignment(event.target.value); setAssignmentSubmitted(false); }}
                placeholder="Write your assignment response here…"
                rows="7"
              />
              <div className="assignment-footer">
                <span>{assignment.trim().split(/\s+/).filter(Boolean).length} words</span>
                <button type="button" className="learning-primary-button" onClick={submitAssignment} disabled={!assignment.trim()}>
                  {assignmentSubmitted ? "Update submission" : "Submit assignment"}
                </button>
              </div>
            </section>

            <nav className="lesson-navigation" aria-label="Lesson navigation">
              <button type="button" onClick={() => selectLesson(activeLessonIndex - 1)} disabled={activeLessonIndex === 0}>
                <FiChevronLeft /> Previous lesson
              </button>
              <button type="button" onClick={() => selectLesson(activeLessonIndex + 1)} disabled={activeLessonIndex === course.lessons.length - 1}>
                Next lesson <FiChevronRight />
              </button>
            </nav>
          </div>
        </main>

        {sidebarOpen && <button className="learning-sidebar-overlay" type="button" onClick={() => setSidebarOpen(false)} aria-label="Close course content" />}
        <aside className={`learning-sidebar ${sidebarOpen ? "is-open" : ""}`}>
          <div className="learning-sidebar__heading">
            <div>
              <p><FiBookOpen /> Course content</p>
              <strong>{completedLessons.length} / {course.lessons.length} lessons</strong>
            </div>
            <button type="button" onClick={() => setSidebarOpen(false)} aria-label="Close course content"><FiX /></button>
          </div>
          <div className="learning-sidebar__section">
            <button type="button" className="learning-sidebar__section-title">
              <span>Section 1: Course lessons</span>
              <FiChevronDown />
            </button>
            <div>
              {course.lessons.map((item, index) => {
                const complete = completedLessons.includes(item.id);
                return (
                  <button
                    type="button"
                    className={`learning-sidebar__lesson ${index === activeLessonIndex ? "is-active" : ""}`}
                    key={item.id}
                    onClick={() => selectLesson(index)}
                  >
                    {complete ? <FiCheckCircle className="is-complete" /> : <FiCircle />}
                    <span>
                      <strong>{index + 1}. {item.title}</strong>
                      <small><FiPlayCircle /> {item.duration} · 1 quiz · 1 assignment</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
