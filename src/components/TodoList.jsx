import React, { createContext, useReducer, useRef, useState } from 'react';
import TodoContext from '../context/TodoContext';
import Todo from './Todo';



const myContext = createContext(null)

//ACtions
let idNumber = 0

const ADD_TODO = 'ADD_TODO';
const FILTER_TODO = 'FILTER_TODO';
const DELETE = 'DELETE';
const TOGGLE_TODO = 'TOGGLE_TODO';

const initialState = [];
//Reducer


const todoReducer = (state, action) => {
    switch (action.type) {
        case DELETE:
            return state.filter(todo => todo.id !== action.payload)
        case ADD_TODO:
            return [
                ...state,
                {
                    id: action.payload.id,
                    text: action.payload.text,
                    completed: false
                }
            ];
        case TOGGLE_TODO:
            return state.map((todo) =>
                (todo.id === action.payload.id) ?
                    {
                        ...todo,
                        completed: !todo.completed
                    }
                    : todo
            )

        case FILTER_TODO:
            switch (action.payload.filter) {
                case 'SHOW_ALL':
                    return state;
                case 'INCOMPLETED':
                    return state.filter(todo => !todo.completed);
                case 'COMPLETED':
                    return state.filter(todo => todo.completed);
                default:
                    return state;

            }
        default:
            return state;
    }
}


const TodoList = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState)


    const todosFilter = (filter) => {
        console.log(filter)
        dispatch({
            type: FILTER_TODO,
            payload: {
                filter
            }
        })
    }

    const handleSubmit = (text) => {
        dispatch({
            type: ADD_TODO,
            payload: {
                id: idNumber++,
                text
            }
        })
    }

    const onClick = (id) => {
        dispatch({
            type: TOGGLE_TODO,
            payload: {
                id
            }
        })
    }

    console.log(todos)
    const newText = useRef()
    return (
        <TodoContext.Provider value={todos}>
            <div>
                <h1>All task</h1>


                {
                    todos.map((todo, index) => {
                        return (
                            <ul key={index}>
                                <Todo
                                    dispatch={dispatch}
                                    DELETE={DELETE}
                                    text={todo.text}
                                    test={() => onClick(todo.id)}
                                    {...todo}
                                />
                            </ul>

                        )
                    })
                }
                <h6>Create a new task </h6>
                <div>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit(newText.current.value)
                    }}>
                        <input
                            type="text" ref={newText}

                        />
                        < button type='submit'>
                            Create task
                        </button>

                    </form>

                    <button onClick={(e) => {
                        e.preventDefault()
                        todosFilter('SHOW_ALL')
                    }}>ALL</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        todosFilter('COMPLETED')
                    }}>COMPLETED</button>

                    <button onClick={(e) => {
                        e.preventDefault()
                        todosFilter('INCOMPLETED')
                    }}>INCOMPLETED</button>


                </div>
            </div >
        </TodoContext.Provider>
    );
}

export { myContext, TodoList };
