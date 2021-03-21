<template>

  <Container>
    <div class="row d-flex align-items-baseline">
      <div class="col-6 mb-3 pt-4" style="opacity: 0.5"><h2><strong>Tarefas</strong></h2></div>
      <div class="col-6 text-right">
        <b-button :to="'task-types/'" squared class="bg-light text-dark border-0">Tipos de tarefas</b-button>
        <b-button :to="'task/'+(selected? selected: '')"
                  squared variant="primary" class="m-2"
                  v-b-tooltip.hover title="Selecione uma tarefa para edita-la">
          {{ labelCreateEdit[actionType] }}
        </b-button>
      </div>
    </div>
    <b-card class="rounded-0 shadow">
      <b-form-group
          v-model="filter"
          label="Filtro"
          label-cols-sm="1"
          label-align-sm="left"
          label-size="md"
          class="mb-0 text-left align-middle"
      >
        <b-form-select
            class="col-2"
            id="input-2"
            v-model="filter"
            :options="task_types"
            @change="getFilter"
        ></b-form-select>
      </b-form-group>
      <br>
      <b-table
          :items="filteredItems"
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

        <template v-slot:cell(is_done)="data">
          <template v-if="data.item.is_done" class="col-1 col-sm-1" @click="setChecked()">
            <i class="fas fa-check-circle fa-2x text-success pointer-event" @click="setChecked(data.item.id)"></i>
          </template>
          <template v-else>
            <i class="far fa-circle fa-2x pointer-event" style="opacity: 0.4" @click="setChecked(data.item.id)"></i>
          </template>
        </template>
        <template v-slot:cell(deadline)="data">
          <div class="td-container ">{{ data.item.deadline | moment("DD/MM/YYYY") }}</div>
        </template>
        <template v-slot:cell(type_id)="data">
          <div class="td-container bg-white">{{ data.item.type_id.name }}</div>
        </template>
        <template v-slot:cell(description)="data" class="col-10 border-0 no-border">
          <div class="td-container bg-white">{{ data.item.description }}
            <b-button squared variant="danger" class="btn py-0" @click="deleteTask(data.item.id)">Deletar</b-button>
          </div>
        </template>
        <template v-slot:cell(action)="data">
          <div class="td-container bg-white">
            <b-button squared variant="danger" @click="deleteTask(data.item.id)">Deletar</b-button>
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
  name: 'Tasks',
  components: {Container},
  props: {
    msg: String
  },
  data() {
    return {
      actionType:'c',
      labelCreateEdit:{c:"+ Criar tarefa", e: "Editar tarefa"},
      title: "Tasks",
      fields: [
        {key: 'is_done', variant: 'light', class: 'align-middle'},
        {key: 'deadline', class: 'align-middle'},
        {key: 'type_id', class: 'align-middle'},
        {key: 'description', class: 'col-8 align-middle'}],
      items: [],
      filteredItems:[],
      selected: [],
      task_types: [{text: 'Selecione', value: null}],
      filter:null,
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
    setChecked(id = null) {
      if (id) {
        app.put('task/' + id + '/is-done').then(() => {
          this.getData()
        }).catch(err => {
          console.log(err)
        })
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
                app.delete('task/' + id).then(() => {
                  this.getData()
                  this.selected = null
                  this.actionType= 'c'
                  this.$bvModal.msgBoxOk("Tarefa deletada com sucesso")
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
      app.get('tasks').then(res => {
        this.items.push(...res.data)
        this.filteredItems = this.items
      })
    },
    getFilter(e){
       this.filteredItems = [];
       if(e){
         for (let i =0; i< this.items.length; i++){
           if(this.items[i].type_id.id === e)
             this.filteredItems.push(this.items[i])
         }
       }
       else {
         this.filteredItems = this.items
       }
    }
  },
  mounted() {
    this.getData()
    app.get('task-types').then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.task_types.push({text: res.data[i].name, value: res.data[i].id})
      }
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
