import { createSlice } from "@reduxjs/toolkit";
let startState = {
    isLoggedIn: false,
    user: {},
    consultation: {}
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
        },
        setConsultation: (state, action) => {
            state.consultation = {};
            state.consultation.doctor = action.payload.doctor;
            state.consultation.patient = action.payload.patient;
        }
    }
})

export const { setLogin, setConsultation } = mySlice.actions;
export default mySlice.reducer;
