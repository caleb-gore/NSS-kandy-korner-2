import { Link, useNavigate } from "react-router-dom"
import { CustomerNavBar } from "./CustomerNabBar"
import { EmployeeNavBar } from "./EmployeeNavBar"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem('kandy_user')
    const userObject = JSON.parse(localKandyUser)

    if (userObject.staff) {
        return <EmployeeNavBar />
    } else {
        return <CustomerNavBar />
    }
}

