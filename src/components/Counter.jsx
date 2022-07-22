import React, { useReducer, useContext } from 'react';

//Actions

const INCREMENT = "INCREMENT"
const DECREMENT = "DECREMENT"
const RESET = "RESET"

const myContext = React.createContext(null)

const Points = () => {

    const state = useContext(myContext)

    return (
        <p>Points : {state.count}</p>
    )
}

const Counter = () => {

    //Creamos un estado inicial ==> como con Redux que teniamos un estado inicial.

    const initialState = {
        count: 0
    }

    // Creamos el reducer al que está asociado y la forma en la que se debe comportar.
    const reducer = (state, action) => {

        switch (action.type) {
            case INCREMENT:
                return {
                    count: state.count + action.payload.quantity
                };
            case DECREMENT:
                return {
                    count: state.count - action.payload.quantity
                };
            case RESET:
                return {
                    count: 0
                };

            default:
                return state;
        }
    }

    // Asignar el useReducer al estado, al reducer y a la acction dispatch

    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <myContext.Provider value={state}>
            <div>
                {/* <p>Points : {state.count}</p> */}
                <Points />
                <button onClick={
                    () => dispatch({
                        type: INCREMENT,
                        payload: {
                            quantity: 20
                        }
                    })
                }>
                    Increment
                </button>
                <button onClick={
                    () => dispatch({
                        type: DECREMENT,
                        payload: {
                            quantity: 5
                        }
                    })
                }>
                    Decrement
                </button>
                <button onClick={
                    () => dispatch({
                        type: RESET
                    })
                }>
                    Reset
                </button>
            </div>

        </myContext.Provider>

    );
}

export default Counter;

