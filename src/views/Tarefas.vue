<template>
  <Formulario @onSave="salvarTarefa" />

  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />

    <Box v-if="listaEstaVazia"> Você não esta muito produtiva hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Box from "../components/Box.vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";

import ITarefa from "../interfaces/ITarefa";

export default defineComponent({
  name: "Tarefas",
  components: {
    Box,
    Formulario,
    Tarefa,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return !this.tarefas.length;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>

