<script setup>
import HeaDer from '../components/HeaDer.vue';
import TodoForm from '../components/TodoForm.vue';
import TodoItems from '../components/TodoItems.vue';
import TodoVazio from '../components/TodoVazio.vue';
import { useTodos } from '@/stores/Todos';
import { onMounted, ref, computed } from 'vue';

const todosStore = useTodos();
const isEmpty = ref(true);

onMounted(async () => {
  await todosStore.fetchTodos();
  isEmpty.value = todosStore.checkEmpty;
});

const isEmptyComputed = computed(() => todosStore.checkEmpty);


</script>

<template>
  <header>
    <HeaDer class="header"/>
  </header>
  <main class="grid justify-items-center">
    <TodoForm />
    <TodoItems />
    <TodoVazio v-if="isEmptyComputed"/>
  </main>
</template>

<style scoped>
.header{
  margin-bottom: 10%;
}

@media (max-width: 700px) {
  .header{
      margin-bottom: 20%;
  }
}
</style>
