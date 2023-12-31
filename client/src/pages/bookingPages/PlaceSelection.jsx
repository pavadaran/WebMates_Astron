import { useContext, useEffect,useState } from "react";
import { db } from "../../firebase-config";
import { BookingContext } from "../../context/BookingContext.jsx";
// import { database } from '../../path/to/firebase-config';
import { onValue, ref } from "firebase/database";

import "../../styles/PlanetSelection.css";

const PlanetSelection = (props) => {
    const { currentPage, setCurrentPage } = props;
    const [ planets, setPlanets] = useState([]);
    const { getBookingContext, setBookingContext } = useContext(BookingContext);


    const user =
    {
        userOxgenLevel: 87,
        userSystolicPressure: 120,
        userDiastolicPressure: 80
    }

 
    useEffect(() =>  {

                const query = ref(db, "planets");
                return onValue(query, (snapshot) => {
                    const data = snapshot.val();
                    if (snapshot.exists()) {
                        Object.values(data).map((planet) => {
                            console.log("planet",planet)
                        //   setPlanets((planets) => [...planets, planet]);
                        // planets.push(planet)
                        const planetsArray = Object.values(data);
                setPlanets(planetsArray);
                          console.log("planets :",planets)
                        });
                      }
                });
    },[]);

    const filteredPlanets = planets.filter((planet) => {
        console.log("test1" + user.userOxgenLevel);
        console.log("test1" + planet.minimumOxgenLevel);
        return (
            user.userOxgenLevel >= planet.minimumOxgenLevel &&
            user.userSystolicPressure <= planet.systolicPressure &&
            user.userDiastolicPressure <= planet.diastolicPressure
        );
    }
    );

    const handleClick = (index) => {
        // setBookingContext({ planet: list[index] });
        setBookingContext({ planet: planets[index] });
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="back-ground">
            <h1 className="heading">Planet</h1>
            <div className="planetContainer">
                {console.log("hello",filteredPlanets)}
                {planets.map((planet, index) => (
                    <div className="planet-card" key={index}>
                        <div className="planet-left">
                            <img className="card-img" src={planet.image} alt={planet.name} />
                        </div>
                        <div className="planet-center">
                            <p className="planet-name">{planet.name}</p>
                            <p className="distance">{planet.distance}</p>
                        </div>
                        <div className="planet-right">
                            <svg onClick={() => {
                                handleClick(index);
                            }} xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.66528 1.51833H25.0367C29.8121 1.51833 33.6832 5.38948 33.6832 10.1648V25.5363C33.6832 30.3116 29.8121 34.1827 25.0367 34.1827H9.66528C4.88997 34.1827 1.01882 30.3116 1.01882 25.5363V10.1648C1.01882 5.38948 4.88997 1.51833 9.66528 1.51833ZM0.0581055 10.1648C0.0581055 4.85889 4.35938 0.557617 9.66528 0.557617H25.0367C30.3426 0.557617 34.6439 4.85889 34.6439 10.1648V25.5363C34.6439 30.8422 30.3426 35.1434 25.0367 35.1434H9.66528C4.35938 35.1434 0.0581055 30.8422 0.0581055 25.5363V10.1648ZM13.8478 8.86441C13.6602 8.67681 13.3561 8.67681 13.1685 8.86441C12.9809 9.052 12.9809 9.35614 13.1685 9.54374L21.4753 17.8505L13.1685 26.1573C12.9809 26.3449 12.9809 26.6491 13.1685 26.8366C13.3561 27.0242 13.6602 27.0242 13.8478 26.8366L22.4943 18.1902C22.6819 18.0026 22.6819 17.6985 22.4943 17.5109L13.8478 8.86441Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
            {/* <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button> */}
        </div>
    )
}

export default PlanetSelection;