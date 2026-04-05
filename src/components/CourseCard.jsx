export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {course.instructor}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-sm">
          <span className="font-semibold">{course.rating}</span>
          ⭐
          <span className="text-gray-400">
            ({course.students})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">
            ${course.price}
          </span>
          <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
