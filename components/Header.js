import Image from "next/image";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

const  Header = ({placeholder}) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [noOfGuests, setNoOfGuests] = useState(1)

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }

  const handelSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const resetInput = () => {
    setSearchInput("")
  }

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate:startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests
      }
    }).then(
      setSearchInput("")
    )
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10 ">
      {/* left */}
      <div onClick={() =>router.push('/') } className="relative flex items-center h-8 md:h-10 cursor-pointer my-auto">
        <Image
        onClick={() =>router.push('/') }
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* middle */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          type="text"
          className="flex-grow pl-5 bg-transparent outline-none
                placeholder-gray-400 "
          placeholder={placeholder || "Find Help"}
          value={searchInput}
          onChange={ e => setSearchInput(e.target.value)}

        />
        <SearchIcon
          className="hidden md:inline-flex h-8 bg-red-400 
                    text-white rounded-full p-2 cursor-pointer md:mx-1.5"
        />
      </div>

      {/* right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
          <p className="hidden md:inline">Become a host</p>
          <GlobeAltIcon className="h-6 "/>
          <div className="flex items-center space-x-2 p-2 cursor-pointer border-2 rounded-full">
              <MenuIcon className="h-6" />
              <UserCircleIcon className = "h-6" />
          </div>
      </div>

    {searchInput && (
      <div className="flex flex-col col-span-3 mx-auto mt-3">
        <DateRangePicker 
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors= {["#FD5B61"]}
          onChange={handelSelect}
        />

        <div className="flex items-center border-b mb-4">
          <h2 className="text-2xl flex-grow font-semibold">
            Number of Guests
          </h2>

          <UserIcon className="h-5" />
          <input className = "w-12 pl-2 text-lg outline-none text-red-400"
            value={noOfGuests}
            min={1}
            onChange={e => setNoOfGuests(e.target.value)}
          type="number" />
        </div>
        <div className="flex">
          <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
          <button onClick={search} className="flex-grow text-[#FE595E]">Search</button>
        </div>
      </div>
    )}
    </header>
  );
}

export default Header;
