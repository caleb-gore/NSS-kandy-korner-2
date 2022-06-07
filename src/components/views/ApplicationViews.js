import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	const localKandyUser = localStorage.getItem('kandy_user')
	const userObject = JSON.parse(localKandyUser)
	
	if (userObject.staff) {
		return <EmployeeViews />
	} else {
		return <CustomerViews />
	}
}

