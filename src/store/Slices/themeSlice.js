import { createSlice } from "@reduxjs/toolkit";

function getPrefColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
    
};


const initialMode = {
    darkMode: getPrefColorScheme(),
    isLoggedIn: false,
    open: false,
 
};const themeSlice = createSlice({
    name: 'themeMode',
    initialState : initialMode, 
    reducers: {
        getInitialMode(state){
            const userMode = localStorage.getItem("dark-mode");
            const isDarkMode = userMode === 'true' ? true : false;
            state.darkMode = isDarkMode;
           
        },
        toggleMode(state){

            state.darkMode= !state.darkMode;
            localStorage.setItem("dark-mode", state.darkMode);
            
        },
        loggin_user(state){
            state.isLoggedIn=!state.isLoggedIn;
        },
        openComponentsHandler(state){
            state.open = !state.open;
        },

        
    }
    });

const { reducer, actions } = themeSlice;

export const { getInitialMode, toggleMode, loggin_user,openComponentsHandler } = actions;

export default reducer;