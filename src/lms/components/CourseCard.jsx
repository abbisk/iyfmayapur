export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg line-clamp-2">
          {course.title}
        </h3>
{/* 
        <p className="text-sm text-gray-500 mt-1">
          {course.instructor}
        </p> */}

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-sm">
          <span className="font-semibold">{course.rating}</span>
          ⭐
          <span className="text-gray-400">
            ({course.students})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-slate-900">
            Rs. {course.price}
          </span>
          <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
