import "./app-info.css";

const AppInfo = (props) => {
    const { numForIncrease, numOfWorkers } = props;

    return (
        <div className="app-info">
            <h1>Employers check in company</h1>
            <h2>Number of employees: {numOfWorkers}</h2>
            <h2>Number of increased salaries: {numForIncrease}</h2>
        </div>
    );
};

export default AppInfo;
