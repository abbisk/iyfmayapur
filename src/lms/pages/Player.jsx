import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  getCourseById,
  getCourseProgress,
  toggleLessonCompletion,
  getStudentById,
  submitModuleQuiz
} from "../utils/lmsState";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaRegCircle,
  FaPlay,
  FaChevronDown,
  FaChevronUp,
  FaFileDownload,
  FaTrophy,
  FaQuestionCircle
} from "react-icons/fa";
import useToken from "../hooks/useToken";
import { jwtDecode } from "jwt-decode";

/**
 * Player Page Component
 * Renders the main interface for course consumption: video player, curriculum sidebar,
 * lesson resources, module quizzes, and celebration modals.
 */
export default function Player() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const lastLoadedKey = useRef(null);

  // --- State Variables ---
  const [course, setCourse] = useState(null);
  const [progressInfo, setProgressInfo] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeView, setActiveView] = useState("lesson");
  const [activeQuizModuleId, setActiveQuizModuleId] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [quizAnswersByModule, setQuizAnswersByModule] = useState({});
  const [quizResultsByModule, setQuizResultsByModule] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading,setLoading] = useState(true);

  const { token, saveToken, removeToken } = useToken();
        
  

  // --- Effects ---
  useEffect(() => {
    if (!courseId) {
      navigate("/lms", { replace: true });
    }
  }, [courseId, navigate]);

  useEffect(() => {
    async function fetchStudentData() {
      if (token) {
        const response = await getStudentById(jwtDecode(token).id);
        setStudent(response);
      }
    };
    fetchStudentData();
    
},[token])

  // Load course details and enrollment progress on mount/route change
  useEffect(() => {
    async function loadPlayerData() {
      if (!courseId || !student?.id) return;

      const fetchKey = `${courseId}:${student.id}`;
      if (lastLoadedKey.current === fetchKey) return;
      lastLoadedKey.current = fetchKey;

      try {
        const targetId = courseId;
        const foundCourse = await getCourseById(targetId);
        if (!foundCourse) return;

        setCourse(foundCourse);

          
        const courseinfo = student.enrollments.find((e)=>(String(e.courseId) === String(targetId)));
        
        const prog = await getCourseProgress(courseinfo);
        setProgressInfo(prog);

        // Default to the first lesson of the first module
        
        if (foundCourse.modules && foundCourse.modules.length > 0) {
          const firstMod = foundCourse.modules[0];
          if (firstMod.lessons && firstMod.lessons.length > 0) {
            setCurrentLesson(firstMod.lessons[0]);
            setActiveView("lesson");
            setActiveQuizModuleId(null);
          }

          // Expand all modules by default
          const defaultExpanded = {};
          foundCourse.modules.forEach(m => {
            defaultExpanded[m._id] = true;
          });
          setExpandedModules(defaultExpanded);
        }
      } catch (err) {
        console.error("Error loading player data:", err);
      }
    }
    loadPlayerData();
  },[courseId, student]);

  // Celebration is only awarded when a quiz is submitted with a passing score.

  // --- Helper / Action Handlers ---

  const handleLessonSelect = (lesson) => {
    setActiveView("lesson");
    setActiveQuizModuleId(null);
    setCurrentLesson(lesson);
  };

  const handleQuizSelect = (module) => {
    setActiveView("quiz");
    setActiveQuizModuleId(module?._id || null);
  };

  const currentModule = course?.modules?.find((module) =>
    module.lessons?.some((lesson) => String(lesson._id) === String(currentLesson?._id))
  ) || course?.modules?.[0] || null;

  const selectedQuizModule = activeQuizModuleId
    ? course?.modules?.find((module) => String(module._id) === String(activeQuizModuleId)) || null
    : null;

  const handleToggleCompletion = async (lessonId) => {

    try {
    
      await toggleLessonCompletion(course._id, lessonId);
      const refreshedStudent = await getStudentById(student._id || student.id);
      setStudent(refreshedStudent);
      const updatedEnrollment = refreshedStudent.enrollments.find((enrollment) => String(enrollment.courseId) === String(course._id));
      const prog = await getCourseProgress(updatedEnrollment);
      setProgressInfo(prog);
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleNextLesson = async () => {
    const currentModuleIndex = course.modules.findIndex((module) =>
      module.lessons?.some((lesson) => String(lesson._id) === String(currentLesson._id))
    );
    const currentModuleData = currentModuleIndex >= 0 ? course.modules[currentModuleIndex] : null;
    const currentLessonIndex = currentModuleData?.lessons?.findIndex((lesson) => String(lesson._id) === String(currentLesson._id)) ?? -1;
    const nextLesson = currentModuleData?.lessons?.[currentLessonIndex + 1] || null;

    // Automatically mark the current lesson complete when clicking next
    if (!progressInfo?.completedLessons.includes(currentLesson._id)) {
      await handleToggleCompletion(currentLesson._id);
    }

    if (nextLesson) {
      setActiveView("lesson");
      setActiveQuizModuleId(null);
      setCurrentLesson(nextLesson);
    } else {
      const quizExistsForModule = Array.isArray(currentModuleData?.quiz) && currentModuleData.quiz.length > 0;

      if (quizExistsForModule) {
        setActiveView("quiz");
        setActiveQuizModuleId(currentModuleData._id);
      }
    }
  };

  const handleQuizAnswer = (moduleId, qIdx, option) => {
    setQuizAnswersByModule((prev) => ({
      ...prev,
      [moduleId]: {
        ...(prev[moduleId] || {}),
        [qIdx]: option,
      },
    }));
  };

  const handleSubmitModuleQuiz = async (module) => {
    if (!module) return;

    const quizQuestions = module.quiz || [];
    if (quizQuestions.length === 0) return;

    const answers = quizAnswersByModule[module._id] || {};
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / quizQuestions.length) * 100);
    const passed = scorePercent >= 70;
    setQuizResultsByModule((prev) => ({
      ...prev,
      [module._id]: { score: scorePercent, passed },
    }));

    try {
      await submitModuleQuiz(course._id, module._id, scorePercent, passed);
      const refreshedStudent = await getStudentById(student._id || student.id);
      setStudent(refreshedStudent);
      const updatedEnrollment = refreshedStudent.enrollments.find((enrollment) => String(enrollment.courseId) === String(course._id));
      const prog = await getCourseProgress(updatedEnrollment);
      setProgressInfo(prog);
      if (passed) {
        setShowCelebration(true);
      }
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }

  };

  // --- Render Fallback ---
  if (!course || !currentLesson || !progressInfo || !student) {
    return (
      <div className="pt-24 text-center">
        <h2 className="text-xl font-semibold">Loading course player...</h2>
      </div>
    );
  }

  // --- Main Layout ---
  return (
    <div className="min-h-screen text-slate-100 flex flex-col pt-0">

      {/* Top Header Control Bar */}
      <PlayerHeader course={course} navigate={navigate} />

      {/* Main Workspace Split Panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

        {/* Left Side: Video Player & Tabs */}
        <div className="flex-1 flex flex-col p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] ">
          {activeView === "lesson" ? (
            <>
              <VideoPlayerSection
                currentLesson={currentLesson}
                progressInfo={progressInfo}
                handleToggleCompletion={handleToggleCompletion}
                handleNextLesson={handleNextLesson}
              />

              <LessonResourcesPanel currentLesson={currentLesson} />
            </>
          ) : (
            <ModuleQuizPanel
              module={selectedQuizModule || currentModule}
              quizAnswersByModule={quizAnswersByModule}
              quizResultsByModule={quizResultsByModule}
              handleQuizAnswer={handleQuizAnswer}
              handleSubmitModuleQuiz={handleSubmitModuleQuiz}
            />
          )}
        </div>

        {/* Right Side: Navigation Outline Sidebar */}
        <CurriculumSidebar
          progressInfo={progressInfo}
          course={course}
          expandedModules={expandedModules}
          toggleModule={toggleModule}
          currentLesson={currentLesson}
          activeView={activeView}
          activeQuizModuleId={activeQuizModuleId}
          handleToggleCompletion={handleToggleCompletion}
          handleLessonSelect={handleLessonSelect}
          handleQuizSelect={handleQuizSelect}
        />

      </div>

      {/* Celebratory Completion Modal Overlay */}
      <CelebrationModal
        isOpen={showCelebration}
        course={course}
        onClose={() => setShowCelebration(false)}
      />

    </div>
  );
}

// ==========================================
//          SUB-COMPONENTS (Outside main component to avoid recreation/re-renders)
// ==========================================

/**
 * PlayerHeader Component
 * Renders the course header bar with breadcrumbs and navigation.
 */
function PlayerHeader({ course, navigate }) {
  return (
    <div className="bg-blue-100 px-4 py-3 flex items-center justify-between shadow z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/lms/course/${course._id}`)}
          className="p-2 text-black hover:text-white rounded-lg hover:bg-blue-800 transition flex items-center justify-center cursor-pointer"
          aria-label="Back to Course Details"
        >
          <FaArrowLeft />
        </button>
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-600 font-semibold">
            {course.category} Course
          </span>
          <h1 className="text-sm md:text-lg font-bold font-serif line-clamp-1 text-slate-900">
            {course.title}
          </h1>
        </div>
      </div>
      <Link
        to="/lms/dashboard"
        className="text-xs md:text-sm bg-blue-300 hover:bg-blue-700 hover:text-white text-black font-semibold py-1.5 px-3 rounded-lg  transition"
      >
        My Dashboard
      </Link>
    </div>
  );
}

/**
 * Helper to convert standard YouTube watch/share links to embed format.
 */
function getEmbedUrl(url) {
  if (!url) return "";
  
  if (url.includes("/embed/")) {
    return url;
  }
  
  if (url.includes("youtu.be/")) {
    const parts = url.split("youtu.be/");
    if (parts.length > 1) {
      const idAndParams = parts[1];
      const videoId = idAndParams.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  if (url.includes("watch?v=")) {
    const parts = url.split("watch?v=");
    if (parts.length > 1) {
      const idAndParams = parts[1];
      const videoId = idAndParams.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  return url;
}

/**
 * VideoPlayerSection Component
 * Embeds the lecture video and displays completion controls.
 */
function VideoPlayerSection({
  currentLesson,
  progressInfo,
  handleToggleCompletion,
  handleNextLesson
}) {
  const hasVideo = !!currentLesson.videoUrl;
  const isCompleted = progressInfo?.completedLessons?.includes(currentLesson._id);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {hasVideo && (
        /* Main Video Iframe */
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800 animate-fade-in">
          <iframe
            className="w-full h-full"
            src={getEmbedUrl(currentLesson.videoUrl)}
            title={currentLesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )} 
        
        <div className="min-h-[300px] md:min-h-[380px] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto animate-fade-in">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif text-black border-b border-slate-800 pb-3 mb-4">
              {currentLesson.title}
            </h2>
            <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line text-justify max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {currentLesson.content || currentLesson.text || (
                <div className="text-slate-400 italic bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
                  <p>Welcome to <strong>{currentLesson.title}</strong>.</p>
                  <p className="mt-2 text-xs text-slate-700">
                    This is a text-based lesson. Use the resources below and the module quiz when you finish the lesson.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="text-xs text-indigo-800 mt-4 font-semibold uppercase tracking-wider">
            Text Lesson Reading
          </div>
        </div>
     


      {/* Player Controls */}
      <div className="mt-4 flex items-center justify-between bg-blue-300 shadow p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggleCompletion(currentLesson._id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition cursor-pointer ${isCompleted
              ? "bg-green-700 border border-green-500/30"
              : "bg-blue-500 border border-slate-700 hover:bg-slate-700"
              }`}
          >
            {isCompleted ? (
              <>
                <FaCheckCircle className="text-green-500" /> Completed
              </>
            ) : (
              <>
                <FaRegCircle className="text-slate-400" /> Mark Completed
              </>
            )}
          </button>
        </div>

        <button
          onClick={handleNextLesson}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition cursor-pointer"
        >
          Next Lesson
        </button>
      </div>
    </div>
  );
}

/**
 * LessonResourcesPanel Component
 * Renders downloadable lesson attachments.
 */
function LessonResourcesPanel({ currentLesson }) {
  const resources = currentLesson?.resources || [];
  const hasResources = resources && resources.length > 0;

  return (
    <div className="max-w-5xl w-full mx-auto mt-8 bg-gradient-to-br from-blue-50 via-white to-amber-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-bold text-slate-900">Downloadable Reference Material</h3>
        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500">Resources</span>
      </div>
      {hasResources ? (
        <div className="space-y-3">
          {resources.map((res, i) => (
            <a
              key={i}
              href={res.url}
              className="flex items-center gap-3 p-3 bg-white hover:bg-indigo-50 border border-indigo-100 rounded-2xl transition text-sm text-slate-700 shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileDownload className="text-indigo-500" />
              <span className="font-semibold">{res.title}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm">No external resources provided for this lesson.</p>
      )}
    </div>
  );
}

/**
 * ModuleQuizPanel Component
 * Renders quiz questions for the current module.
 */
function ModuleQuizPanel({
  module,
  quizAnswersByModule,
  quizResultsByModule,
  handleQuizAnswer,
  handleSubmitModuleQuiz
}) {
  const quizQuestions = module?.quiz || [];
  const quizResult = module ? quizResultsByModule[module._id] : null;
  const quizAnswers = module ? quizAnswersByModule[module._id] || {} : {};
  const hasQuiz = quizQuestions.length > 0;

  if (!module) {
    return (
      <div className="max-w-5xl w-full mx-auto mt-8 bg-slate-950/40 p-6 rounded-2xl border border-slate-800 text-slate-400 text-sm">
        Module quiz will appear here when a module is selected.
      </div>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto mt-8 bg-gradient-to-br from-blue-50 via-white to-amber-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FaQuestionCircle className="text-amber-500 text-xl" />
        <h3 className="text-lg font-bold text-slate-900">Module Quiz: {module.title}</h3>
      </div>
      <p className="text-xs text-slate-600 mb-6">
        Complete the questions for this module. Score 70% or higher to pass this module quiz.
      </p>

      {hasQuiz ? (
        <div className="space-y-6">
          {quizQuestions.map((q, qIdx) => (
            <div key={qIdx} className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-800">
                {qIdx + 1}. {q.question}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, oIdx) => {
                  const isSelected = quizAnswers[qIdx] === opt;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleQuizAnswer(module._id, qIdx, opt)}
                      className={`text-left p-3 rounded-xl border text-xs transition cursor-pointer ${isSelected
                        ? "bg-indigo-600 text-white font-semibold border-indigo-600 shadow-md"
                        : "bg-white border-indigo-100 text-slate-700 hover:bg-indigo-50"
                        }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={() => handleSubmitModuleQuiz(module)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition mt-6 cursor-pointer shadow-sm"
          >
            Submit Module Quiz
          </button>

          {quizResult && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-bold text-sm ${quizResult.passed
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
            >
              {quizResult.passed ? (
                <>Passed! Score: {quizResult.score}% (Required: 70%)</>
              ) : (
                <>Failed. Score: {quizResult.score}% (Required: 70%). Please review lessons and try again.</>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-500 text-sm">No quiz configured for this module yet.</p>
      )}
    </div>
  );
}

/**
 * CurriculumSidebar Component
 * Displays the user's progress and an interactive accordion of modules and lessons.
 */
function CurriculumSidebar({
  progressInfo,
  course,
  expandedModules,
  toggleModule,
  currentLesson,
  activeView,
  activeQuizModuleId,
  handleToggleCompletion,
  handleLessonSelect,
  handleQuizSelect
}) {
  const progressPercent = progressInfo?.progress || 0;
  const completedCount = progressInfo?.completedCount || 0;
  const totalLessons = progressInfo?.totalLessons || 0;

  return (
    <div className="w-full lg:w-80 bg-gradient-to-b from-blue-50 via-white to-amber-50 border-t lg:border-t-0 lg:border-l border-indigo-100 shadow flex flex-col z-0">

      {/* Progress Tracker Widget */}
      <div className="p-4 border-b border-indigo-100 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-slate-500">YOUR PROGRESS</span>
          <span className="text-indigo-400">{progressPercent}% Complete</span>
        </div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span className="text-xs text-slate-500 mt-2 block">
          {completedCount} of {totalLessons} lessons complete
        </span>
      </div>

      {/* Curriculum Accordion */}
      <div className="flex-1 overflow-y-auto max-h-[400px] lg:max-h-[none] divide-y divide-indigo-100/80">
        {course.modules && course.modules.map(mod => {
          const isExpanded = expandedModules[mod._id] !== false;
          return (
            <div key={mod._id} className="bg-white/60">
              {/* Module Toggle Button */}
              <button
                onClick={() => toggleModule(mod._id)}
                className="w-full p-4 flex items-center justify-between font-bold text-slate-800 text-sm hover:bg-indigo-50 transition text-left cursor-pointer"
              >
                <span className="line-clamp-1">{mod.title}</span>
                {isExpanded ? <FaChevronUp className="text-indigo-500" /> : <FaChevronDown className="text-indigo-500" />}
              </button>

              {/* Module Lessons Accordion Panel */}
              {isExpanded && (
                <div className="bg-white/80 divide-y divide-indigo-50">
                  {mod.lessons && mod.lessons.map(lesson => {
                    const isCurrent = lesson._id === currentLesson._id;
                    const isCompleted = progressInfo?.completedLessons.includes(lesson._id);
                    return (
                      <div
                        key={lesson._id}
                        className={`flex items-start gap-3 p-3 transition text-left relative ${isCurrent ? "bg-indigo-50 border-l-2 border-indigo-500" : "hover:bg-indigo-50/60"
                          }`}
                      >
                        {/* Completion Toggle Icon Button */}
                        <button
                            onClick={() => handleToggleCompletion(lesson._id)}
                          className="mt-0.5 text-slate-400 hover:text-indigo-500 transition cursor-pointer"
                          aria-label={isCompleted ? "Mark lesson incomplete" : "Mark lesson complete"}
                        >
                          {isCompleted ? (
                            <FaCheckCircle className="text-green-500 text-base" />
                          ) : (
                            <FaRegCircle className="text-slate-400 text-base" />
                          )}
                        </button>

                        {/* Clickable Lesson Title */}
                        <button
                          onClick={() => handleLessonSelect(lesson)}
                          className="flex-1 text-xs text-left cursor-pointer"
                        >
                          <span className={`font-semibold block ${isCurrent ? "text-indigo-600 font-bold" : "text-slate-700"}`}>
                            {lesson.title}
                          </span>
                          <span className="text-[10px] text-slate-500 flex items-center gap-2 mt-1">
                            <FaPlay className="text-[8px] text-indigo-400" />
                            {lesson.duration}
                          </span>
                        </button>
                      </div>
                    );
                  })}

                  {mod.quiz && mod.quiz.length > 0 && (
                    <button
                      onClick={() => handleQuizSelect(mod)}
                      className={`w-full flex items-center justify-between gap-3 p-3 transition text-left border-t border-indigo-50 ${activeView === "quiz" && String(activeQuizModuleId) === String(mod._id)
                        ? "bg-amber-50 border-l-2 border-amber-500"
                        : "hover:bg-amber-50/70"
                        }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <FaQuestionCircle className="mt-1 text-amber-500 text-sm shrink-0" />
                        <div className="min-w-0 text-left">
                          <span className="font-semibold block text-slate-800 text-xs">Module Quiz</span>
                          <span className="text-[10px] text-slate-500">{mod.quiz.length} questions</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-600 uppercase tracking-wider font-semibold">Quiz</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

/**
 * CelebrationModal Component
 * Overlays a congratulations modal when course is completed.
 */
function CelebrationModal({ isOpen, course, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
        {/* Spotlight Glow Effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>

        <FaTrophy className="text-yellow-500 text-7xl mx-auto mb-4 animate-bounce" />

        <h2 className="text-2xl font-bold font-serif text-white">Course Completed!</h2>
        <p className="text-slate-300 text-sm mt-3 leading-relaxed">
          Incredible effort! You have completed all lessons for <strong>{course.title}</strong>.
        </p>
        <p className="text-slate-400 text-xs mt-2">
          Review any pending module quiz below to unlock your custom completion certificate.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}