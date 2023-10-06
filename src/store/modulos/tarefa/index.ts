import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { StateGlobal } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
} from "@/store/actions-type";
import { ADICIONA_TAREFA, LISTA_TAREFAS } from "@/store/mutations-type";
import { Module } from "vuex";

export interface TaskState {
  tarefas: ITarefa[];
}

const URL = "tarefas";

export const tarefa: Module<TaskState, StateGlobal> = {
  mutations: {
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERAR_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((item) => item.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
    [LISTA_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro) {
      const queryParams = filtro ? "/?descricao=" + filtro : "";

      http
        .get(`${URL}${queryParams}`)
        .then((response) => commit(LISTA_TAREFAS, response.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post(URL, tarefa)
        .then((response) => commit(ADICIONA_TAREFA, response.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`${URL}/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERAR_TAREFA, tarefa));
    },
  },
};
