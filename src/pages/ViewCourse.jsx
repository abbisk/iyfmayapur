import { FiBarChart2, FiCheck, FiClock, FiFileText, FiPlayCircle, FiStar, FiUsers } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { youthCourses } from "../data/youthCourses.jsx";

export default function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      setCourse(null);
      setIsEnrolled(false);
      return;
    }
    let isActive = true;

    async function loadData() {
      setLoading(true);
      setCourse(null);
      setIsEnrolled(false);
      try {
        const foundCourse = await getCourseById(courseId);
  
        if (!isActive) return;

        if (!foundCourse) {
          setCourse(null);
    
          return;
        }

        setCourse(foundCourse);
       
      } catch (err) {
        console.error("Error loading course details:", err);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isActive = false;
    };
  }, [courseId]);

  useEffect(() => {
    let isActive = true;

    async function loadEnrollmentState() {
      if (!courseId || !course) {
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        if (isActive) {
          setIsEnrolled(false);
        }
        return;
      }

      try {
        const student = await getStudentById(jwtDecode(token).id);
        if (!isActive) return;

        const isCourseEnrolled = student?.enrollments?.some((enrollment) => String(enrollment.courseId) === String(courseId));
        setIsEnrolled(Boolean(isCourseEnrolled));
      } catch (err) {
        console.error("Error loading enrollment state:", err);
        if (isActive) {
          setIsEnrolled(false);
        }
      }
    }

    loadEnrollmentState();

    return () => {
      isActive = false;
    };
  }, [courseId, course]);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const referenceId = search.get('reference_id');
    const paymentError = search.get('payment_error');

    if (!referenceId && !paymentError) return;
    if (!courseId) return;

    if (paymentError) {
      setCheckoutLoading(false);
      alert('Payment could not be completed. Please try again.');
      window.history.replaceState({}, '', `/course/${courseId}`);
      return;
    }

    const processReturnedPayment = async () => {
      try {
        setCheckoutLoading(true);
        const payment = await getTreasuryPaymentStatus(referenceId);

        if (payment?.status === 'success') {
          await enrollInCourse(courseId);
          window.history.replaceState({}, '', `/course/${courseId}`);
          navigate(`/player/${courseId}`);
          return;
        }

        alert('Payment was not completed successfully. Please try again.');
        window.history.replaceState({}, '', `/course/${courseId}`);
      } catch (err) {
        console.error('Payment status check failed:', err);
        alert('Payment status could not be verified. Please contact support.');
      } finally {
        setCheckoutLoading(false);
      }
    };

    processReturnedPayment();
  }, [courseId, location.search, navigate]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Loading course details...</h2>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
        <p className="text-gray-600 mt-2">The course you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  // Calculate total lessons
  let totalLessons = 0;
  course.modules?.forEach(mod => {
    totalLessons += mod.lessons?.length || 0;
  });

  const parseCourseAmount = (price) => {
    if (price == null) return 0;
    const normalized = String(price).toLowerCase().trim();
    if (!normalized || normalized === 'free') return 0;

    const numeric = normalized.replace(/[^0-9.]/g, '');
    const amount = Number.parseFloat(numeric);
    if (Number.isNaN(amount) || amount <= 0) return 0;

    return Math.round(amount * 100);
  };

  const handleEnrollment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const amount = parseCourseAmount(course.price);

      if (amount === 0) {
        await enrollInCourse(course._id);
        navigate(`/player/${course._id}`);
        return;
      }

      const userId = jwtDecode(token).id;
      const student = await getStudentById(userId);
      const paymentPayload = {
        amount: Number((amount / 100).toFixed(2)),
        email: student?.email || '',
        mobile: student?.mobile || '',
        first_name: student?.first_name || '',
        last_name: student?.last_name || '',
        address_1: student?.address_1 || 'Online purchase',
        pin_code: student?.pin_code || '000000',
        district: student?.district || 'Online',
        city: student?.city || 'Online',
        state: student?.state || 'India',
        country: student?.country || 'India',
        transaction_purpose: `Course enrollment - ${course.title}`,
      };

      setCheckoutLoading(true);
      const data = await initiateTreasuryPayment(paymentPayload);

      if (!data?.payment_url) {
        throw new Error('Treasury checkout URL was not returned.');
      }

      window.location.assign(data.payment_url);
    } catch (err) {
      console.error("Error enrolling in course:", err);
      alert(err.message || 'Unable to start checkout');
      setCheckoutLoading(false);
    }
  };

  const toggleModule = (modId) => {
    if (expandedModule === modId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(modId);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-10 pb-16">
      {/* Hero Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 to-indigo-950 text-white py-16 px-4 md:px-8 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <span className="bg-amber-500/20 text-amber-400 text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-amber-500/30">
              {course.category} Course
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold font-serif mt-4 text-white leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg text-slate-300 mt-4 leading-relaxed max-w-3xl">
              {course.description}
            </p>
            
            {/* Quick stats on mobile / tablet */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <FaGraduationCap className="text-amber-400 text-lg" />
                <span>{course.level} Level</span>
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-amber-400 text-lg" />
                <span>{course.duration} Duration</span>
              </span>
              <span className="flex items-center gap-2">
                <FaBookOpen className="text-amber-400 text-lg" />
                <span>{totalLessons} Lessons</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid md:grid-cols-3 gap-8">
        
        {/* Left Column: About & Curriculum */}
        <div className="md:col-span-2 space-y-8">
          
          {/* About Course */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 font-serif mb-4 pb-2 border-b border-gray-100">
              About this Course
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-justify">
              {course.longDescription || course.description}
            </p>
          </div>

          {/* Curriculum */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 font-serif mb-6 pb-2 border-b border-gray-100">
              Course Syllabus
            </h2>
            
            {course.modules && course.modules.length > 0 ? (
              <div className="space-y-4">
                {course.modules.map((mod, idx) => {
                  const isExpanded = expandedModule === mod._id || (expandedModule === null && idx === 0);
                  return (
                    <div key={mod._id} className="border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                      {/* Module Header */}
                      <button 
                        onClick={() => toggleModule(mod._id)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/80 transition text-left"
                      >
                        <div>
                          <h3 className="font-semibold text-slate-800 text-base md:text-lg">
                            {mod.title}
                          </h3>
                          <span className="text-xs text-slate-500 mt-1 block">
                            {mod.lessons?.length || 0} Lessons
                          </span>
                        </div>
                        {isExpanded ? (
                          <FaChevronUp className="text-slate-500" />
                        ) : (
                          <FaChevronDown className="text-slate-500" />
                        )}
                      </button>
                      
                      {/* Module Lessons List */}
                      {isExpanded && (
                        <div className="divide-y divide-slate-100 bg-white">
                          {mod.lessons && mod.lessons.map(lesson => (
                            <div key={lesson._id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition">
                              <div className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                <span className="text-sm font-medium text-slate-700">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">No modules listed for this course yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: Enrollment Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden sticky top-24">
            
            {/* Course Preview Image */}
            <div className="relative w-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <img 
                src={course.imgUrl} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
            </div>
            
            {/* Pricing and Action */}
            <div className="p-6">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Price</span>
                <span className="text-3xl font-extrabold text-slate-900">Rs. {course.price}</span>
              </div>
              
              {isEnrolled ? (
                <button
                  onClick={() => navigate(`/player/${course._id}`)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaGraduationCap className="text-xl" />
                  Resume Learning
                </button>
              ) : (
                <button
                  onClick={handleEnrollment}
                  disabled={checkoutLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  {checkoutLoading ? 'Opening Checkout...' : 'Enroll Now'}
                </button>
              )}
              
              {/* Course details bullet points */}
              <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
                <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">This Course Includes:</h4>
                
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <FaClock className="text-indigo-500 mt-0.5 shrink-0" />
                  <span>{course.duration} of lessons video instruction</span>
                </div>
                
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <FaBookOpen className="text-indigo-500 mt-0.5 shrink-0" />
                  <span>{totalLessons} lessons with downloadable resources</span>
                </div>
                
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <FaAward className="text-indigo-500 mt-0.5 shrink-0" />
                  <span>Official completion certificate from IYF Mayapur</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}