import { useParams } from "react-router-dom";
import {youthCourses} from "../data/youthCourses.jsx"


export default function ViewCourse() {

    const courses = youthCourses
    const {courseId} = useParams();
    const course = courses.find(c => c.id === courseId);
    return(
<div className="pt-15">
    view course {course.id} - {course.title} - {course.description} - {course.price} - {course.imgeUrl}
    
    <img src={course.imgeUrl} alt="image" className="max-w-[100vh] mx-auto my-[3rem] rounded-2xl"  />

        <p className="text-center">
    <button className="bg-[blue] rounded-xl p-2 text-white font-bold">Enroll now for {course.price}</button>

        </p>
</div>
    )
}