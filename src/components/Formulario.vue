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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

import { key } from "@/store";

import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  components: { Temporizador },
  emits: ["onSave"],
  setup(props, { emit }) {
    const store = useStore(key);
    const projetos = computed(() => store.state.projeto.projetos);

    const descricao = ref("");
    const idProjeto = ref(null);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      emit("onSave", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find((proj) => proj.id == idProjeto.value),
      });
      idProjeto.value = null;
      descricao.value = "";
    };

    return {
      projetos,
      descricao,
      idProjeto,
      finalizarTarefa,
    };
  },
});
</script>

<style scoped>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
