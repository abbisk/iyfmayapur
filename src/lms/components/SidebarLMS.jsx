export default function SidebarLMS() {
    return (
        <div className="w-64 bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Login Here</h2>
            <ul className="space-y-2">
                <li>
                    <a href="/student-courses" className="block px-3 py-2 rounded hover:bg-gray-200">
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="/events" className="block px-3 py-2 rounded hover:bg-gray-200">
                        Profile
                    </a>
                </li>
                {/* Add more sidebar links as needed */}
            </ul>
        </div>
    );
}