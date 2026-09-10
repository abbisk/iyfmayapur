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
            <section className="relative flex min-h-[520px] h-[70vh] items-center justify-center overflow-hidden bg-[url('/dev.jpg')] bg-cover bg-top px-4 py-16 text-center text-white">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 to-slate-950/75"></div>
                <div className="relative z-10 w-full max-w-3xl">
                    <FadeUp>
                        <h1 className="font-serif text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">Vedic Scripture & Philosophy</h1>
                    </FadeUp>
                    <FadeUp>
                        <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-7 text-slate-100 drop-shadow sm:text-lg">Deepen your spiritual understanding through authorized systematic study of Vedic texts, designed to nurture character, values, and profound scriptural realization.</p>
                    </FadeUp>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button className="min-h-11 rounded-md bg-yellow-300 px-6 py-3 font-semibold text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:bg-yellow-200" onClick={scrollToFeatured}>Browse Vedic Courses</button>
                        <Link to='/lms/dashboard'>
                            <button className="min-h-11 rounded-md bg-white/90 px-6 py-3 font-semibold text-slate-900 shadow-md transition hover:-translate-y-0.5 hover:bg-white" type="button">Go to Dashboard</button>
                        </Link>
                    </div>
                </div>
            </section>

            <section id='featured-courses' className="px-4 py-16 text-center sm:px-8">
                <FadeUp>
                    <h2 className="text-3xl font-bold font-serif mb-8 text-gray-800">Our Vedic Courses</h2>
                </FadeUp>

                <div className="mt-8 flex flex-wrap justify-center gap-6">
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
                    <Link to='/lms' className="mt-8 inline-block">
                        <button className="rounded-md border border-amber-600 bg-white px-4 py-3 text-amber-800 transition hover:-translate-y-0.5 hover:bg-amber-50" type="button">View All Categories</button>
                    </Link>
                </FadeUp>
            </section>

            <div className="px-4 pb-16 text-center text-slate-600 sm:px-12">
                <strong className="font-serif text-xl italic leading-relaxed sm:text-2xl">
                    <FadeUp>
                        "This system of Bhagavad-gita is not a new thing. It is eternal."
                    </FadeUp>
                </strong>

                <FadeUp>
                    <p className="mt-4 font-serif">- A. C. Bhaktivedanta Swami Prabhupada</p>
                </FadeUp>
            </div>
        </div>
    );
}