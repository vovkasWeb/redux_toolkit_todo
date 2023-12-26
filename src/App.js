import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import InputField from './components/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { addNewTodo, fetchTodos } from './store/todoSlice'

function App() {
	const [text, setText] = useState('')
	const { status, error } = useSelector(state => state.todos)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTodos())
	}, [])

	const handelSubmit = () => {
		dispatch(addNewTodo( text ))
		setText('')
	}

	return (
		<div className='App'>
			<InputField
				text={text}
				handelInput={setText}
				handelSubmit={handelSubmit}
			/>
      {status==='loading'&& <h2>Loadind...</h2>}
      {error && <h2>An error occured: {error}</h2>}
			<TodoList />
		</div>
	)
}

export default App
