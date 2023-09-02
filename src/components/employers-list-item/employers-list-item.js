import "./employers-list-item.css";

const EmployersLisrItem = () => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="list-group-item-label">John Smith</span>
            <input
                type="text"
                className="list-group-item-input"
                defaultValue="1000$"
            />
            <div className="d-flex justify-content-center align-items-center">
                <button type="button" className="btn-cookie btn-sm">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button" className="btn-trash btn-sm">
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fa fa-star"></i>
            </div>
        </li>
    );
};

export default EmployersLisrItem;
