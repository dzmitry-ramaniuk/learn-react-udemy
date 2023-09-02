import EmployersLisrItem from "../employers-list-item/employers-list-item";

import "./employers-list.css";

const EmployersList = () => {
    return (
        <ul className="app-list list-group">
            <EmployersLisrItem />
            <EmployersLisrItem />
            <EmployersLisrItem />ы
        </ul>
    );
};

export default EmployersList;
