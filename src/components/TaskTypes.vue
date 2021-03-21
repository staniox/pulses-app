<template>
  <Container>
    <div class="row d-flex align-items-baseline">
      <div class="col-6 mb-3 pt-4" style="opacity: 0.5"><h2><strong>Tipos de tarefas</strong></h2></div>
      <div class="col-6 text-right">
        <b-button :to="'/tasks'" squared class="bg-light text-dark border-0">Lista de tarefas</b-button>
        <b-button :to="'/task-type/'+(selected? selected: '')"
                  squared variant="primary" class="m-2"
                  v-b-tooltip.hover title="Selecione uma tarefa para edita-la">
          {{ labelCreateEdit[actionType] }}
        </b-button>
      </div>
    </div>
    <b-card class="rounded-0 shadow">
      <b-table
          :items="items"
          :fields="fields"
          responsive="sm"
          ref="selectableTable"
          thead-class="d-none"
          selectable
          select-mode="single"
          @row-clicked="onRowSelected"
          show-empty
          class="table-borderless align-items-center justify-content-center"
          selected-variant="primary"
      >
        <template v-slot:cell(name)="data" class="col-12 border-0 no-border">
          <div class="td-container bg-white">{{ data.item.name }}
            <b-button squared variant="danger" class="btn py-0" @click="deleteTask(data.item.id)">Deletar</b-button>
          </div>
        </template>
      </b-table>
    </b-card>
  </Container>
</template>

<script>
import {app} from "@/services/axios";
import Container from "@/components/Container";

export default {
  name: 'TaskTypes',
  components: {Container},
  props: {
    msg: String
  },
  data() {
    return {
      actionType:'c',
      labelCreateEdit:{c:"+ Criar tipo", e: "Editar tipo"},
      title: "TaskTypes",
      fields: [
        {key: 'name', class: 'col-12 align-middle', sortable: true, sortDirection: 'asc'}],
      items: [],
      selected: []
    }
  },
  methods: {
    onRowSelected(item) {
      if (item.id === this.selected) {
        this.selected = null
        this.actionType='c'
      } else {
        this.selected = item.id
        this.actionType='e'
      }
    },
    deleteTask(id) {
      if (id) {
        this.$bvModal.msgBoxConfirm('Deseja realmente deletar? esse processo é irreversível', {
          title: 'Atenção',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'SIM',
          cancelTitle: 'NAO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
            .then((value) => {
              if (value) {
                app.delete('task-type/' + id).then(() => {
                  this.getData()
                  this.selected = null
                  this.actionType= 'c'
                  this.$bvModal.msgBoxOk("Tipo de tarefa deletado com sucesso")
                }).catch(err => {
                  console.log(err)
                })
              }
            })
            .catch(err => {
              console.log(err)
            })

      }
    },
    getData() {
      this.getTasks()
    },
    getTasks() {
      this.items = []
      app.get('task-types').then(res => {
        this.items.push(...res.data)
      })
    }
  },
  mounted() {
    this.getData()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.table-borderless td, .table-borderless th, .table-borderless tr {
  border: none !important;
  outline: 0 !important;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table {
  border-collapse: separate;
  border-spacing: 0 20px;
}

table tr {
  background-color: #d9d9d9;
  text-align: center;
}

td {
  background-color: #d9d9d9;
  margin: 0 auto;
  padding: 4px !important;
}

.td-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  /*background: white;*/
  padding: 15px 20px;
}
</style>
