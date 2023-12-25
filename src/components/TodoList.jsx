import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const TodoList = () => {
    const { todos } = useSelector(state => state.todos)
	return (
		<ul>
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					{...todo}
					// removeTodo={removeTodo}
					// toggleTodoComplete={toggleTodoComplete}
				/>
			))}
		</ul>
	)
}

export default TodoList
