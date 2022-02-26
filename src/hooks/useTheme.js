import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if(context===undefined){
        console.log("verilere erişilemedi")
    }

    return context
    
}
