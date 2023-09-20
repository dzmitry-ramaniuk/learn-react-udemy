import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComics, getCharacter, clearError, processName, setProcessName } = useMarvelService();

    useEffect(() => {
        updateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case "characters":
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcessName("confirmed"));
                break;
            case "comics":
                getComics(id)
                    .then(onDataLoaded)
                    .then(() => setProcessName("confirmed"));
                break;
            default:
                break;
        }
    };

    const onDataLoaded = (data) => {
        setData(data);
    };

    return (
        <>
            <AppBanner />
            {setContent(processName, Component, data)}
        </>
    );
};

export default SinglePage;
