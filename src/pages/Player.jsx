import { RiArrowDropDownLine } from "react-icons/ri";

export default function Player(){
    return(
        <div><div className="bg-black h-[3rem]"></div>
         <div className="flex justify-spacebetween gap-10">

        <Sidebar />

        <VideoPlayer videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" className="flex-1"/>
         </div>
            
        </div>
    )
}

function Sidebar(){
    return(
        <div className="border w-[15rem]">
            <div className="mx-1 mt-3 text-[red] font-bold text-2xl p-2 border rounded-full text-center w-12 h-12">
                X
            </div>
            <ul className="py-3  flex flex-col">
                <li className="hover:border cursor-pointer hover:bg-gray-100 p-2 flex items-center gap-3 justify-between">This is the first <RiArrowDropDownLine size={24} /></li>
                <li className="hover:border cursor-pointer hover:bg-gray-100 p-2 flex items-center gap-3 justify-between">This is the first <RiArrowDropDownLine size={24} /></li>
                <li className="hover:border cursor-pointer hover:bg-gray-100 p-2 flex items-center gap-3 justify-between">This is the first <RiArrowDropDownLine size={24} /></li>
                <li className="hover:border cursor-pointer hover:bg-gray-100 p-2 flex items-center gap-3 justify-between">This is the first <RiArrowDropDownLine size={24} /></li>
                
            </ul>
        </div>
    )
}

function VideoPlayer({ videoUrl }) {
    return (
        <div>
            <div className="max-w-200 aspect-video mx-auto mt-10 rounded-lg overflow-hidden shadow-lg">
                <iframe className="w-full h-full" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div>
                <h2 className="text-4xl font-bold mt-4 mx-auto max-w-fit">Introduction to Yoga</h2>
                <p className="max-w-200 mx-auto mt-4 text-lg text-gray-700 text-justify px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate odit tenetur id autem officiis, ea nulla officia reprehenderit, at sequi placeat perspiciatis vitae consectetur magnam provident exercitationem quae suscipit.
                    Ipsam, quasi repellendus fugit quis dolorem velit nisi recusandae debitis voluptates numquam voluptas. Repellendus, numquam reiciendis dignissimos nemo mollitia cum eveniet et quod, quasi assumenda eum inventore perspiciatis debitis nam.
                    Nam est, adipisci sapiente in iste eius possimus beatae praesentium, fugit alias dolorum, repellendus earum esse deleniti inventore magni incidunt cupiditate quisquam cum? Fugiat ex eligendi repellat veritatis ducimus! Vel!
                    Voluptas doloribus molestias quam facilis dolore vero iste voluptatibus id autem doloremque ab fugiat eum obcaecati, quos molestiae, ducimus consequuntur fuga harum? Maiores in at adipisci obcaecati nisi dolorem inventore.
            
                </p>
            </div>
        </div>
    );
}