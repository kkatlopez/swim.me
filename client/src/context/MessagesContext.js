import React, { createContext, useState } from 'react'
export const MessagesContext = createContext()
const MessagesContextProvider = (props) => {
    const [variableOne, setVariableOne] = useState('somethingRandom`)
    const Url = "http://localhost:3000"
    return (
         <MessagesContext.Provider
            value={{
                variableOne,
                Url
             }}>
               {props.children}
         </SampleContext.Provider>
    )
}
export default MessagesContextProvider
