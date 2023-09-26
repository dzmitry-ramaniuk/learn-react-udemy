const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
};

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case "HEROES_FETCHING":
            return {
                ...state,
                heroesLoadingStatus: "loading",
            };
        case "HEROES_FETCHED":
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: "idle",
            };
        case "HEROES_FETCHING_ERROR":
            return {
                ...state,
                heroesLoadingStatus: "error",
            };
        case "HEROES_ADD":
            const newHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroList,
            };
        case "HEROES_DELETE":
            const newHeroes = state.heroes.filter(
                (hero) => hero.id !== action.payload,
            );
            return {
                ...state,
                heroes: newHeroes,
            };
        default:
            return state;
    }
};

export default heroes;
