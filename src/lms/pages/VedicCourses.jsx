import { useState, useEffect } from "react";
import { CourseCard } from "../components/Card";
import { Link } from "react-router-dom";
import { getCourses } from "../utils/lmsState";
import FadeUp from "../utils/motions/FadeUp";

export default function VedicCourses() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchVedicCourses() {
            try {
                setIsLoading(true);
                const allCourses = await getCourses();
                const vedicCourses = (allCourses || []).filter(c => c.category === 'Vedic');
                setCourses(vedicCourses);
            } catch (err) {
                console.error("Error loading Vedic courses:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchVedicCourses();
    }, []);

    const scrollToFeatured = () => {
        const featuredSection = document.getElementById('featured-courses');
        if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <section className="lms-vedic-hero">
                <div className="lms-vedic-hero__overlay"></div>
                <div className="lms-vedic-hero__content">
                    <h1 className="lms-vedic-hero__title">Vedic Scripture & Philosophy</h1>
                    <p className="lms-vedic-hero__subtitle">Deepen your spiritual understanding through authorized systematic study of Vedic texts, designed to nurture character, values, and profound scriptural realization.</p>

                    <div className="lms-vedic-hero__actions">
                        <button className="lms-hero-button" onClick={scrollToFeatured}>Browse Vedic Courses</button>
                        <Link to='/lms/dashboard'>
                            <button className="lms-hero-button" type="button">Go to Dashboard</button>
                        </Link>
                    </div>
                </div>
            </section>

            <section id='featured-courses' className="lms-featured-courses">
                <FadeUp>
                    <h2 className="text-3xl font-bold font-serif mb-8 text-gray-800">Our Vedic Courses</h2>
                </FadeUp>

                <div className="lms-course-grid">
                    {isLoading ? (
                        /* Loading Spinner State */
                        <div className="flex flex-col items-center justify-center py-12 gap-3 w-full">
                            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 text-sm font-medium">Fetching Vedic courses...</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <p className="text-gray-600 text-lg">No Vedic courses available yet. Admin can add courses from the Admin Portal.</p>
                    ) : (
                        courses.map(course => (
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
                    <Link to='/lms' className="lms-secondary-link">
                        <button className="lms-secondary-button" type="button">View All Categories</button>
                    </Link>
                </FadeUp>
            </section>

            <div className="lms-quote">
                <strong className="lms-quote__text">
                    <FadeUp>
                        "This system of Bhagavad-gita is not a new thing. It is eternal."
                    </FadeUp>
                </strong>

                <FadeUp>
                    <p className="lms-quote__author">- A. C. Bhaktivedanta Swami Prabhupada</p>
                </FadeUp>
            </div>
        </div>
    );
}