<script setup>
import TodoItem from './TodoItem.vue';
import { useTodos } from '../stores/Todos';
import {onMounted} from 'vue';

const todosStore = useTodos();

onMounted(async () => {
   await todosStore.fetchTodos();
});

</script>

<template>
    <div v-for="todo in todosStore.todos" :key="todo.id">
        <TodoItem :todo="todo" />
    </div>
</template>
