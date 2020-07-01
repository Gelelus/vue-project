<template>
  <div class="todoList">
    <TodoTable />
  </div>
</template>

<script>
import TodoTable from "@/components/TodoTable.vue";

export default {
  name: "Todo",
  components: {
    TodoTable
  }
};
</script>
