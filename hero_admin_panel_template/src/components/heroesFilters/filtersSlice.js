import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
};

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
        filtersFetching: (state) => {
            state.filtersLoadingStatus = "loading";
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = "idle";
            state.filters = action.payload;
        },
        filtersFetchingError: (state) => {
            state.filtersLoadingStatus = "error";
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: {
        [fetchFilters.pending]: (state) => {
            state.filtersLoadingStatus = "loading";
        },
        [fetchFilters.fulfilled]: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = "idle";
        },
        [fetchFilters.rejected]: (state) => {
            state.filtersLoadingStatus = "error";
        },
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
} = actions;
