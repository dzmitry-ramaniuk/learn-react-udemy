import { useState, useEffect, useRef, useMemo } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charList.scss";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
        case "loading":
            return newItemLoading ? <Component /> : null;
        case "confirmed":
            return <Component />;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
};

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, processName, setProcessName } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (offset, initial) => {
        setNewItemLoading(!initial);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcessName("confirmed"));
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        let mergedCharList = [...charList, ...newCharList];
        let mergedCharListMap = mergedCharList.map((item) => {
            return [item.id, item];
        });

        let filteredCharList = [...new Map([...mergedCharListMap]).values()];

        setCharList(filteredCharList);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded((charEnded) => ended);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    };

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: "cover" };
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { objectFit: "unset" };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    tabIndex={i}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                    ref={(el) => (itemRefs.current[i] = el)}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return <ul className="char__grid">{items}</ul>;
    };

    const elements = useMemo(() => {
        return setContent(processName, () => renderItems(charList), newItemLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charList]);

    return (
        <div className="char__list">
            {elements}

            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? "none" : "block" }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharList;
