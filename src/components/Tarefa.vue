<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefaItem.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefaItem.projeto?.nome || "N/D" }}
      </div>
      <div class="column is-flex is-align-items-center">
        <i class="fa-regular fa-clock mr-2"></i>
        <Cronometro :tempoEmSegundos="tarefaItem.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";

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
  setup(props, { emit }) {
    const { tarefa } = toRefs(props);

    const tarefaClicada = (): void => {
      emit("onSelect", tarefa);
    };

    return {
      tarefaItem: tarefa,
      tarefaClicada,
    };
  },
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
