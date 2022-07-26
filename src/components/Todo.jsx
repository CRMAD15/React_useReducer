import React from 'react';

const Todo = ({ id, text, completed, test, dispatch, DELETE }) => {
    return (
        <li style={{
            textDecoration: completed ? 'line-through' : 'none',
            textDecorationColor: completed ? 'green' : 'none',
            color: completed ? 'green' : 'white'

        }}>
            <h4 onClick={test}

            >{id} {text}</h4>
            <button onClick={() => dispatch({
                type: DELETE,
                payload: id  ////Esto es lo que va a leer el reducer
            })
            }>DELETE</button>
        </li>
    );
}

export default Todo;
