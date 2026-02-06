import { useEffect, useState } from 'react';
import Ajax from "./Helpers/Ajax";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState("");
  const [bookedFlights, setBookedFlights] = useState([]);
  const [passengers, setPassengers] = useState({});

  const getFlights = async () => {
    try {
      const data = await Ajax({ route: "/api/flights" });
      setFlights(data.Flights);
    } catch (error) {
      console.error("Failed to fetch flights:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlights();
  }, []);

  const filteredFlights = flights.filter(flight => {
    if (!search.trim()) return true;
    const [fromSearch, toSearch] = search
      .toLowerCase()
      .split(/\s*->\s*|\s*-\s*/)
      .map(s => s.trim());
    const from = flight.from.toLowerCase();
    const to = flight.to.toLowerCase();
    if (fromSearch && toSearch) return from.includes(fromSearch) && to.includes(toSearch);
    return from.includes(fromSearch) || to.includes(fromSearch);
  });

  const handleBookFlight = (flight) => {
    const flightPassengers = passengers[flight.id] || 1;
    if (flightPassengers <= 0) {
      alert("Please enter a valid number of passengers.");
      return;
    }
    setBookedFlights(prev => {
      const existingIndex = prev.findIndex(f => f.id === flight.id);
      if (existingIndex !== -1) {
        const updatedFlights = [...prev];
        updatedFlights[existingIndex] = {
          ...updatedFlights[existingIndex],
          passengers: updatedFlights[existingIndex].passengers + flightPassengers,
          bookedAt: new Date().toLocaleString(),
        };
        return updatedFlights;
      }
      return [
        ...prev,
        {
          ...flight,
          passengers: flightPassengers,
          bookedAt: new Date().toLocaleString()
        }
      ];
    });
    setPassengers({ ...passengers, [flight.id]: 1 });
  };

  const handleCancelFlight = (flightId) => {
    setBookedFlights(prev => prev.filter(f => f.id !== flightId));
  };

  return (
    <div className="w-screen h-screen montserrat text-white overflow-auto">
      <div className='flex flex-col md:flex-row justify-center items-center gap-5 p-5'>
        <h1 className="text-5xl font-bold text-shadow-lg/10">Flights App</h1>
        <input
          type="text"
          placeholder='Search for flights by from -> to'
          className='px-5 py-1 w-full md:w-96 border-2 border-white rounded-full duration-300 hover:border-r-50 focus:border-r-100 text-white'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {bookedFlights.length > 0 && (
        <div className="">
          <h1 className="text-3xl font-bold p-5 bg-linear-to-r text-white from-green-900 to-transparent">Your Booked Flights</h1>
          {bookedFlights.map((f) => (
            <div key={f.id} className="mt-[.7vw] ml-[2.5vw] w-[95vw] p-4 rounded-xl bg-linear-to-r text-white from-green-700 to-transparent mb-3 duration-150 hover:border-5">
              <p className="text-xl font-medium">Flight: {f.from} {"->"} {f.to}</p>
              <p>Passengers: {f.passengers}</p>
              <p>Booked At: {f.bookedAt}</p>
              <p>Airline: {f.airline}</p>
              <p>Price per passenger: ${f.price}</p>
              <p>Total Price: ${f.price * f.passengers}</p>
              <button
                className="mt-2 rounded-full px-4 py-2 bg-red-500 hover:bg-red-600 font-bold"
                onClick={() => handleCancelFlight(f.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold bg-linear-to-r text-white from-rose-900 to-transparent p-5">Available Flights</h1>

      {isLoading && <h1 className="text-3xl p-5">Loading Flights...</h1>}

      {filteredFlights.map((flight) => (
        <div
          className="mt-[.7vw] flex flex-col gap-[1vw] items-start w-[95%] ml-[2.5%] p-5 rounded-2xl bg-linear-to-r text-white from-rose-700 to-transparent duration-150 hover:border-5"
          key={flight.id}
        >
          <h1 className="font-medium text-3xl">Flight: {`${flight.from} -> ${flight.to}`}</h1>
          <p className="text-2xl">Departure: {new Date(flight.departure).toString()}</p>
          <p className="text-2xl">Expected time of arrival: {new Date(flight.arrival).toString()}</p>
          <p className="text-2xl">Airline: {flight.airline}</p>
          <p className="text-2xl font-bold">Price: {flight.price}$</p>

          <div className="flex items-center gap-[1vw]">
            <button
              className="rounded-full p-2 px-5 bg-green-500 text-white font-bold duration-150 hover:bg-green-600 active:bg-green-700 shadow-lg/20"
              onClick={() => handleBookFlight(flight)}
            >
              Book Flight
            </button>
            <p>Passengers: </p>
            <input
              type="number"
              min="1"
              value={passengers[flight.id] || 1}
              onChange={(e) =>
                setPassengers({
                  ...passengers,
                  [flight.id]: Number(e.target.value)
                })
              }
              className="border-2 h-[1.5vw] mt-[.3vw] w-[10vw] rounded-full p-2 text-white border-white"
            />
          </div>
        </div>
      ))}

      {!isLoading && filteredFlights.length === 0 && (
        <h2 className="text-2xl p-5">No flights match your search.</h2>
      )}
    </div>
  );
}

export default App;