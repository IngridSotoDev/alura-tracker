import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import IProjeto from "@/interfaces/IProjeto";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
} from "./mutations-type";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";

interface State {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [
      {
        id: 1,
        texto: "uma notificacao",
        titulo: "sucesso",
        tipo: TipoNotificacao.SUCESSO,
      },
      {
        id: 2,
        texto: "uma notificacao",
        titulo: "atencao",
        tipo: TipoNotificacao.ATENCAO,
      },
      {
        id: 3,
        texto: "uma notificacao",
        titulo: "falha",
        tipo: TipoNotificacao.FALHA,
      },
    ],
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
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
