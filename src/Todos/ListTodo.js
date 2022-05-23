import '../index.css'
import { toast } from "react-toastify";
import React, { useState } from "react";
import { computeHeadingLevel } from "@testing-library/react";
const ListTodo = () => {

    const [todos, setTodos] = useState(() => {
        const StoreTodos = localStorage.getItem('todos');
        const data = JSON.parse(StoreTodos);
        return data ?? [];
    });

    const [title, setTitle] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [checked, setChecked] = useState([]);

    const handleSubmit = () => {
        const todo = {
            id: Math.floor(Math.random() * 1000),
            title
        }
        if (title !== "") {
            setTodos(prevState => {
                const newTodos = [...prevState, todo];
                localStorage.setItem('todos', JSON.stringify(newTodos));
                return [...prevState, todo];
            })
            toast.success("Success");
        }
        else {
            toast.error(`missing title`)
            return false;
        }
        setTitle("");
    }

    const deleteHandle = (id) => {
        const currectTodo = todos.filter(todo => todo.id !== id)
        localStorage.setItem('todos', JSON.stringify(currectTodo))
        setTodos(currectTodo)
        toast.success("Delete Success")
    }

    const handelUpdate = (id) => {
        setIsUpdate(true)
        const currectTodo = todos.find(todo => todo.id === id)
        setTitle(currectTodo.title);
        setIsUpdate(id);
    }

    const updateDone = () => {
        const todosNew = todos.map(todo => {
            if (todo.id === isUpdate) {
                if (title !== "") {
                    todo.title = title;
                    toast.success("Update done")
                }
                else
                    toast.error("enter title");
            }
            return todo;
        })
        localStorage.setItem('todos', JSON.stringify(todosNew));
        setIsUpdate(false);
        setTitle("");
    }

    const handeCheck = (id) => {
        setChecked(prev => {
            const isChecked = checked.includes(id);
            if (isChecked)
                return checked.filter(item => item !== id);
            else
                return [...prev, id];
        })
    }
    const handleSubmitCheck = () => {
        for(let i =0;i<checked.length;i++) {
            for(let j=0;j<todos.length;j++) {
                if(todos[j].id ===checked[i])
                    todos.splice(todos.id=== j,1);
            }
        }

//cach 2
        // for (var i = 0; i < checked.length; i++) {
        //     todos.map((todo) => {
        //       if (todo.id === checked[i]) {
        //         todos.splice(todo.id === i, 1);
        //       }
        //       return todo;
        //     });
        //   }
        setTodos(todos);
        setChecked([]);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

return (
    <div className="container">
        <div className='header'>
            <h1>TODO APP</h1>
            <div className='inputValue'>
                <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Enter todo......" className="inp" />&ensp;
                {
                    !isUpdate ? <button onClick={handleSubmit}>Add todo</button> : <button onClick={updateDone}>Update</button>
                }
            </div>
        </div>
        <div className="listTodo" id="ulistTodo">
            <ul>
                {
                    todos.map((todo, index) => {
                        return (
                            <li key={todo.id}>
                                <div>
                                    <h3>{index + 1}. {todo.title}</h3>
                                </div>
                                <div className='btn'>
                                    <button onClick={() => handelUpdate(todo.id)}>Edit</button>&ensp;
                                    <button onClick={deleteHandle.bind(this, todo.id)}>Delete</button>
                                    <input
                                        type="checkbox"
                                        checked={checked.includes(todo.id)}
                                        onChange={() => handeCheck(todo.id)}
                                    />
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={handleSubmitCheck}>Delete todo selected</button>
        </div>
    </div>
)
}

export default ListTodo;

//Todo List