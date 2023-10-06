import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { INotificacao } from "@/interfaces/INotificacao";

import { NOTIFICAR } from "./mutations-type";

import { TaskState, tarefa } from "./modulos/tarefa";

import { ProjectState, projeto } from "./modulos/projeto";

export interface StateGlobal {
  tarefa: TaskState;
  projeto: ProjectState;
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<StateGlobal>> = Symbol();

export const store = createStore<StateGlobal>({
  modules: {
    tarefa,
    projeto,
  },
  state: {
    tarefa: {
      tarefas: [],
    },
    projeto: {
      projetos: [],
    },
    notificacoes: [],
  },
  mutations: {
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
  actions: {},
});

export function useStore(): Store<StateGlobal> {
  return vuexUseStore(key);
}
