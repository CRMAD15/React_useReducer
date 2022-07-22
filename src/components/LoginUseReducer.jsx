import React, { useReducer } from 'react';

//Actions
const FIELD = 'FIELD';
const LOGIN = 'LOGIN';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const LOGOUT = 'LOGOUT'

//Initial state

const inicialState = {
    username: '',
    password: '',
    error: '',
    isLoading: false,
    isLoggedIn: false
}

//Reducer

const loginReducer = (state, action) => {
    switch (action.type) {
        case FIELD:
            return {
                ...state,
                [action.fieldName]: action.payload
            };
        case LOGIN:
            return {
                ...state,
                error: '',
                isLoading: true,
                isLoggedIn: false
            };
        case SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                isLoggedIn: true
            };
        case ERROR:
            return {
                ...state,
                error: 'Invalid Username or Password',
                isLoading: false,
                isLoggedIn: false,
                username: '',
                password: ''
            };
        case LOGOUT:
            return {
                ...state,
                error: '',
                isLoggedIn: false,
            };
        default:
            break;
    }
}

const LoginUseReducer = () => {

    const [state, dispatch] = useReducer(loginReducer, inicialState)

    //Obtain values from state

    const { username, password, error, isLoading, isLoggedIn } = state;

    const submit = async (e) => {
        e.preventDefault();
        //dispatch action
        dispatch({ type: LOGIN });
        try {
            await function login(username, password) {
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (username === 'admin' && password === 'admin') {
                            resolve()
                        } else {
                            reject()
                        }
                    }, 2000);

                })
            }
            dispatch({ type: SUCCESS })
        } catch (error) {
            dispatch({ type: ERROR })

        }
    }

    const logout = () => {
        dispatch({ type: LOGOUT })
    }
    return (
        <div className='App'>
            <div>
                {
                    isLoggedIn ?
                        (
                            <div>

                                <h1>Welcome, {username}</h1>

                                <button onClick={logout}>Logout</button>
                            </div>

                        ) :
                        <form onSubmit={submit}>
                            {
                                error && <p style={{ color: 'tomato' }}>{error}</p>
                            }
                            <input
                                type='text'
                                placeholder='username'
                                value={username}
                                onChange={(e) =>
                                    dispatch(
                                        {
                                            type: FIELD,
                                            fieldName: 'username',
                                            payload: e.currentTarget.value
                                        })}
                            />
                            <input
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) =>
                                    dispatch(
                                        {
                                            type: FIELD,
                                            fieldName: 'password',
                                            payload: e.currentTarget.value
                                        }
                                    )
                                }
                            />
                            <button>
                                {isLoading ? 'Loggin...' : 'login'}
                            </button>
                        </form>
                }
            </div>
        </div>
    );
}

export default LoginUseReducer;
