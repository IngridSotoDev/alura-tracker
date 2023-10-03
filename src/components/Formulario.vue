<template>
  <div class="box formulario">
    <div class="columns">
      <div
        role="form"
        class="column is-8"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>

      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  components: { Temporizador },
  emits: ['onSave'],
  data() {
    return { descricao: "" };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('onSave', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao
      })
      
      this.descricao = "";
    },
  },
});
</script>


<style scoped>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>