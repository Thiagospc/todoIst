import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";

export const useTodos = defineStore('todos', () => {
    // state
    const todos = ref([]);
    
    // actions
    const fetchTodos = async () => {
        try{
            const response = await axios.get('http://localhost:3000/todos');
            todos.value = response.data;
        } catch (error){
            console.log(error);
        }
    }

    const addTodo = async (title) => {
        try {
            const maxId = todos.value.reduce((max, todo) => Math.max(max, Number(todo.id)), 0);
            const newTodo = {
                id: (maxId + 1).toString(),
                title,
                completed: false
            };
            const response = await axios.post('http://localhost:3000/todos', newTodo);
            todos.value.push(response.data);
        } catch (error) {
            console.log("Erro ao adicionar todo", error);
        }
    };

    const removeTodo = async (id) => {
        try{
            await axios.delete(`http://localhost:3000/todos/${id}`);
            todos.value = todos.value.filter(todo => todo.id !== id);
        } catch(error){
            console.log(error)
        }
    }

    const updateTodo = async (id, title) => {
        try{
            const todo = todos.value.find(todo => todo.id === id);
            const updatedTodo = {
                id: todo.id,
                title: title,
                completed: todo.completed
            };

            await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
            const index = todos.value.findIndex(todo => todo.id === id);
            if (index !== -1){
                todos.value[index].title = title;
            }
        }catch(error){
            console.log(error);
        }
    }

    const checkTodo = async(id, completed) => {
        try{
            const todo = todos.value.find(todo => todo.id === id);
            const checkTodo = {
                id: id,
                title: todo.title,
                completed: completed
            };
            await axios.put(`http://localhost:3000/todos/${id}`, checkTodo);
            const index = todos.value.findIndex(todo => todo.id === id);
            if (index !== -1){
                todos.value[index].completed = completed;
            }
        }catch(error){
            console.log(error);
        }
    }

    const checkEmpty = computed(() => todos.value.length === 0);

    // getters
    return {
        todos, 
        fetchTodos, 
        addTodo, 
        removeTodo,
        updateTodo,
        checkTodo,
        checkEmpty
    };
})