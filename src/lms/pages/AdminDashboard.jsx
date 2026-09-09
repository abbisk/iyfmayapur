import { useState, useEffect } from "react";
import { getCourses, saveCourse, deleteCourse, getStudents, saveStudent, uploadImageToCloudinary } from "../utils/lmsState";
import { 
  FaGraduationCap, 
  FaAward, 
  FaBookOpen, 
  FaUsers, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaBook, 
  FaList, 
  FaSave, 
  FaTimes 
} from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { SyncLoader } from "react-spinners";

/**
 * Main Administrator Portal Component
 * Manages parent state, data sync, and displays selected tabs/modals.
 */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview"); // overview | courses | students
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [imgUrl, setImgUrl] = useState(""); // For uploaded course image URL

  // Modal states
  const [editingCourse, setEditingCourse] = useState(null); // Course object or 'new'
  const [managingCurriculum, setManagingCurriculum] = useState(null); // Course object
  const [newModuleName, setNewModuleName] = useState("");
  const [newLessonData, setNewLessonData] = useState({ title: "", duration: "15 mins", videoUrl: "", content: "" });
  const [selectedModuleForLesson, setSelectedModuleForLesson] = useState("");
  const [selectedModuleForQuiz, setSelectedModuleForQuiz] = useState("");
  const [newQuizData, setNewQuizData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  
  // Student modal states
  const [managingStudent, setManagingStudent] = useState(null); // Student object
  const [enrollCourseSelect, setEnrollCourseSelect] = useState("");

  const refreshData = async () => {
    try {
      const allCourses = await getCourses();
      const allUsers = await getStudents();
      setCourses(allCourses || []);
      // console.log("Fetched students:", allStudents);
      // allUsers.forEach(student => { console.log(student.role) });
      const allStudents = allUsers.filter(student => student.role === "user");
      setStudents(allStudents || []);
      setImgUrl(""); // Reset uploaded image URL after refresh
    } catch (err) {
      console.error("Error refreshing admin data:", err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Compute stats
  const totalCourses = courses.length;
  const totalStudents = students.length;
  let totalEnrollments = 0;
  students.forEach(s => {
    totalEnrollments += Object.keys(s.enrolledCourses || {}).length;
  });

  // --- Handlers ---

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course? This will also remove student progress for this course.")) {
      try {
        await deleteCourse(id);
        await refreshData();
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    }
  };

 
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const courseData = {
    
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      longDescription: formData.get('longDescription'),
      price: formData.get('price'),
      level: formData.get('level'),
      duration: formData.get('duration'),
    };

    if(imgUrl){
      courseData.imgUrl = imgUrl; // Use the uploaded image URL if available
    }

    if (editingCourse !== 'new') {
      courseData._id = editingCourse._id;
      courseData.modules = editingCourse.modules || [];
      courseData.quiz = editingCourse.quiz || [];
    } else {
      courseData.modules = [];
      courseData.quiz = [
        {
          question: 'What is the main topic of this course?',
          options: ['Introduction', 'Yoga', 'Bhakti', 'All of the above'],
          answer: 'All of the above'
        }
      ];
    }

    try {
      await saveCourse(courseData);
      setEditingCourse(null);
      await refreshData();
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  const handleAddModule = async () => {
    if (!newModuleName.trim()) return;
    const updated = { ...managingCurriculum };
    if (!updated.modules) updated.modules = [];
    
    updated.modules.push({
      id: 'mod-' + Date.now(),
      title: newModuleName,
      lessons: [],
      quiz: []
    });

    try {
      await saveCourse(updated);
      setManagingCurriculum(updated);
      setNewModuleName("");
      await refreshData();
    } catch (err) {
      console.error("Error adding module:", err);
    }
  };

  const handleAddLesson = async () => {
    if (!selectedModuleForLesson || !newLessonData.title.trim()) return;
    
    const updated = { ...managingCurriculum };
  
    const mod = updated.modules.find(m => m.title === selectedModuleForLesson);
  
    if (mod) {
      if (!mod.lessons) mod.lessons = [];
      mod.lessons.push({
        title: newLessonData.title,
        duration: newLessonData.duration,
        videoUrl: newLessonData.videoUrl || "",
        content: newLessonData.content || "",
        resources: []
      });
      
      try {
        await saveCourse(updated);
        setManagingCurriculum(updated);
        setNewLessonData({ title: "", duration: "15 mins", videoUrl: "", content: "" });
        await refreshData();
      } catch (err) {
        console.log("updated course", updated);
        console.error("Error adding lesson:", err);
      }
    }
  };

  const handleAddQuizQuestion = async () => {
    if (!selectedModuleForQuiz || !newQuizData.question.trim()) return;

    const options = [newQuizData.option1, newQuizData.option2, newQuizData.option3, newQuizData.option4]
      .map((option) => option.trim())
      .filter(Boolean);

    if (options.length < 2 || !newQuizData.answer.trim()) return;

    const updated = { ...managingCurriculum };
    const mod = updated.modules.find((module) => module.title === selectedModuleForQuiz);

    if (mod) {
      if (!Array.isArray(mod.quiz)) mod.quiz = [];

      mod.quiz.push({
        question: newQuizData.question.trim(),
        options,
        answer: newQuizData.answer.trim(),
      });

      try {
        await saveCourse(updated);
        setManagingCurriculum(updated);
        setNewQuizData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });
        await refreshData();
      } catch (err) {
        console.error("Error adding quiz question:", err);
      }
    }
  };

  const handleDeleteQuizQuestion = async (modId, quizIndex) => {
    const updated = { ...managingCurriculum };
    const mod = updated.modules.find((module) => module._id === modId);

    if (mod && Array.isArray(mod.quiz)) {
      mod.quiz = mod.quiz.filter((_, index) => index !== quizIndex);

      try {
        await saveCourse(updated);
        setManagingCurriculum(updated);
        await refreshData();
      } catch (err) {
        console.error("Error deleting quiz question:", err);
      }
    }
  };


  const handleDeleteLesson = async (modId, lessonId) => {
    const updated = { ...managingCurriculum };
    const mod = updated.modules.find(m => m._id === modId);
    if (mod) {
      mod.lessons = mod.lessons.filter(l => l._id !== lessonId);
      try {
        await saveCourse(updated);
        setManagingCurriculum(updated);
        await refreshData();
      } catch (err) {
        console.error("Error deleting lesson:", err);
      }
    }
  };

  const handleDeleteModule = async (modId) => {
    if (window.confirm("Delete this module and all its lessons?")) {
      const updated = { ...managingCurriculum };
      updated.modules = updated.modules.filter(m => m._id !== modId);
      try {
        await saveCourse(updated);
        setManagingCurriculum(updated);
        await refreshData();
      } catch (err) {
        console.error("Error deleting module:", err);
      }
    }
  };

  const handleEnrollStudent = async () => {
    if (!enrollCourseSelect) return;
    const updatedStudent = { ...managingStudent };
    
    const enrolledCoursesObj = { ...updatedStudent.enrolledCourses };
    enrolledCoursesObj[enrollCourseSelect] = {
      courseId: enrollCourseSelect,
      enrollmentDate: new Date().toISOString(),
      completedLessons: [],
      completedQuizzes: [],
      completed: false,
    };
    updatedStudent.enrolledCourses = enrolledCoursesObj;
    
    try {
      await saveStudent(updatedStudent);
      setManagingStudent(updatedStudent);
      setEnrollCourseSelect("");
      await refreshData();
    } catch (err) {
      console.error("Error enrolling student:", err);
    }
  };

  const handleUnenrollStudent = async (courseId) => {
    if (window.confirm("Remove student from this course? Progress will be lost.")) {
      const updatedStudent = { ...managingStudent };
      
      const enrolledCoursesObj = { ...updatedStudent.enrolledCourses };
      delete enrolledCoursesObj[courseId];
      updatedStudent.enrolledCourses = enrolledCoursesObj;
      
      try {
        await saveStudent(updatedStudent);
        setManagingStudent(updatedStudent);
        await refreshData();
      } catch (err) {
        console.error("Error unenrolling student:", err);
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Admin Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-serif text-slate-900">Administrator Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Manage curriculum offerings, course content, and track student success.</p>
          </div>
          <button 
            onClick={() => setEditingCourse('new')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <FaPlus /> Add New Course
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-slate-200 mb-8 font-semibold text-sm">
          <TabButton id="overview" activeTab={activeTab} onClick={setActiveTab} icon={<FaList />} label="Overview Stats" />
          <TabButton id="courses" activeTab={activeTab} onClick={setActiveTab} icon={<FaBook />} label="Manage Courses" />
          <TabButton id="students" activeTab={activeTab} onClick={setActiveTab} icon={<FaUsers />} label="Student Directory" />
        </div>

        {/* Tab Content Panels */}
        <div className="bg-[rgb(242,253,170)] rounded-2xl border border-gray-150 shadow-sm p-6 md:p-8 min-h-[400px]">
          {activeTab === "overview" && (
            <OverviewTab 
              totalCourses={totalCourses} 
              totalStudents={totalStudents} 
              totalEnrollments={totalEnrollments} 
            />
          )}

          {activeTab === "courses" && (
            <CoursesTab 
              courses={courses} 
              onManageCurriculum={setManagingCurriculum} 
              onEditCourse={setEditingCourse} 
              onDeleteCourse={handleDeleteCourse} 
            />
          )}

          {activeTab === "students" && (
            <StudentsTab 
              students={students} 
              onManageStudent={setManagingStudent} 
            />
          )}
        </div>

      </div>

      {/* MODAL 1: ADD/EDIT COURSE DETAILS */}
      {editingCourse && (
        <CourseModal 
          editingCourse={editingCourse} 
          onClose={() => setEditingCourse(null)} 
          onSave={handleSaveCourse}
          setImgUrl={setImgUrl} 
        />
      )}

      {/* MODAL 2: CURRICULUM SYLLABUS BUILDER */}
      {managingCurriculum && (
        <CurriculumModal 
          managingCurriculum={managingCurriculum} 
          onClose={() => setManagingCurriculum(null)}
          newModuleName={newModuleName}
          setNewModuleName={setNewModuleName}
          onAddModule={handleAddModule}
          onDeleteModule={handleDeleteModule}
          newLessonData={newLessonData}
          setNewLessonData={setNewLessonData}
          selectedModuleForLesson={selectedModuleForLesson}
          setSelectedModuleForLesson={setSelectedModuleForLesson}
          onAddLesson={handleAddLesson}
          onDeleteLesson={handleDeleteLesson}
          selectedModuleForQuiz={selectedModuleForQuiz}
          setSelectedModuleForQuiz={setSelectedModuleForQuiz}
          newQuizData={newQuizData}
          setNewQuizData={setNewQuizData}
          onAddQuizQuestion={handleAddQuizQuestion}
          onDeleteQuizQuestion={handleDeleteQuizQuestion}
        />
      )}

      {/* MODAL 3: STUDENT PROFILE & ENROLLMENT MANAGER */}
      {managingStudent && (
        <StudentProfileModal 
          managingStudent={managingStudent}
          courses={courses}
          enrollCourseSelect={enrollCourseSelect}
          setEnrollCourseSelect={setEnrollCourseSelect}
          onEnroll={handleEnrollStudent}
          onUnenroll={handleUnenrollStudent}
          onClose={() => setManagingStudent(null)}
        />
      )}

    </div>
  );
}

// ==========================================
//          SUB-COMPONENTS
// ==========================================

/**
 * TabButton helper component.
 */
function TabButton({ id, activeTab, onClick, icon, label }) {
  const isActive = activeTab === id;
  return (
    <button 
      onClick={() => onClick(id)}
      className={`py-3 px-6 border-b-2 transition flex items-center gap-2 cursor-pointer ${
        isActive 
          ? "border-indigo-600 text-indigo-600 font-bold" 
          : "border-transparent text-gray-500 hover:text-slate-700"
      }`}
    >
      {icon} {label}
    </button>
  );
}

/**
 * Overview statistics and guidelines tab.
 */
function OverviewTab({ totalCourses, totalStudents, totalEnrollments }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 rounded-2xl border border-indigo-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow">
            <FaBookOpen />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-500">Active Courses</span>
            <h3 className="text-2xl font-bold text-slate-800">{totalCourses}</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-2xl border border-amber-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow">
            <FaUsers />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-600">Students Enrolled</span>
            <h3 className="text-2xl font-bold text-slate-800">{totalStudents}</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow">
            <FaAward />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600">Total Enrollments</span>
            <h3 className="text-2xl font-bold text-slate-800">{totalEnrollments}</h3>
          </div>
        </div>
      </div>

      <div className="border border-slate-100 rounded-2xl p-6 bg-blue-100">
        <h3 className="font-bold text-slate-800 text-lg mb-3">Admin Documentation</h3>
        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
         
          <li>Use the <strong>Manage Courses</strong> tab to configure the course modules, lessons, metadata, and assessments.</li>
          <li>The <strong>Student Directory</strong> tracks active registrants, their completed courses, and lesson completion metrics.</li>
          
        </ul>
      </div>
    </div>
  );
}

/**
 * Course catalog overview tab.
 */
function CoursesTab({ courses, onManageCurriculum, onEditCourse, onDeleteCourse }) {
  return (
    <div className="overflow-x-auto animate-fade-in">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
            <th className="pb-4 w-1/3">Course Title</th>
            <th className="pb-4">Category</th>
            <th className="pb-4">Level</th>
            <th className="pb-4">Price</th>
            <th className="pb-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {courses.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-500">
                No courses defined in the database. Click "Add New Course" to begin.
              </td>
            </tr>
          ) : (
            courses.map(course => (
              <tr key={course._id} className="hover:bg-slate-50/50 transition">
                <td className="py-4 font-semibold text-slate-800 flex items-center gap-3">
                  <img src={course.imgUrl} alt="" className="w-10 h-7 object-cover rounded-md border border-slate-200" />
                  <span>{course.title}</span>
                </td>
                <td className="py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    course.category === 'Vedic' 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}>
                    {course.category}
                  </span>
                </td>
                <td className="py-4 text-slate-600">{course.level}</td>
                <td className="py-4 font-semibold text-slate-900">{course.price}</td>
                <td className="py-4 text-right space-x-2">
                  <button
                    onClick={() => onManageCurriculum(course)}
                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => onEditCourse(course)}
                    className="text-slate-600 hover:text-slate-800 p-1.5 hover:bg-slate-100 rounded-md transition cursor-pointer"
                    title="Edit Details"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDeleteCourse(course._id)}
                    className="text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded-md transition cursor-pointer"
                    title="Delete Course"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Student listing tab directory.
 */
function StudentsTab({ students, onManageStudent }) {
  return (
    <div className="overflow-x-auto animate-fade-in">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
            <th className="pb-4">Student Name</th>
            <th className="pb-4">Email Address</th>
            <th className="pb-4">Enrollments Count</th>
            <th className="pb-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-8 text-center text-gray-500">
                No students registered in the database.
              </td>
            </tr>
          ) : (
            students.map(stud => (
              <tr key={stud._id} className="hover:bg-slate-50/50 transition">
                <td className="py-4 font-semibold text-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-150 flex items-center justify-center font-bold text-xs text-slate-600">
                    {stud.name ? stud.name.charAt(0) : "S"}
                  </div>
                  {stud.name}
                </td>
                <td className="py-4 text-slate-500">{stud.email}</td>
                <td className="py-4 text-slate-700 font-semibold">
                  {Object.keys(stud.enrolledCourses || {}).length}
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => onManageStudent(stud)}
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Manage Profile
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Course details creation and modification form modal.
 */
function CourseModal({ editingCourse, onClose, onSave, setImgUrl }) {
  const isNew = editingCourse === 'new';

  const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleUpload = async (e) => {
        setLoading(true);
        setFile(e.target.files[0]);

        const img = new FormData();
        img.append("image", e.target.files[0]);
        console.log("Image file to be uploaded:", e.target.files[0]);

        const res = await uploadImageToCloudinary(img)
        .then((response) => response.json())
        .then((data) => {
          setImgUrl(data.url); // Store the uploaded image URL in state  
          console.log("Image uploaded successfully:", data);

            setLoading(false);
        })
        .catch((error) => {
            console.error("Error uploading image:",error);
        });
        
    }




  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-fade-in">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-lg">
            {isNew ? 'Create New Course Offering' : 'Edit Course Information'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-full transition cursor-pointer">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={onSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Course Title</label>
            <input required type="text" name="title" defaultValue={isNew ? '' : editingCourse.title} className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-sm text-slate-800" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category Type</label>
              <select name="category" defaultValue={isNew ? 'Youth' : editingCourse.category} className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-sm text-slate-800">
                <option value="Youth">Youth Course</option>
                <option value="Vedic">Vedic Scripture Course</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Course Price</label>
              <input required type="text" name="price" defaultValue={isNew ? 'Free' : editingCourse.price} className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-sm text-slate-800" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Difficulty Level</label>
              <select name="level" defaultValue={isNew ? 'Beginner' : editingCourse.level} className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-sm text-slate-800">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All levels">All levels</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Est. Duration</label>
              <input required type="text" name="duration" defaultValue={isNew ? '3 Hours' : editingCourse.duration} className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-sm text-slate-800" />
            </div>
          </div>

          <div>
              <p className=" text-xs font-bold text-slate-500 uppercase mb-1">Course Image</p>

              {loading ? (<SyncLoader />):(
                <>
                <IoCloudUploadOutline className="text-6xl inline mx-3" />

            <label htmlFor="imageFile" className=" text-xs font-bold  uppercase mb-1 cursor-pointer bg-yellow-400 w-fit p-2 rounded-xl"  >Upload Image</label>
            <input type="file" name="imageFile" id="imageFile" className="hidden" onChange={handleUpload} />
                </>

              )}
            

          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Short Description</label>
            <input required type="text" name="description" defaultValue={isNew ? '' : editingCourse.description} className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-sm text-slate-800" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Detailed Syllabus Overview</label>
            <textarea rows="4" name="longDescription" defaultValue={isNew ? '' : editingCourse.longDescription} className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-sm text-slate-800" />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer">
              <FaSave /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Curriculum Syllabus and Modules Outline Builder modal.
 */
function CurriculumModal({
  managingCurriculum,
  onClose,
  newModuleName,
  setNewModuleName,
  onAddModule,
  onDeleteModule,
  newLessonData,
  setNewLessonData,
  selectedModuleForLesson,
  setSelectedModuleForLesson,
  onAddLesson,
  onDeleteLesson,
  selectedModuleForQuiz,
  setSelectedModuleForQuiz,
  newQuizData,
  setNewQuizData,
  onAddQuizQuestion,
  onDeleteQuizQuestion
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fade-in">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Curriculum Manager</span>
            <h3 className="font-bold text-lg line-clamp-1">{managingCurriculum.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-full transition cursor-pointer">
            <FaTimes />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 grid md:grid-cols-2 gap-8">
          
          {/* Modules Syllabus List */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Modules Outline</h4>
            
            {managingCurriculum.modules && managingCurriculum.modules.length > 0 ? (
              <div className="space-y-4">
                {managingCurriculum.modules.map(mod => (
                  <div key={mod._id} className="border border-slate-150 p-4 rounded-xl bg-slate-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-bold text-slate-800 text-sm">{mod.title}</h5>
                      <button 
                        onClick={() => onDeleteModule(mod._id)}
                        className="text-rose-500 hover:text-rose-700 text-xs font-semibold cursor-pointer"
                      >
                        Delete Module
                      </button>
                    </div>
                    
                    {/* Lessons inside Module */}
                    {mod.lessons && mod.lessons.length > 0 ? (
                      <ul className="space-y-1.5">
                        {mod.lessons.map(les => (
                          <li key={les._id} className="flex justify-between items-center text-xs bg-white p-2 rounded-lg border border-slate-100">
                            <span className="font-medium text-slate-700 line-clamp-1">{les.title} ({les.duration})</span>
                            <button 
                              onClick={() => onDeleteLesson(mod._id, les._id)}
                              className="text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer"
                            >
                              <FaTimes />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No lectures added to this module yet.</p>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-200/80">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Module Quiz</h6>
                        <span className="text-[10px] text-slate-400">{mod.quiz?.length || 0} questions</span>
                      </div>
                      {mod.quiz && mod.quiz.length > 0 ? (
                        <ul className="space-y-1.5">
                          {mod.quiz.map((quiz, quizIndex) => (
                            <li key={`${mod._id || mod.title}-quiz-${quizIndex}`} className="flex justify-between items-start gap-3 text-xs bg-white p-2 rounded-lg border border-slate-100">
                              <div className="min-w-0">
                                <span className="font-medium text-slate-700 line-clamp-2">{quiz.question}</span>
                                <p className="text-[10px] text-slate-400 mt-1">{quiz.options?.length || 0} options</p>
                              </div>
                              <button 
                                onClick={() => onDeleteQuizQuestion(mod._id, quizIndex)}
                                className="text-slate-400 hover:text-rose-500 p-0.5 shrink-0 cursor-pointer"
                              >
                                <FaTimes />
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No quiz added to this module yet.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm italic">No modules configured yet. Add a module to start adding lessons.</p>
            )}
          </div>

          {/* Module/Lesson Add Controls */}
          <div className="space-y-6 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
            
            {/* Create Module Section */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150">
              <h4 className="font-bold text-slate-800 text-sm mb-3">Create New Module</h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="e.g. Module 3: Advanced Studies" 
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  className="flex-1 p-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-500 bg-white text-slate-800"
                />
                <button 
                  onClick={onAddModule}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Add Lecture Section */}
            {managingCurriculum.modules && managingCurriculum.modules.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3">
                <h4 className="font-bold text-slate-800 text-sm">Add Lecture to Module</h4>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Module</label>
                  <select 
                    value={selectedModuleForLesson}
                    onChange={(e) => setSelectedModuleForLesson(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                  >
                    <option value="">-- Choose Module --</option>
                    {managingCurriculum.modules.map(m => (
                      <option key={m._id} >{m.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lecture Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3.1 Understanding Karma" 
                    value={newLessonData.title}
                    onChange={(e) => setNewLessonData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Est. Duration</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 15 mins" 
                      value={newLessonData.duration}
                      onChange={(e) => setNewLessonData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">YouTube Link (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://www.youtube.com/embed/..." 
                      value={newLessonData.videoUrl}
                      onChange={(e) => setNewLessonData(prev => ({ ...prev, videoUrl: e.target.value }))}
                      className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lesson Content / Text (Optional)</label>
                  <textarea 
                    rows="3"
                    placeholder="Type lesson reading text here..." 
                    value={newLessonData.content || ""}
                    onChange={(e) => setNewLessonData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                  />
                </div>

                <button 
                  onClick={onAddLesson}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                >
                  Add Lecture
                </button>
              </div>
            )}

            {managingCurriculum.modules && managingCurriculum.modules.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3">
                <h4 className="font-bold text-slate-800 text-sm">Add Quiz Question to Module</h4>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Module</label>
                  <select
                    value={selectedModuleForQuiz}
                    onChange={(e) => setSelectedModuleForQuiz(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                  >
                    <option value="">-- Choose Module --</option>
                    {managingCurriculum.modules.map((module) => (
                      <option key={module._id} value={module.title}>{module.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Question</label>
                  <textarea
                    rows="2"
                    placeholder="Type quiz question here..."
                    value={newQuizData.question}
                    onChange={(e) => setNewQuizData((prev) => ({ ...prev, question: e.target.value }))}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {["option1", "option2", "option3", "option4"].map((optionKey, index) => (
                    <input
                      key={optionKey}
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={newQuizData[optionKey]}
                      onChange={(e) => setNewQuizData((prev) => ({ ...prev, [optionKey]: e.target.value }))}
                      className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                    />
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Correct Answer</label>
                  <input
                    type="text"
                    placeholder="Must exactly match one of the options"
                    value={newQuizData.answer}
                    onChange={(e) => setNewQuizData((prev) => ({ ...prev, answer: e.target.value }))}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
                  />
                </div>

                <button
                  onClick={onAddQuizQuestion}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                >
                  Add Quiz Question
                </button>
              </div>
            )}
            
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end shrink-0">
          <button 
            onClick={onClose} 
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

/**
 * Student details and enrollment course registry modal.
 */
function StudentProfileModal({
  managingStudent,
  courses,
  enrollCourseSelect,
  setEnrollCourseSelect,
  onEnroll,
  onUnenroll,
  onClose
}) {
  const enrolledCourseIds = managingStudent.enrolledCourses || {};

  const getEnrollmentProgress = (enrollment, course) => {
    if (typeof enrollment === "number") {
      return enrollment;
    }

    if (!course) {
      return enrollment?.completed ? 100 : 0;
    }

    const totalLessons = course.modules?.reduce((sum, mod) => sum + (mod.lessons?.length || 0), 0) || 0;
    if (totalLessons === 0) {
      return enrollment?.completed ? 100 : 0;
    }

    const lessonIds = new Set(
      course.modules?.flatMap((mod) => (mod.lessons || []).map((lesson) => lesson._id?.toString())) || []
    );
    const completedLessons = Array.isArray(enrollment?.completedLessons)
      ? [...new Set(enrollment.completedLessons.map((lessonId) => String(lessonId)))].filter((lessonId) => lessonIds.has(lessonId))
      : [];

    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Student Profile Manager</span>
            <h3 className="font-bold text-lg">{managingStudent.name}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-full transition cursor-pointer">
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Active Course List progress */}
          <div>
            <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2 mb-4">Course Progress Tracker</h4>
            {Object.keys(enrolledCourseIds).length === 0 ? (
              <p className="text-sm text-slate-450 italic">Student is not currently enrolled in any courses.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(enrolledCourseIds).map(([courseId, enrollment]) => {
                  const course = courses.find(c => c._id === courseId);
                  const progress = getEnrollmentProgress(enrollment, course);
                  return (
                    <div key={courseId} className="flex items-center justify-between text-xs bg-slate-50 border border-slate-100 p-3 rounded-xl animate-fade-in">
                      <div className="w-2/3">
                        <span className="font-semibold text-slate-800 block line-clamp-1">
                          {course ? course.title : courseId}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${progress}%` }}></div>
                          </div>
                          <span className="text-[10px] text-slate-500">{progress}% complete</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onUnenroll(courseId)}
                        className="text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                      >
                        Unenroll
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Registration form */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3">
            <h4 className="font-bold text-slate-800 text-xs">Register in Course manually</h4>
            <div className="flex gap-2">
              <select 
                value={enrollCourseSelect}
                onChange={(e) => setEnrollCourseSelect(e.target.value)}
                className="flex-1 p-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-indigo-500 text-slate-800"
              >
                <option value="">-- Choose Course --</option>
                {courses
                  .filter(c => !Object.prototype.hasOwnProperty.call(enrolledCourseIds, c._id))
                  .map(c => (
                    <option key={c._id} value={c._id}>{c.title}</option>
                  ))
                }
              </select>
              <button
                onClick={onEnroll}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer"
              >
                Enroll
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
