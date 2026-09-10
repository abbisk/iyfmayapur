import { CourseCard } from '../components/Card';
import { cloudinaryAsset } from '../lib/cloudinary';
import enrolledCourses from '../data/enrolledCourses';

const road = cloudinaryAsset('/road.jpg');

export default function Dashboard(){

    

    return (
        <div>
            <div className="bg-black h-[3rem]"></div>
            <div className='flex p-[1rem]'>
            <ProfileCard name='Hare Krsna' email='harekrsna@gmail.com' imageUrl={road} />
            <div className='px-[1rem] mx-[1rem] border-l-2 border-gray-300'>
                <EnrolledCourses type='Enrolled Courses' />
                <EnrolledCourses type='Completed Courses' />
                
            </div>

            </div>
            
        </div>
    )
}

function EnrolledCourses({type}){

    return(
        <div>
            <h2 className='font-semibold text-3xl font-serif'>{type}</h2>

                <div className='flex flex-wrap gap-[1rem] m-[1rem]'>

                {enrolledCourses.map((course) => (
                     <CourseCard title={course.title} id={course.id} price={course.price} imageUrl={cloudinaryAsset(course.imageUrl)} />
                ))}
                </div>
        </div>
    )
}


function ProfileCard({ name, email, imageUrl }){

    return(
            <div className="items-center gap-4 flex flex-col border p-[1rem] rounded-3xl w-[fit-content] max-h-[50vh]">
                <img src={imageUrl} className='h-[20vh] rounded-3xl'/>
                <div>
                <p className='text-2xl font-semibold font-serif'>
                    {name}
                </p>
                <p>
                    {email}
                </p>
                </div>

                <button className='rounded-lg p-[5px] text-white font-bold' style={{
                    backgroundColor:'rgb(100, 136, 255)',
                }}>Profile Setting</button>
            </div>
    )
}