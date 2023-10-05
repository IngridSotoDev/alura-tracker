<template>
  <section>
    <RouterLink to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </RouterLink>

    <table class="table is-fullwidth" aria-describedby="Tabela de projetos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <RouterLink :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>

            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/actions-type";

export default defineComponent({
  name: "Lista",
  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);

    return {
      store,
      projetos: computed(() => store.state.projeto.projetos),
    };
  },
  methods: {
    excluir(id: number) {
      this.store.dispatch(REMOVER_PROJETO, id);
    },
  },
});
</script>
