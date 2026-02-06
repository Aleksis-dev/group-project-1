import { useEffect, useState, useRef } from 'react';
import Ajax from "./Helpers/Ajax";

function App() {

    const ran = useRef(false);
    const [isLoading, setLoading] = useState(true);
    const [flights, setFlights] = useState([]);

    const getFlights = async () => {
        try {
            const flights = await Ajax({
                route: "/api/flights",
            });
            setLoading(false)
            setFlights(flights.Flights)
            console.log(flights.Flights)
        } catch (error) {
            console.error("Failed to fetch users:", error.message);
        }
    };

    useEffect(() => {
        getFlights()
    }, []);


    return (<>
    <div className="w-screen h-screen montserrat text-white">
        <h1 className="text-5xl font-bold text-shadow-lg/10 p-5">Flights App</h1>
        <h1 className="text-3xl font-bold bg-linear-to-r text-white from-green-800 to-transparent p-5">Booked Flights</h1>
        <br />
        <h1 className="text-3xl font-bold bg-linear-to-r text-white from-zinc-600 to-transparent p-5">Flights</h1>
        {isLoading && <h1 className="text-3xl">Loading Flights...</h1>}
        {flights.map((flight) => {
            return <div className="mt-[1.5vw] flex flex-col gap-[1vw] items-start w-[95%] ml-[2.5%] p-5 rounded-2xl bg-linear-to-r text-white from-red-900 to-transparent duration-300" key={flight.id}>
                <h1 className="font-medium text-3xl">Flight: {`${flight.from} -> ${flight.to}`}</h1>
                <p className="text-2xl">Departure: {new Date(flight.departure).toString()}</p>
                <p className="text-2xl">Expected time of arrival: {new Date(flight.arrival).toString()}</p>
                <p className="text-2xl ">Airline: {flight.airline}</p>
                <p className="text-2xl font-bold">Price: {flight.price}$</p>
                <div className="flex items-center gap-[1vw]">
                    <button className="rounded-full p-2 px-5 bg-green-500 text-white font-bold duration-150 hover:bg-green-600 active:bg-green-700 shadow-lg/20">Book Flight</button>
                    <p>How many passangers: </p>
                    <input type="number" min="0" className="border-2 h-[1.5vw] mt-[.3vw] w-[10vw] rounded-full p-2" />
                </div>
            </div>
        })}
    </div>
    </>)
}

export default App;