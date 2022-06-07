import { Link } from "react-router-dom"

export const Employee = ({name, email, id}) => {
    return (
        <>
        <section>
            <div>
                <Link to={`/employees/${id}`}>{name}</Link>
            </div>
            <div>{email}</div>
        </section>
        </>
    )
}