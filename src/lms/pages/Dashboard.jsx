import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getStudentById, getCourseById, deleteUser, getCourseProgress } from "../utils/lmsState";
import { FaGraduationCap, FaAward, FaBookOpen, FaCalendarAlt, FaUser, FaEnvelope, FaCertificate, FaPrint, FaTimes } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const navigate = useNavigate();

  const [enrolledList, setEnrolledList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [student, setStudent] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/lms/login", { replace: true });
          return;
        }

        const decoded = jwtDecode(token);
        const id = decoded?.id;

        if (!id) {
          navigate("/lms/login", { replace: true });
          return;
        }

        // Fetch active student profile
        const activeStudent = await getStudentById(id).catch((e) => {
          console.error("Error fetching student:", e);
          return null;
        });

        setStudent(activeStudent);

        const enrollments = activeStudent?.enrollments || [];
        const inProgress = [];
        const completed = [];

        const enrolledWithProgress = await Promise.all(
          enrollments.map(async (enrollment) => {
            const courseData = await getCourseById(enrollment.courseId).catch(() => null);
            const progressInfo = await getCourseProgress(enrollment).catch(() => null);

            return {
              ...enrollment,
              courseData,
              progress: progressInfo?.progress ?? 0,
              quizPassed: progressInfo?.quizPassed ?? false,
              completed: progressInfo?.completed ?? enrollment.completed ?? false,
            };
          })
        );

        enrolledWithProgress.forEach((enrollment) => {
          if (enrollment.completed) {
            completed.push(enrollment);
          } else {
            inProgress.push(enrollment);
          }
        });

        setEnrolledList(inProgress);
        setCompletedList(completed);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-500 text-sm font-medium">Loading student dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Dashboard Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Student Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your active courses, check progress, and view certificates.</p>
          </div>
          <Link
            to="/lms"
            className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl shadow transition"
          >
            <FaBookOpen /> Browse Courses
          </Link>
        </div>

        {/* Dashboard Panels */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <ProfileCard student={student} />
          </div>

          {/* Enrolled Courses List */}
          <div className="md:col-span-3 space-y-10">

            {/* Active Enrolled Courses */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
                In-Progress Courses
              </h2>

              {enrolledList.length === 0 ? (
                <div className="bg-white border border-slate-100 p-8 rounded-2xl text-center shadow-xs">
                  <FaGraduationCap className="text-slate-300 text-5xl mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">You don't have any active courses.</p>
                  <p className="text-slate-400 text-sm mt-1">Enroll in a course to begin your journey of ancient wisdom.</p>
                  <Link
                    to="/lms"
                    className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition text-sm"
                  >
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledList.map((course) => (
                    <DashboardCourseCard
                      key={course.courseId}
                      course={course.courseData}
                      progress={course.progress}
                      onResume={() => navigate(`/lms/player/${course.courseId}`)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Completed Courses */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-2.5 h-6 bg-green-500 rounded-full"></span>
                Completed Courses
              </h2>

              {completedList.length === 0 ? (
                <div className="bg-white border border-slate-100 p-8 rounded-2xl text-center shadow-xs">
                  <FaAward className="text-slate-300 text-5xl mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">No completed courses yet.</p>
                  <p className="text-slate-400 text-sm mt-1">Complete all lessons and pass the module quizzes to earn certificates.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedList.map((course) => (
                    <DashboardCourseCard
                      key={course.courseId}
                      course={course.courseData}
                      progress={100}
                      isCompleted={true}
                      onCertificate={() => setSelectedCertificate(course.courseData)}
                      onResume={() => navigate(`/lms/player/${course.courseId}`)}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Certificate Viewer Modal Overlay */}
      {selectedCertificate && (
        <CertificateModal
          studentName={student?.name || "Student"}
          courseName={selectedCertificate?.title || "Course"}
          completionDate={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}

// ---------------- LOCAL COMPONENTS ----------------

function ProfileCard({ student }) {
  const name = student?.name || "Student";
  const email = student?.email || "student@iyf.com";
  const studentId = student?.id || "stud1";

  const getInitials = (fullName) => {
    if (!fullName) return "ST";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = jwtDecode(token).id;

      const response = await deleteUser(userId);

      if (response.ok) {
        alert("Your account has been deleted successfully.");
        localStorage.removeItem('token');
        window.location.href = '/register';
      } else {
        alert(`Failed to delete account: ${response}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while trying to delete your account. Please try again later.");
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-extrabold text-3xl mb-4 border-2 border-indigo-200 shadow-inner">
        {getInitials(name)}
      </div>

      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5 justify-center">
        <FaUser className="text-xs text-slate-400" /> {name}
      </h3>
      <p className="text-xs text-slate-500 flex items-center gap-1.5 justify-center mt-1 break-all">
        <FaEnvelope className="text-xs text-slate-400" /> {email}
      </p>

      <div className="w-full border-t border-slate-100 mt-6 pt-6 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Student ID:</span>
          <span className="font-semibold text-slate-700">{studentId.toUpperCase()}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Account Role:</span>
          <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">Student</span>
        </div>
      </div>

      <Link
        to="/lms"
        className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-xl text-xs transition text-center"
      >
        View Courses Directory
      </Link>

      <div
        onClick={handleDelete}
        className="w-full mt-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-xl text-xs transition text-center cursor-pointer"
      >
        Delete my Account
      </div>
    </div>
  );
}

function DashboardCourseCard({ course, progress, isCompleted, onResume, onCertificate }) {
  if (!course) return null;
  
  return (
    // Changed fixed height h-[340px] to flexible min-h-[360px] h-full to support mobile view layouts
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between min-h-[360px] h-full">
      <div>
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
          <img
            src={course.imgUrl || "https://via.placeholder.com/300x180"}
            alt={course.title || "Course"}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
            {course.category || "General"}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-2">
            {course.title || "Untitled Course"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {course.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 mt-auto">
        {!isCompleted ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
              <span>Progress</span>
              <span>{progress || 0}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress || 0}%` }}
              ></div>
            </div>
            <button
              onClick={onResume}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs transition cursor-pointer"
            >
              Resume Learning
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold mb-1">
              <FaAward /> 100% Completed
            </div>
            <div className="flex gap-2">
              <button
                onClick={onCertificate}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <FaCertificate /> Certificate
              </button>
              <button
                onClick={onResume}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-2.5 rounded-lg text-xs transition cursor-pointer"
              >
                Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CertificateModal({ studentName, courseName, completionDate, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/20 p-6 md:p-8 rounded-3xl max-w-4xl w-full shadow-2xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition cursor-pointer"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Certificate Frame Area */}
        <div id="print-certificate" className="bg-amber-50/90 text-amber-950 p-6 md:p-12 rounded-2xl border-8 border-double border-amber-800/80 font-serif text-center shadow-inner relative overflow-hidden select-none">
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-800"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-800"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-800"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-800"></div>

          <span className="text-xs uppercase tracking-widest text-amber-850 font-bold block mb-4">ISKCON Sridham Mayapur</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-amber-900 mb-2">Certificate of Completion</h2>
          <span className="text-xs italic text-amber-800 block mb-6 md:mb-10">ISCKON Youth Forum (IYF)</span>

          <p className="text-sm md:text-base text-amber-800 mb-2">This is proudly presented to</p>
          <p className="text-2xl md:text-4xl font-bold text-amber-950 underline decoration-amber-600 underline-offset-8 mb-6 font-serif">
            {studentName}
          </p>

          <p className="text-sm md:text-base text-amber-800 max-w-xl mx-auto leading-relaxed mb-6 md:mb-10">
            for successfully completing the authorized systematic curriculum study of
            <strong className="block text-lg md:text-xl text-amber-900 mt-2 font-bold font-sans">
              "{courseName}"
            </strong>
          </p>

          <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto mt-8 items-end text-xs">
            <div className="text-center">
              <span className="border-b border-amber-800/40 pb-1.5 block font-sans italic text-amber-900">
                {completionDate}
              </span>
              <span className="text-[10px] text-amber-700 uppercase font-semibold block mt-1.5 flex items-center justify-center gap-1">
                <FaCalendarAlt /> Date of Issue
              </span>
            </div>

            <div className="text-center">
              <div className="text-amber-800 text-lg font-bold font-serif leading-none italic mb-1.5 select-none opacity-80">
                Sundar Gopal Das
              </div>
              <span className="border-t border-amber-800/40 pt-1.5 block text-[10px] text-amber-700 uppercase font-semibold">
                Director, IYF Mayapur
              </span>
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition cursor-pointer"
          >
            <FaPrint /> Print Certificate
          </button>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-4 rounded-xl text-sm transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}