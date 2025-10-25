function SettingsAdmin() {
  return (
    <div className="bg h-[100vh]">
      <div className="lg:pl-30 pl-20 pt-10 pr-10">
        {/* heading */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Settings</h1>

            <p className="text-md pt-1">Configure your bakery admin panel</p>
          </div>
        </div>
        {/* main section */}
        <div className="flex flex-col md:flex-row  gap-5 md:gap-0 justify-between mt-10">
          <div className="bg-white p-5 rounded-2xl shadow-2xl w-1/2 h-fit">
            <div className="">
              <h2 className="font-bold text-xl">Store Information</h2>
              <p className="pt-2">Basic Store Info</p>
            </div>

            <div className="mt-7 flex flex-col space-y-5">
              <div className="">
                <h2 className="font-bold text-black/90 text-lg">Store Name</h2>
                <p className="pl-4 pt-1">THE BAKED FANTASY</p>
              </div>
              <div className="">
                <h2 className="font-bold text-black/90 text-lg">Address</h2>
                <p className="pl-4 pt-1">
                  123 Baker Street, Sweet City, SC 12345
                </p>
              </div>
              <div className="">
                <h2 className="font-bold text-black/90 text-lg">
                  Phone Number
                </h2>
                <p className="pl-4 pt-1">+91 9047811165</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsAdmin;
