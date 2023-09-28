import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { activeFilterChanged, fetchFilters } from "./filtersSlice";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus, activeFilter } = useSelector(
        (state) => state.filters,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderFilters = (arr) => {
        return arr.map((el, i) => {
            let btnClass = "btn btn-primary";
            if (el === activeFilter) btnClass += " active";
            return (
                <button
                    key={i}
                    className={btnClass}
                    onClick={() => dispatch(activeFilterChanged(el))}
                >
                    {el}
                </button>
            );
        });
    };
    const elements = renderFilters(filters);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">{elements}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
