import CourseCard from "./CourseCard";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Doe",
    rating: 4.8,
    students: 12450,
    price: 49,
    thumbnail: "https://source.unsplash.com/400x300/?coding",
  },
  {
    id: 2,
    title: "Data Science with Python",
    instructor: "Jane Smith",
    rating: 4.7,
    students: 9800,
    price: 59,
    thumbnail: "https://source.unsplash.com/400x300/?data",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Alex Lee",
    rating: 4.9,
    students: 7200,
    price: 39,
    thumbnail: "https://source.unsplash.com/400x300/?design",
  },
];

export default function CoursesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Popular Courses
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
