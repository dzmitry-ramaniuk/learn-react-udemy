import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroesAdd: (state, action) => {
            heroesAdapter.addOne(state, action.payload);
        },
        heroesDelete: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: {
        [fetchHeroes.pending]: (state) => {
            state.heroesLoadingStatus = "loading";
        },
        [fetchHeroes.fulfilled]: (state, action) => {
            heroesAdapter.setAll(state, action.payload);
            state.heroesLoadingStatus = "idle";
        },
        [fetchHeroes.rejected]: (state) => {
            state.heroesLoadingStatus = "error";
        },
    },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const { selectAll } = heroesAdapter.getSelectors(
    (state) => state.heroes,
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesAdd,
    heroesDelete,
} = actions;
