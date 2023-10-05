import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import IProjeto from "@/interfaces/IProjeto";
import { INotificacao } from "@/interfaces/INotificacao";

import {
  ADICIONA_TAREFA,
  EXCLUI_PROJETO,
  EXCLUI_TAREFA,
  LISTA_PROJETOS,
  LISTA_TAREFAS,
  NOTIFICAR,
} from "./mutations-type";
import {
  ALTERAR_PROJETO,
  ALTERAR_TAREFA,
  CADASTRAR_PROJETO,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_PROJETO,
  REMOVER_TAREFA,
} from "./actions-type";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

interface State {
  tarefas: ITarefa[];
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tarefas: [],
    projetos: [],
    notificacoes: [],
  },
  mutations: {
    [EXCLUI_PROJETO](state, id: number) {
      state.projetos = state.projetos.filter((item) => item.id !== id);
    },
    [LISTA_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [EXCLUI_TAREFA](state, id: number) {
      state.tarefas = state.tarefas.filter((item) => item.id !== id);
    },
    [LISTA_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id !== novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http
        .get("projetos")
        .then((response) => commit(LISTA_PROJETOS, response.data));
    },
    [CADASTRAR_PROJETO](context, nomeDoProjeto: string) {
      return http.post("projetos", {
        nome: nomeDoProjeto,
      });
    },
    [ALTERAR_PROJETO](context, projeto: IProjeto) {
      return http.put(`projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: number) {
      return http
        .delete(`projetos/${id}`)
        .then(() => commit(EXCLUI_PROJETO, id));
    },
    [OBTER_TAREFAS]({ commit }) {
      http
        .get("tarefas")
        .then((response) => commit(LISTA_TAREFAS, response.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post("tarefas", tarefa)
        .then((response) => commit(ADICIONA_TAREFA, response.data));
    },
    [ALTERAR_TAREFA](context, tarefa: ITarefa) {
      return http.put(`tarefas/${tarefa.id}`, tarefa);
    },
    [REMOVER_TAREFA]({ commit }, id: number) {
      return http.delete(`tarefas/${id}`).then(() => commit(EXCLUI_TAREFA, id));
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
