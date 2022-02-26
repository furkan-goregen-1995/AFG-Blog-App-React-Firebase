import { createContext } from "react";
import { useReducer } from "react";

export const ThemeContext = createContext() 
const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
        return { ...state, bgColor: action.payload }
        case 'CHANGE_MODE':
        return {...state, mode: action.payload}
    }
}   
export function ThemeContextProvider({children}) {
   
    const [state, dispatch] = useReducer(themeReducer, {
        bgColor: '#778beb',
        mode:'dark'
    })
    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    }
    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color })
    }

    return (
        <ThemeContext.Provider value={{...state,changeColor,changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
