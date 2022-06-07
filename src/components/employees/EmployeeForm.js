import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () => {
    const navigate = useNavigate()
    const [locations, setLocations] = useState([])
    const [users, setUsers] = useState([])
    const [user, updateUser] = useState({
        name: "",
        email: "",
    })
    const [employee, updateEmployee] = useState({
        // userId: "",
        startDate: "",
        payRate: "",
        locationId: ""
    })



    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then((response) => response.json())
            .then((locationsArray) => {
                setLocations(locationsArray)
            })
            
            
        }, 
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
            .then((response) => response.json())
            .then((usersArray) => {
                setUsers(usersArray)
            })

        },
        []
    )

    const postUserToAPI = () => {

        const userToSendToAPI = {
            name: user.name,
            email: user.email,
            isStaff: true
        }

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        }).then((response) => response.json())

    }

    const postEmployeeToAPI = () => {
        const employeeToSendToAPI= {
            startDate: employee.startDate,
            payRate: employee.payRate,
            locationId: employee.locationId,
            userId: users[users.length - 1].id + 1
        }

        return fetch(`http://localhost:8088/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeToSendToAPI)
        }).then((response) => response.json())
        .then(navigate("/employees"))
    }

    return (
        <>
        <h2>Add Employee</h2>
        <form>
            <fieldset>
                <label>Name </label>
                <input type="text"
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.name = evt.target.value
                        updateUser(copy)
                    }
                } />
            </fieldset>
            <fieldset>
                <label>Email </label>
                <input type="email" 
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.email = evt.target.value
                        updateUser(copy)
                    }
                }/>
            </fieldset>
            <fieldset>
                <label>Location </label>
                <select onChange={
                    (evt) => {
                        const copy = {...employee}
                        copy.locationId = parseInt(evt.target.value)
                        updateEmployee(copy)
                    }
                }>
                    <option value="0">Choose</option>
                    {
                        locations.map(
                            (location) => {
                                return <option key={`location--${location.id}`} value={location.id} >{location.address}</option>
                            }
                        )
                    }
                </select>
            </fieldset>
            <fieldset>
                <label>Start Date </label>
                <input type="date" 
                onChange={
                    (evt) => {
                        const copy = {...employee}
                        copy.startDate = evt.target.value
                        updateEmployee(copy)
                    }
                }/>
            </fieldset>
            <fieldset>
                <label>Pay Rate (per hour) </label>
                <input type="text" 
                onChange={
                    (evt) => {
                        const copy = {...employee}
                        copy.payRate = parseFloat(evt.target.value)
                        updateEmployee(copy)
                    }
                }/>
            </fieldset>
            <button onClick={
                (evt) => {
                    evt.preventDefault()
                    postUserToAPI()
                    postEmployeeToAPI()
                }
            }>Add New Employee</button>
        </form>
        </>
    )
}