import { jwtDecode } from "jwt-decode";

// State Manager for IYF LMS using live Backend APIs
const API_BASE_URL = import.meta.env.VITE_LMS_API_URL || 'http://localhost:3000/api';

function getCourseId(courseId) {
  if (!courseId) return null;

  if (typeof courseId === 'object') {
    return courseId._id || courseId.id || null;
  }

  return courseId;
}

function toEnrollmentArray(studentData = {}) {
  if (studentData.enrolledCourses && typeof studentData.enrolledCourses === 'object') {
    return Object.entries(studentData.enrolledCourses).map(([courseId, value]) => {
      if (value && typeof value === 'object') {
        return {
          courseId,
          enrollmentDate: value.enrollmentDate || new Date().toISOString(),
          completedLessons: value.completedLessons || [],
          completedQuizzes: value.completedQuizzes || [],
          completed: Boolean(value.completed),
        };
      }

      return {
        courseId,
        enrollmentDate: new Date().toISOString(),
        completedLessons: [],
        completedQuizzes: [],
        completed: Boolean(value),
      };
    });
  }

  if (Array.isArray(studentData.enrollments)) {
    return studentData.enrollments.map((enrollment) => ({
      ...enrollment,
      courseId: getCourseId(enrollment.courseId),
    }));
  }

  return [];
}

function toEnrolledCoursesMap(enrollments = []) {
  return enrollments.reduce((accumulator, enrollment) => {
    const courseId = getCourseId(enrollment.courseId);
    if (!courseId) return accumulator;

    accumulator[courseId] = {
      ...enrollment,
      courseId,
    };

    return accumulator;
  }, {});
}

function normalizeStudent(student) {
  if (!student) return student;

  const enrollments = Array.isArray(student.enrollments) ? student.enrollments : [];

  return {
    ...student,
    id: student._id,
    enrollments,
    enrolledCourses: toEnrolledCoursesMap(enrollments),
  };
}

const PAYMENT_API_BASE_URL = import.meta.env.VITE_PAYMENT_API_URL || '';

// Helper wrapper for fetch requests
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    options.headers = options.headers || {};

    const token = localStorage.getItem('token');
    

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch((e) => ({
        message: `HTTP error! Status: ${response.status}`,
      }));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Request Error [${endpoint}]:`, error);
    throw error;
  }
}

async function paymentApiRequest(endpoint, options = {}) {
  try {
    const url = `${PAYMENT_API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.error || `Payment API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`Payment API Request Error [${endpoint}]:`, error);
    throw error;
  }
}

// ---------------- Login and Logout ----------------
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch((e) => ({
        message: `HTTP error! Status: ${response.status}`,
      }));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return {
      ...data,
      user: normalizeStudent(data.user),
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('token');
}


// ---------------- COURSE OPERATIONS (Admin + Student) ----------------

export async function getCourses() {
  return await apiRequest('/courses');
}

export async function getCourseById(id) {
 
  if (!id) {
    console.warn('getCourseById called without a valid id');
    return null;
  }
  return await apiRequest(`/courses/${id}`);
}

export async function saveCourse(courseData) {

  return await apiRequest('/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
  });
}

export async function deleteCourse(id) {
  return await apiRequest(`/courses/${id}`, {
    method: 'DELETE',
   
  });
}

// ---------------- Cloudinary ----------------
export async function uploadImageToCloudinary(file) {
  try{
    return await fetch(`${API_BASE_URL}/cloudinary/upload`, {
      method: 'POST',
      body: file,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
  catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}


// ---------------- STUDENT PROFILE & LIST OPERATIONS (Admin) ----------------

export async function getStudents() {
  const students = await apiRequest('/users');
  return (students || []).map(normalizeStudent);
}

export async function getStudentById(id) {
  const student = await apiRequest(`/users/${id}`,{method: 'GET'});
  return normalizeStudent(student);
}

export async function saveStudent(studentData) {
  const payload = {
    ...studentData,
    enrollments: toEnrollmentArray(studentData),
  };

  delete payload.enrolledCourses;
  if (payload.id && !payload._id) {
    payload._id = payload.id;
  }
  delete payload.id;

  return await apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerUser(userData) {
  const payload = {
    ...userData,
    enrollments: toEnrollmentArray(userData),
  };

  delete payload.enrolledCourses;
  if (payload.id && !payload._id) {
    payload._id = payload.id;
  }
  delete payload.id;

  return await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function saveUser(userData) {
  const payload = {
    ...userData,
    enrollments: toEnrollmentArray(userData),
  };

  delete payload.enrolledCourses;
  if (payload.id && !payload._id) {
    payload._id = payload.id;
  }
  delete payload.id;

  return await apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteUser(id) {
  return await apiRequest(`/users/`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}
// ---------------- STUDENT PROGRESS OPERATIONS (Student) ----------------

export async function getEnrollments() {
  const token = localStorage.getItem('token');
  if (!token) {
    return [];
  }

  const { id } = jwtDecode(token);
  const student = await getStudentById(id);
  return student?.enrollments || [];
}

export async function enrollInCourse(courseId) {
  const userId = jwtDecode(localStorage.getItem('token')).id;
  return await apiRequest(`/users/enroll`, {
    method: 'POST',
    body: JSON.stringify({ courseId, userId }),
  });
}

export async function initiateTreasuryPayment(paymentData) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User session is required to start a payment.');
  }

  return await paymentApiRequest('/api/lms/payment/initiate', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  });
}

export async function getTreasuryPaymentStatus(referenceId, paymentToken = '') {
  const endpoint = paymentToken
    ? `/api/lms/payment/status?token=${encodeURIComponent(paymentToken)}`
    : `/api/lms/payment/status/${encodeURIComponent(referenceId)}`;
  return await paymentApiRequest(endpoint);
}

export async function getTreasuryPaymentReceipt(referenceId) {
  return await paymentApiRequest(`/api/payment/receipt/${encodeURIComponent(referenceId)}`);
}

export const getCourseProgress = async (course) => {

          if (!course) {
            return {
              completedLessons: [],
              quizPassed: false,
              progress: 0,
              completed: false,
              totalLessons: 0,
              completedCount: 0
            };
          }

          //find course full details
          const courseDetails = await getCourseById(course.courseId);
          const allLessonIds = courseDetails?.modules?.flatMap((module) =>
            (module.lessons || []).map((lesson) => String(lesson._id))
          ) || [];
          const validLessonIdSet = new Set(allLessonIds);
          const quizModuleIds = (courseDetails?.modules || [])
            .filter((module) => Array.isArray(module.quiz) && module.quiz.length > 0)
            .map((module) => String(module._id));
          const passedQuizModuleIds = new Set(
            (course.completedQuizzes || [])
              .filter((quiz) => quiz && quiz.passed)
              .map((quiz) => String(quiz.moduleId))
          );

          // Calculate total lessons         
          let totalLessons = allLessonIds.length;
          

          if (totalLessons === 0) return {
            completedLessons: [],
            quizPassed: course.completedQuizzes || false,
            progress: 100,
            completed: true,
            totalLessons: 0,
            completedCount: 0
          };

          const completedLessons = Array.isArray(course.completedLessons)
            ? [...new Set(course.completedLessons.map((lessonId) => String(lessonId)))].filter((lessonId) => validLessonIdSet.has(lessonId))
            : [];
          const completedCount = completedLessons.length;
          const progressPercent = Math.round((completedCount / totalLessons) * 100);
          const quizPassed = quizModuleIds.length === 0 || quizModuleIds.every((quizModuleId) => passedQuizModuleIds.has(quizModuleId));
          const completed = completedCount >= totalLessons && quizPassed;

          return {
            completedLessons,
            quizPassed,
            progress: progressPercent,
            completed,
            totalLessons,
            completedCount
          };

        }

export async function toggleLessonCompletion(courseId, lessonId) {

  const token = localStorage.getItem('token');

  return await apiRequest(`/users/complete-lesson`, {
    method: 'POST',
    body: JSON.stringify({ courseId, lessonId, userId: jwtDecode(token).id }),
  });
}

export async function submitModuleQuiz(courseId, moduleId, score, passed) {
  const token = localStorage.getItem('token');

  return await apiRequest(`/users/submit-quiz`, {
    method: 'POST',
    body: JSON.stringify({
      courseId,
      moduleId,
      score,
      passed,
      userId: jwtDecode(token).id,
    }),
  });
}

export async function passCourseQuiz(courseId) {
  throw new Error(`Quiz completion is not supported by the current backend for course ${courseId}`);
}
