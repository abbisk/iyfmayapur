import { useState, useEffect } from "react";
import { CourseCard } from "../components/Card";
import bgimage from "../assets/sample.jpg";
import { Link } from "react-router-dom";
import { getCourses } from "../utils/lmsState";
import FadeUp from "../utils/motions/FadeUp";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchYouthCourses() {
      try {
        setIsLoading(true);
        const allCourses = await getCourses();
        const youthCourses = (allCourses || []).filter(
          (c) => c.category === "Youth"
        );
        setCourses(youthCourses);
      } catch (err) {
        console.error("Error loading Youth courses:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchYouthCourses();
  }, []);

  const headingStyle = {
    fontSize: "clamp(1.8rem, 5vw, 3rem)",
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Merryweather, serif",
    textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
  };

  const pageStyle = {
    textAlign: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${bgimage})`,
    backgroundSize: "cover",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    height: "70vh",
    overflow: "hidden",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontFamily: "open-sans, sans-serif",
    backgroundColor: "#d4d13fff",
    color: "#000000ff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(26, 22, 22, 0.1)",
  };

  const subtitleStyle = {
    color: "#f5f5f5",
    fontFamily: "open-sans, sans-serif",
    lineHeight: "1.8rem",
    fontSize: "1.1rem",
    textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
  };

  const innerpageStyle = {
    padding: "2rem",
    borderRadius: "10px",
    maxWidth: "700px",
    margin: "0 auto",
  };

  const buttonStyle2 = {
    fontFamily: "open sans,serif",
    color: " #92692fff",
    backgroundColor: "#FFFFFFFF",
    borderColor: "#E6A64CFF",
    borderRadius: "6px",
    fontSize: "14px",
    padding: "0.4rem",
    marginTop: "2rem",
  };

  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("featured-courses");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div style={pageStyle}>
        <div style={innerpageStyle}>
          <FadeUp>
            <div style={headingStyle}>
              Discover Inner Harmony through Ancient Wisdom.
            </div>
          </FadeUp>
          <FadeUp>
            <p style={subtitleStyle}>
              IYF Mayapur offers a peaceful and devotional platform to explore
              spiritual knowledge and practices, guiding you towards a fulfilling
              life grounded in timeless traditions.
            </p>
          </FadeUp>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button style={buttonStyle} onClick={scrollToFeatured}>
              Browse Courses
            </button>
            <Link to="/lms/dashboard">
              <button style={buttonStyle}>Go to Dashboard</button>
            </Link>
          </div>
        </div>
      </div>

      <div
        id="featured-courses"
        style={{ textAlign: "center", margin: "5rem 2rem" }}
      >
        <FadeUp>
          <h2 className="text-3xl font-bold font-serif mb-8 text-gray-800">
            Our Youth Courses
          </h2>
        </FadeUp>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {isLoading ? (
            /* Loading Spinner & Skeleton State */
            <div className="flex flex-col items-center justify-center py-12 gap-3 w-full">
              <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm font-medium">
                Fetching youth courses...
              </p>
            </div>
          ) : courses.length === 0 ? (
            <p className="text-gray-600 text-lg">
              No youth courses available yet. Admin can add courses from the
              Admin Portal.
            </p>
          ) : (
            courses.map((course) => (
              <FadeUp key={course._id}>
                <CourseCard
                  imageUrl={course.imgUrl}
                  title={course.title}
                  price={course.price}
                  courseId={course._id}
                />
              </FadeUp>
            ))
          )}
        </div>

        <FadeUp>
          <Link to="/lms" style={{ textDecoration: "none" }}>
            <button style={buttonStyle2}>View All Categories</button>
          </Link>
        </FadeUp>
      </div>

      <div style={{ textAlign: "center", margin: "4rem 2rem" }}>
        <FadeUp>
          <strong
            style={{
              fontFamily: "Merryweather, serif",
              fontStyle: "italic",
              fontSize: "2rem",
              color: "#565D6DFF",
            }}
          >
            "Inquiries in submission constitute the proper combination for
            spiritual understanding."
          </strong>
        </FadeUp>
        <FadeUp>
          <p
            style={{
              fontFamily: "Merryweather",
              color: "#565D6DFF",
              marginTop: "1rem",
            }}
          >
            - A. C. Bhaktivedanta Swami Prabhupada
          </p>
        </FadeUp>
      </div>
    </div>
  );
}