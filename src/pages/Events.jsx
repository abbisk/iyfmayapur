export default function Events() {
  return (
    <div className="py-10 px-2">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 text-center">Events Page</h1>
      <p className="text-base sm:text-lg text-center text-black bg-black/20 p-4 rounded-lg">
        Welcome to the Events page. Here you can find information about our upcoming events and activities.
      </p>

      <div className="mt-8 md:mt-10 space-y-8 md:space-y-12">
        {/* Anubhava Youth Festival */}
        <div className="flex flex-col md:flex-row justify-center items-stretch px-1 sm:px-4 gap-2 md:gap-0">
          <div className="flex-1 bg-[rgb(210,255,128)] p-2 flex items-center justify-center text-xl sm:text-2xl md:text-2xl lg:text-3xl min-h-[80px] md:min-h-0">
            Anubhava Youth Festival 2025
          </div>
          <div className="flex-1 bg-[url('/anubhava.jpg')] h-48 sm:h-64 md:h-[70vh] bg-cover bg-center"></div>
        </div>

        {/* Lifestyle Management Seminar */}
        <div className="flex flex-col md:flex-row justify-center items-stretch px-1 sm:px-4 gap-2 md:gap-0">
          <div className="flex-1 bg-[url('/LifestyleManagement.jpeg')] h-48 sm:h-64 md:h-[70vh] bg-cover bg-[50%_70%]"></div>
          <div className="flex-1 bg-black/20 p-2 flex items-center justify-center text-xl sm:text-2xl md:text-2xl lg:text-3xl min-h-[80px] md:min-h-0">
            Seminar On Lifestyle Manangement
          </div>
        </div>

        {/* Summer Camp */}
        <div className="flex flex-col md:flex-row justify-center items-stretch px-1 sm:px-4 gap-2 md:gap-0">
          <div className="flex-1 bg-[rgb(210,255,128)] p-2 flex items-center justify-center text-xl sm:text-2xl md:text-2xl lg:text-3xl min-h-[80px] md:min-h-0">
            Summer Camp 2025
          </div>
          <div className="flex-1 bg-[url('/mayapurSummerCamp.png')] h-40 sm:h-56 md:h-[50vh] bg-cover bg-center"></div>
        </div>

        {/* Kurukshetra Alumni Yatra */}
        <div className="flex flex-col md:flex-row justify-center items-stretch px-1 sm:px-4 gap-2 md:gap-0">
          <div className="flex-1 bg-[url('/Kurukshetra.jpeg')] h-48 sm:h-64 md:h-[70vh] bg-cover bg-[50%_40%]"></div>
          <div className="flex-1 bg-black/20 p-2 flex items-center justify-center text-xl sm:text-2xl md:text-2xl lg:text-3xl min-h-[80px] md:min-h-0">
            Kurukshetra alumini yatra 2025
          </div>
        </div>
      </div>
    </div>
  );
}