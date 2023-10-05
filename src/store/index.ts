import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import IProjeto from "@/interfaces/IProjeto";
import { INotificacao } from "@/interfaces/INotificacao";

import { EXCLUIR_PROJETO, LISTAR_PROJETOS, NOTIFICAR } from "./mutations-type";
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETO,
  OBTER_PROJETOS,
  REMOVER_PROJETO,
} from "./actions-type";
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
    [EXCLUIR_PROJETO](state, idDoProjeto: number) {
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
    [CADASTRAR_PROJETO](context, nomeDoProjeto: string) {
      return http.post("projetos", {
        nome: nomeDoProjeto,
      });
    },
    [ALTERAR_PROJETO](context, projeto: IProjeto) {
      return http.put(`projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, idProjeto: number) {
      return http
        .delete(`projetos/${idProjeto}`)
        .then(() => commit(EXCLUIR_PROJETO, idProjeto));
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
