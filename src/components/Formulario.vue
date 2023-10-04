<template>
  <div class="box formulario">
    <div class="columns">
      <div
        role="form"
        class="column is-5"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import { key } from '@/store'

import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  components: { Temporizador },
  emits: ['onSave'],
  data() {
    return { descricao: "", idProjeto: '' };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('onSave', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find(proj => proj.id === this.idProjeto)
      })
      
      this.descricao = "";
    },
  },
  setup() {
      const store = useStore(key)

      return {
        projetos: computed(() => store.state.projetos)
      }
  },
});
</script>


<style scoped>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>