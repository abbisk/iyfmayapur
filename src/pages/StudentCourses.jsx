import { CourseCard } from "../components/Card"
import bgimage from '../assets/sample.jpg'
import gita from '../assets/gita.png'
import mantra from '../assets/mantra.jpeg'
import kirtan from '../assets/kirtan.jpg'
import { Link } from "react-router-dom"
import SidebarLMS from "../components/SidebarLMS"

export default function StudentCourses() {

    const headingStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#000000ff',
        fontFamily: 'Merryweather, serif',
    }

    const pageStyle = {
        textAlign: 'center', alignItems: 'center', backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem',
        height: '70vh',
        overflow: 'hidden'
    }
    const buttonStyle = {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontFamily: 'open-sans, sans-serif',
        backgroundColor: '#d4d13fff',
        color: '#000000ff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(26, 22, 22, 0.1)',
    }

    const subtitleStyle = {
        color: '#4e2d2dff',
        fontFamily: 'open-sans, sans-serif',
        lineHeight: '1.8rem'
    }

    const innerpageStyle = {
        padding: '2rem',
        borderRadius: '10px',
        maxWidth: '700px',
        margin: '0 auto'
    }

    const headingStyle2 = {
        fontSize: '2.3rem',
        fontWeight: 'bold',
        color: '#000000ff',
        fontFamily: 'Merryweather, serif',
        textAlign: 'center',
        marginTop: '2rem'
    }

    const buttonStyle2 = { fontFamily: 'open sans,serif', color: ' #92692fff', backgroundColor: '#FFFFFFFF', borderColor: '#E6A64CFF', borderRadius: '6px', fontSize: '14px', padding: '0.4rem' }


    const scrollToFeatured = () => {
        const featuredSection = document.getElementById('featured-courses');
        if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth' });
        }
    }


    return (
        <div>
            <div style={pageStyle}>
                <div style={innerpageStyle}>

                    <div style={headingStyle}>Discover Inner Harmony through Ancient Wisdom.</div>
                    <p style={subtitleStyle}>IYF Mayapur offers a peaceful and devotional platform to explore spiritual knowledge and  practices, guiding you towards a fulfilling life grounded in timeless traditions.</p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button style={buttonStyle} onClick={scrollToFeatured}>Browse Courses</button>
                    <Link to='/dashboard'>
                    <button style={buttonStyle}>Go to Dashboard</button>
                    </Link>

                    </div>
                </div>
            </div>

            <div id='featured-courses' style={{ textAlign: 'center', margin: '5rem' }}>

                {/* <div style={headingStyle2}>
                Our Featured Courses
            </div> */}
            
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                    <CourseCard imageUrl={gita} title='Introduction to Bhagavad Gita' subtitle='Explore the timeless wisdom of the Bhagavad Gita and its practical application' level='Beginner' courseId='course123' />
                    <CourseCard imageUrl={mantra} title='Meditation for Inner Peace' subtitle='Learn simple yet profound meditation technique to calm the mind and connect with your inner self.' level='All levels' courseId='course124' />
                    <CourseCard imageUrl={kirtan} title='The Art of Kirtan' subtitle='Discover the power of mantra meditation through call-and-response chanting with musical instruments.' level='Beginner' courseId='course125' />
                    <CourseCard imageUrl={gita} title='Introduction to Bhagavad Gita' subtitle='Explore the timeless wisdom of the Bhagavad Gita and its practical application' level='Beginner' courseId='course123' />
                    <CourseCard imageUrl={mantra} title='Meditation for Inner Peace' subtitle='Learn simple yet profound meditation technique to calm the mind and connect with your inner self.' level='All levels' courseId='course124' />
                    <CourseCard imageUrl={kirtan} title='The Art of Kirtan' subtitle='Discover the power of mantra meditation through call-and-response chanting with musical instruments.' level='Beginner' courseId='course125' />
                </div>

                <Link to='/courses' style={{ textDecoration: 'none' }}>
                    <button style={buttonStyle2}>View All Courses</button>
                </Link>
            </div>

            <div style={{ textAlign: 'center' }}>
                <strong style={{ fontFamily: 'Merryweather, serif', fontStyle: 'italic', fontSize: '2rem', color: '#565D6DFF' }}>"Inquiries in submission constitute the proper combination for spiritual understanding."</strong>
                <p style={{ fontFamily: 'Merryweather', color: '#565D6DFF' }}>- A. C. Bhaktivedanta Swami Prabhupada</p>
            </div>
        </div>
    )
}