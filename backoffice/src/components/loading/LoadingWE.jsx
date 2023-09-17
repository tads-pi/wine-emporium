import loading from "../../assets/oval.svg";
import "./style.css"

export default function LoadingWE() {
    return (
        <div className="loading__container">
            <img className="loading__svg" src={loading} alt="loading" />
        </div>
    )
}
