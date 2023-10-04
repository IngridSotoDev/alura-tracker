import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";
import IProjeto from "@/interfaces/IProjeto";

interface State {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projetos: [
      {
        id: new Date().toISOString(),
        nome: "Typescript",
      },
      {
        id: new Date().toISOString(),
        nome: "Vue",
      },
      {
        id: new Date().toISOString(),
        nome: "Vuex",
      },
    ],
  },
});
