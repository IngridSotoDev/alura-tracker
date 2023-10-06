<template>
  <Formulario @onSave="salvarTarefa" />

  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          v-model="filtro"
          placeholder="Digite para filtrar"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <Box v-if="listaEstaVazia && !filtro">
      Você não esta muito produtiva hoje :(
    </Box>

    <Box v-if="listaEstaVazia && filtro"> Tarefa não encontrada :( </Box>

    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @onSelect="selecionarTarefa"
    />

    <Modal :mostrar="tarefaSelecionada != null" v-if="tarefaSelecionada">
      <template v-slot:header>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button @click="alterarTarefa" class="button is-success">
          Salvar alterações
        </button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";

import Box from "../components/Box.vue";
import Formulario from "../components/Formulario.vue";
import Modal from "@/components/Modal.vue";
import Tarefa from "../components/Tarefa.vue";

import ITarefa from "@/interfaces/ITarefa";

import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/actions-type";

export default defineComponent({
  name: "Tarefas",
  components: {
    Box,
    Formulario,
    Modal,
    Tarefa,
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("");
    const tarefaSelecionada = ref<ITarefa | null>(null);

    const tarefas = computed(() => store.state.tarefa.tarefas);

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    const listaEstaVazia = computed(() => !tarefas.value?.length);

    const salvarTarefa = (tarefa: ITarefa) => {
      store.dispatch(CADASTRAR_TAREFA, tarefa);
    };

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa;
    };

    const fecharModal = () => {
      tarefaSelecionada.value = null;
    };

    const alterarTarefa = () => {
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value).then(fecharModal);
    };

    return {
      filtro,
      tarefas,
      fecharModal,
      salvarTarefa,
      alterarTarefa,
      listaEstaVazia,
      selecionarTarefa,
      tarefaSelecionada,
    };
  },
});
</script>
