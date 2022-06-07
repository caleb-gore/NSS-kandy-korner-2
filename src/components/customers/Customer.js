import { Link } from "react-router-dom"

export const Customer = ({id, name, email}) => {
    return (
        <section>
            <div>
                <Link to={`/customers/${id}`}>{name}</Link>
            </div>
            <div>{email}</div>
        </section>
    )
}