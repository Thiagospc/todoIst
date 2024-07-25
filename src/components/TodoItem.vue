<script setup>
import { defineProps } from 'vue';
import { useTodos } from '../stores/Todos';
import { ref } from 'vue';

const todosStore = useTodos();
const props = defineProps({
    todo: Object
});

const emits = defineEmits(['remove']);
const removeTodo = async () => {
    await todosStore.removeTodo(props.todo.id);
    emits('remove', props.todo.id);
};

const title = ref(props.todo.title);
const updateTodo = async () => {
    const novoTitulo = title.value;
    await todosStore.updateTodo(props.todo.id, novoTitulo);
};

const completed = ref(props.todo.completed);
const checkTodo = async () => {
    completed.value = !props.todo.completed;
    await todosStore.checkTodo(props.todo.id, !props.todo.completed);
};
</script>

<template>
    <div class="bg-gray-300 rounded-sm mb-2">
        <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">

            <!-- Butão de concluído -->
            <div class="flex items-center justify-center mr-2">
                <button
                :class="{
                    'text-green-600': completed,
                    'text-gray-400': !completed
                }"
                @click="checkTodo"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Tarefa -->
            <div class="w-full">
                <input
                    v-model="title" 
                    type="text"
                    placeholder="Digite a sua tarefa" 
                    :class="{
                        'bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3': true,
                        'line-through': completed
                    }"
                    >
            </div>
            
            <!-- update -->
            <div class="ml-auto flex items-center justify-center">
                <button @click="updateTodo" class="focus:outline-none">
                    <svg 
                        class="ml-3 h-4 w-4 text-gray-500" 
                        viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M4 12a8 8 0 1 1 8 8v-2a6 6 0 1 0-6-6h-2a8 8 0 0 1 0-8v2a6 6 0 1 0 6 6H8v2z"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <!-- Lixeira -->
            <div class="ml-auto flex items-center justify-center">
                <button @click="removeTodo" class="focus:outline-none">
                    <svg 
                    class="ml-3 h-4 w-4 text-gray-500" 
                    viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>