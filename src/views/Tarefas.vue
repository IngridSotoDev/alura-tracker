<template>
  <Formulario @onSave="salvarTarefa" />

  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />

    <Box v-if="listaEstaVazia"> Você não esta muito produtiva hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import Box from "../components/Box.vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";

import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import {
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/actions-type";

export default defineComponent({
  name: "Tarefas",
  components: {
    Box,
    Formulario,
    Tarefa,
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return !this.tarefas.length;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
  },
});
</script>
