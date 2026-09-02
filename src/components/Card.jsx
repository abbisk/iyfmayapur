import { IoMdTv } from "react-icons/io"
import { Link } from "react-router-dom"
import { cloudinaryAsset } from "../lib/cloudinary"

export function CourseCard({ title, imageUrl, courseId, price }) { 

    const imageStyle = {
        width: '100%'
        
    }

    const headingStyle = {
        fontSize: '1.5rem',
        fontWeight: '600',
        fontFamily: 'Merryweather, serif',
        color: '#1a1a1a',
        margin: '0 0.4rem',
        lineHeight: '1.4',
        letterSpacing: '-0.02em'
    }

    const subtextStyle = {
        fontSize: '0.95rem',
        color: '#666',
        margin: '0 0.3rem',
        lineHeight: '1.6',
        fontFamily: 'Open Sans, sans-serif'
    }

    const buttonStyle = {
        padding: '0.5rem 1rem',
        backgroundColor: '#ffffffff',
        color: '#110404ff',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '0.5rem',
        width: '100%',
        boxShadow:' 0px 0px 0px #00000000, 0px 1px 3px #171a1f12',
        borderColor:' #DEE1E6FF',
        opacity:'1'
    }

    const tagStyle = {
        display: 'inline-block',
        padding: '0.2rem 0.5rem',
        backgroundColor: '',
        borderRadius: '4px',
        fontSize: '0.9rem',
        marginBottom: '0.5rem',
        fontStyle: 'Open Sans, sans-serif',
        boxShadow:'0 1px 2px #504a4aff',
        color:'#504a4aff'
    }

    return(
<div style={{
    maxWidth:'20rem',
    textAlign:'center',
    border:'1px solid #ccc',
    borderRadius:'15px',
    padding:'0',
    boxShadow:'0 2px 5px rgba(0,0,0,0.1)',
    margin:'0',
    overflow:'hidden',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
}}>
    <img src={imageUrl} alt="image" style={imageStyle} />
    <div>
    {/* <div style={tagStyle}>{level}</div> */}
    </div>
    <div style={headingStyle}>{title}</div>

    <div style={{
        padding:'0.5rem'
    }}>

    {/* <p style={subtextStyle}>{subtitle}</p> */}
    <Link to={`/course/${courseId}`} style={{textDecoration:'none'}}>
        <button style={buttonStyle}>View Course</button>
    </Link>
    </div>

</div>
    )
}

export function PersonalCourseCard({ title, subtitle, imageUrl, progress }) { 

    const imageStyle = {
        width: '100%'
        
    }

    const imageContainerStyle = {
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
    }

    const fadeOverlayStyle = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '50%',
        background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9))',
        pointerEvents: 'none'
    }

    const headingStyle = {
        fontSize: '1.5rem',
        fontWeight: '600',
        fontFamily: 'Merryweather, serif',
        color: '#1a1a1a',
        margin: '0 0.4rem',
        lineHeight: '1.4',
        letterSpacing: '-0.02em'
    }

    const subtextStyle = {
        fontSize: '0.95rem',
        color: '#666',
        margin: '0 0.3rem',
        lineHeight: '1.6',
        fontFamily: 'Open Sans, sans-serif'
    }

    const progressBarContainerStyle = {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden',
        marginTop: '0.5rem'
    };

    const progressBarStyle = {
        width: `${progress}%`,
        height: '10px',
        backgroundColor: '#4caf50'
    };

    const buttonStyle = {
        padding: '0.5rem 1rem',
        backgroundColor: '#ffffffff',
        color: '#110404ff',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '0.5rem',
        width: '100%',
        boxShadow:' 0px 0px 0px #00000000, 0px 1px 3px #171a1f12',
        borderColor:' #DEE1E6FF',
        opacity:'1'
    }

    return(
<div style={{
    maxWidth:'20rem',
    textAlign:'center',
    border:'1px solid #ccc',
    borderRadius:'15px',
    padding:'0',
    boxShadow:'0 2px 5px rgba(0,0,0,0.1)',
    margin:'0',
    overflow:'hidden'
}}>
    <div style={imageContainerStyle}>
        <img src={cloudinaryAsset(imageUrl)} alt="image" style={imageStyle} />
        <div style={fadeOverlayStyle}></div>
    </div>
    <div>
    </div>
    <div style={headingStyle}>{title}</div>

    <div style={{
        padding:'0.5rem'
    }}>

    <p style={subtextStyle}>{subtitle}</p>
    <div style={progressBarContainerStyle}>
        <div style={progressBarStyle}></div>
    </div>
    <button style={buttonStyle}>Resume</button>
    </div>

</div>
    )
}

export function ProfileCard({ name, email, imageUrl }) {
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '1rem',
        maxWidth: '300px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    };

    const imageStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '1rem'
    };

    const nameStyle = {
        fontSize: '1.5rem',
        fontWeight: '600',
        margin: '0.5rem 0'
    };

    const emailStyle = {
        fontSize: '1rem',
        color: '#666',
        margin: '0'
    };

    const buttonStyle = {
        backgroundColor: '#ffffffff',
        padding: '0.3rem',
        color: '#000000ff',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '1rem',
        borderColor:' #dbe7fcff',
        fontFamily:'open sans,serif'
    };

    return (
        <div style={cardStyle}>
            <img src={cloudinaryAsset(imageUrl)} alt="Profile" style={imageStyle} />
            <h2 style={nameStyle}>{name}</h2>
            <p style={emailStyle}>{email}</p>
            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '1rem'}}>
                <button style={buttonStyle}>Edit Profile</button >
                <button style={buttonStyle}>Change Password</button>
            </div>
        </div>
    );
}

export function CertificateCard({ courseName, issueDate, certificateUrl }) {
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '10px',
        paddingBottom: '1rem',
        maxWidth: '300px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        margin: '1rem'
    };

    const courseNameStyle = {
        fontSize: '1.2rem',
        fontWeight: '600',
        margin: '0.5rem 0'
    };

    const issueDateStyle = {
        fontSize: '1rem',
        color: '#666',
        margin: '0.5rem 0'
    };

    const buttonStyle = {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
        marginTop: '1rem'
    };

    return (
        <div style={cardStyle}>
             <img src={certificateUrl} alt="Certificate 2" style={{width:'300px', borderRadius:'10px', boxShadow:'0 2px 5px rgba(0,0,0,0.1)'}}/>
            <h3 style={courseNameStyle}>{courseName}</h3>
            <p style={issueDateStyle}>Issued on: {issueDate}</p>
            <a href={certificateUrl} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
                View Certificate
            </a>
        </div>
    );
}

export function SimpleCard({children}){

    const containerStyle={
        width:'80%',
        backgroundColor:'#fdfdbbff',
        padding:'1rem',
        borderRadius:'8px',
        boxShadow:'0 2px 5px rgba(0,0,0,0.1)',
        minHeight:'5rem',
    }
    return(
        <div style={containerStyle}>
{children}

        </div>
    )
}

export function LiveClass({head, date, time}){

    const headStyle={
        fontFamily:'Merriweather, serif',
        margin:'0 0 0.5rem 0',
        padding:'0'
    }

    const subheadStyle={
        fontFamily:'Open Sans, serif',
        fontSize:'1rem',
        margin:'0',
        padding:'0',
        color:'#555555ff'
    }

    const buttonStyle={
        padding: '0.5rem 0.8rem',
        fontSize: '0.9rem',
        fontFamily:'open-sans, sans-serif',
        color: '#000000ff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(26, 22, 22, 0.1)',
        marginLeft:'1rem',
        alignItems:'center',
        display:'flex',
        gap:'0.2rem'
    }

    const joinButtonStyle={
        ...buttonStyle,
        backgroundColor:'#c7c400ff',
        color:'white',
        justifyContent:'space-between',
        gap:'0.6rem'
    }

    const manageButtonStyle={
        ...buttonStyle,
        backgroundColor:'transparent',
        border:'1px solid #ccc'
    }

    return(
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',backgroundColor:'#faf9f9ff', padding:'1rem', borderRadius:'8px', boxShadow:'0 2px 5px rgba(0,0,0,0.1)'}}>
            <div>
            <h3 style={headStyle}>{head}</h3>
            <p style={subheadStyle}>{date} | {time}</p>    
            </div>
            <div style={{display:'flex', gap:'0.5rem'}}>
                <button style={joinButtonStyle}>
                    Join
                    <IoMdTv />
                    </button>
                <button style={manageButtonStyle}>Manage</button>
            </div>
        </div>
    )
}