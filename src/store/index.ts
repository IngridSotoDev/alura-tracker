import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import IProjeto from "@/interfaces/IProjeto";
import { INotificacao } from "@/interfaces/INotificacao";

import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
  LISTAR_PROJETOS,
  NOTIFICAR,
} from "./mutations-type";
import { OBTER_PROJETOS } from "./actions-type";
import http from "@/http";

interface State {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto: IProjeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      };

      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, idDoProjeto: string) {
      state.projetos = state.projetos.filter((proj) => proj.id !== idDoProjeto);
    },
    [LISTAR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
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
        .then((response) => commit(LISTAR_PROJETOS, response.data));
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
