import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import IProjeto from "@/interfaces/IProjeto";

interface State {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projetos: [
      
    ],
  },
  mutations: {
    'ADICIONA_PROJETO'(state, nomeDoProjeto: string) {
      const projeto: IProjeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      }

      state.projetos.push(projeto)
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key)
}