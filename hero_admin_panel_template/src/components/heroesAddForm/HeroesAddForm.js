import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
    heroesAdd,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
} from "../../actions";
import { useHttp } from "../../hooks/http.hook";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState("");
    const [heroDescription, setHeroDescription] = useState("");
    const [heroElement, setHeroElement] = useState("");

    const filters = useSelector((state) => state.filters);

    const dispatch = useDispatch();
    const { request } = useHttp();

    const addHero = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElement,
        };

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(() => dispatch(heroesAdd(newHero)))
            .catch((err) => console.log(err));

        setHeroName("");
        setHeroDescription("");
        setHeroElement("");
    };

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            dispatch(filtersFetching());
            request("http://localhost:3001/filters")
                .then((data) => dispatch(filtersFetched(data)))
                .catch(() => dispatch(filtersFetchingError()));
        }

        return arr.map((el, i) => {
            if (el === "all") {
                return (
                    <option key={i} defaultValue={"none"}>
                        Choose hero element
                    </option>
                );
            }
            return (
                <option key={i} value={el}>
                    {el}
                </option>
            );
        });
    };

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Имя нового героя
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Описание
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ height: "130px" }}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать элемент героя
                </label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    {renderFilters(filters)}
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => addHero(e)}
            >
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
