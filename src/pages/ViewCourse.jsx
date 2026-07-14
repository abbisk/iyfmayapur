import { FiBarChart2, FiCheck, FiClock, FiFileText, FiPlayCircle, FiStar, FiUsers } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { youthCourses } from "../data/youthCourses.jsx";

export default function ViewCourse() {
  const { courseId } = useParams();
  const course = youthCourses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <div className="course-not-found">
        <h1>Course not found</h1>
        <Link to="/youth-courses">Browse available courses</Link>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <section className="course-detail-hero">
        <div className="course-detail-shell course-detail-hero__grid">
          <div>
            <p className="course-detail-kicker">IYF Mayapur online course</p>
            <h1>{course.title}</h1>
            <p className="course-detail-lead">{course.description}</p>

            <div className="course-detail-meta">
              <span><FiStar /> {course.rating} rating</span>
              <span><FiUsers /> {course.students} students</span>
              <span><FiBarChart2 /> {course.level}</span>
            </div>
            <p className="course-detail-teacher">Created by <strong>{course.instructor}</strong></p>
          </div>

          <aside className="course-enroll-card">
            <div className="course-enroll-card__image">
              <img src={course.imageUrl} alt={course.title} />
              <span><FiPlayCircle /></span>
            </div>
            <div className="course-enroll-card__body">
              <strong className="course-enroll-card__price">{course.price}</strong>
              <Link className="course-primary-button" to={`/player/${course.id}`}>
                Start learning
              </Link>
              <p>This course includes</p>
              <ul>
                <li><FiPlayCircle /> {course.lessons.length} video lessons</li>
                <li><FiFileText /> MCQ after every lesson</li>
                <li><FiCheck /> Practical assignments</li>
                <li><FiClock /> Learn at your own pace</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="course-detail-shell course-detail-content">
        <div className="course-learning-card">
          <h2>What you’ll learn</h2>
          <div className="course-learning-points">
            <p><FiCheck /> Understand the course’s foundational ideas.</p>
            <p><FiCheck /> Apply each lesson through guided reflection.</p>
            <p><FiCheck /> Check your knowledge with short MCQs.</p>
            <p><FiCheck /> Build confidence through practical assignments.</p>
          </div>
        </div>

        <div className="course-curriculum-preview">
          <h2>Course content</h2>
          <p>{course.lessons.length} lessons</p>
          <div>
            {course.lessons.map((lesson, index) => (
              <div className="course-preview-lesson" key={lesson.id}>
                <span className="course-preview-lesson__number">{index + 1}</span>
                <FiPlayCircle />
                <strong>{lesson.title}</strong>
                <span>{lesson.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
