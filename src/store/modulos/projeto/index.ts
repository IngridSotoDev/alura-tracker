import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { StateGlobal } from "@/store";
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETO,
  OBTER_PROJETOS,
  REMOVER_PROJETO,
} from "@/store/actions-type";
import { EXCLUI_PROJETO, LISTA_PROJETOS } from "@/store/mutations-type";
import { Module } from "vuex";

export interface ProjectState {
  projetos: IProjeto[];
}

export const projeto: Module<ProjectState, StateGlobal> = {
  mutations: {
    [EXCLUI_PROJETO](state, id: number) {
      state.projetos = state.projetos.filter((item) => item.id !== id);
    },
    [LISTA_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
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
  },
};
