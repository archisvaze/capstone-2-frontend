import { createSlice } from "@reduxjs/toolkit";
let startState = {
    accessToken: "",
    isLoggedIn: false,
    user: {},
    consultation: {},
    alert: ["", false, "error"],
};

if (localStorage.getItem("docseek-data")) {
    startState = JSON.parse(localStorage.getItem("docseek-data"))
    startState.isLoggedIn = true;
}

const mySlice = createSlice({
    name: "mySlice",
    initialState: startState,
    reducers: {
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
            localStorage.setItem("docseek-data", JSON.stringify(state))
        },
        setConsultation: (state, action) => {
            state.consultation = {};
            state.consultation.doctor = action.payload.doctor;
            state.consultation.patient = action.payload.patient;
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.user = {};
            state.isLoggedIn = false;
            state.consultation = {}
        },
        setOnboard: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { setLogin, setConsultation, setLogout, setOnboard, setAlert } = mySlice.actions;
export default mySlice.reducer;
