import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/todos?_limit=10'
			)
			if (!response.ok) {
				throw new Error('Server Error!')
			}
			const data = await response.json()

			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(){
        
    }
)

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push({
				id: state.todos.length + 1,
				title: action.payload.text,
				completed: false,
			})
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
		},
		toggleTodoComplete(state, action) {
			const toggleTodo = state.todos.find(todo => todo.id === action.payload.id)
			toggleTodo.completed = !toggleTodo.completed
		},
	},
	extraReducers: builder => {
		// eslint-disable-next-line no-unused-expressions
		builder.addCase(fetchTodos.pending, (state, action) => {
			state.status = 'loading'
			state.error = null
		}),
			builder.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.todos = action.payload
			})
		builder.addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
	},
})

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions
export default todoSlice.reducer
