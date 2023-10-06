<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-5">
        {{ tarefa.projeto?.nome || "N/D" }}
      </div>
      <div class="column is-flex is-align-items-center">
        <i class="fa-regular fa-clock mr-2"></i>
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Box from "./Box.vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "Tarefa",
  components: { Box, Cronometro },
  emits: ["onSelect"],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  methods: {
    tarefaClicada() {
      this.$emit("onSelect", this.tarefa);
    },
  },
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
