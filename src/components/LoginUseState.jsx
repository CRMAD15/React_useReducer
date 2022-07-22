import React, { useState } from 'react';

const LoginUseState = () => {
    const [username, setUsername] = useState('');
    const [usePassword, setUsePassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isLoggeIn, setIsLoggedIn] = useState(false)

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
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
            setIsLoggedIn(true);
            setIsLoading(false);
        } catch (error) {
            setError(`Invalid Username or Password:${error}`);
            setIsLoading(false);
            setUsername('');
            setUsePassword('');

        }
    }
    const logout = () => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUsername('');
        setUsePassword('');

    }
    return (
        <div className='App'>
            <div>
                {
                    isLoggeIn ?
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
                                onChange={(e) => setUsername(e.currentTarget.value)}
                            />
                            <input
                                type='password'
                                placeholder='password'
                                value={usePassword}
                                onChange={(e) => setUsePassword(e.currentTarget.value)}
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

export default LoginUseState;
