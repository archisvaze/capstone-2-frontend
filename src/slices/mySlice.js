import { createSlice } from "@reduxjs/toolkit";
let startState = {
    isLoggedIn: false,
    user: {},
};

if (localStorage.getItem("user-data")) {
    startState.user = JSON.parse(localStorage.getItem("user-data"))
    startState.isLoggedIn = true;
}

const mySlice = createSlice({
    name: "mySlice",
    initialState: startState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.user.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
            localStorage.setItem("user-data", JSON.stringify(state.user))
        }
    }
})

export const { setLogin } = mySlice.actions;
export default mySlice.reducer;
