import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter({
    selectId: (filter) => filter
});

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: "idle",
    activeFilter: "all",
});

export const fetchFilters = createAsyncThunk(
    "filters/fetchFilters",
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filters");
    },
);

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: {
        [fetchFilters.pending]: (state) => {
            state.filtersLoadingStatus = "loading";
        },
        [fetchFilters.fulfilled]: (state, action) => {
            console.log(action.payload);
            filtersAdapter.setAll(state, action.payload);
            state.filtersLoadingStatus = "idle";
        },
        [fetchFilters.rejected]: (state) => {
            state.filtersLoadingStatus = "error";
        },
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors(
    (state) => state.filters,
);

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
} = actions;
