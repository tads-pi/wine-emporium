export default function TableRow({ product, onClick, view }) {
    return (
        <tr
            onClick={() => onClick(product)}
        >
            {
                Object.keys(product).map((key, index) => {
                    if (!view.includes(key)) {
                        return null
                    }

                    return (
                        <td key={index}>{product[key]}</td>
                    )
                })
            }
        </tr>
    )
}
