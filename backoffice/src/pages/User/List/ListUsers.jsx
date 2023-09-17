import TableWE from "../../../components/table/TableWE.jsx"
import "./style.css"

export default function ListUsers() {
    const { users } = [
        {
            "id": 1,
            "name": "admin",
            "email": "",
        }
    ]

    return (
        <div className="container">
            <TableWE
                data={users}
                columns={[
                    "id",
                    "name",
                    "email",
                ]}
            />
        </div >
    )
}