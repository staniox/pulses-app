<template>
  <Container>
    <div class="row d-flex align-items-baseline">
      <div class="col-6 mb-3 pt-4" style="opacity: 0.5"><h2><strong>{{labelHeader[typeForm]}}</strong></h2></div>
      <div class="col-6 text-right">
      </div>
    </div>
    <b-card>
      <b-form @submit="onSubmit">
        <b-form-group
            id="input-group-1"
            label="Descricao:"
            label-for="input-1"
        >
          <b-form-input
              id="input-1"
              v-model="form.description"
              type="text"
              required
          ></b-form-input>
        </b-form-group>


        <b-form-group id="input-group-2" label="Tipo de tarefa:" label-for="input-2">
          <b-form-select
              id="input-2"
              v-model="form.task_type"
              :options="task_types"
              required
          ></b-form-select>
        </b-form-group>
        <div>
          <label for="datepicker">Data limite:</label>
          <b-form-datepicker
              id="datepicker"
              v-model="form.deadline"
              class="mb-2"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              locale="pt"
              placeholder="Escolha uma data"
          ></b-form-datepicker>
        </div>
        <br>
        <br>

        <b-button squared type="submit" variant="success" class="mr-3">Salvar</b-button>
        <b-button squared type="button" @click="onCancel" variant="danger" class="bg-light text-dark border-light">
          Cancelar
        </b-button>
      </b-form>
    </b-card>
  </Container>
</template>
<script>
import Container from "@/components/Container";
import {app} from "@/services/axios";

export default {
  name: "TaskForm",
  components: {Container},
  data() {
    return {
      //c para criar e para editar
      typeForm: 'c',
      labelHeader: ({c:"Criar Tarefa", e:"Editar tarefa"}),
      labelSuccess: ({c:"Usuario Inserido com sucesso", e:"Usuario Editado com sucesso"}),
      taskID: this.$route.params.id,
      form: {
        description: '',
        task_type: null,
        deadline: ''
      },
      task_types: [{text: 'Selecione', value: null}],

    }
  },
  methods: {
    setLoad() {
      this.onLoad()
    },
    onLoad() {
      console.log(this.labelHeader[this.typeForm])
    },
    onSubmit(event) {
      event.preventDefault()
      if (!this.form.deadline) {
        alert('Por favor Selecione a Data');
        return;
      }
      if (this.typeForm === 'c'){
        let formData = new FormData();
        formData.append('description', this.form.description)
        formData.append('type_id', this.form.task_type)
        formData.append('deadline', this.form.deadline)
        app.post('/task', formData).then(res=>{
          if(res)
          this.$bvModal.msgBoxOk(this.labelSuccess[this.typeForm])
              .then(value => {
                if(value)
                  this.$router.push({ path : '/tasks' });
              })
              .catch(err => {
                console.log(err)
              })
        }).catch(err =>{
          console.log(err)
        })
        console.log(formData)
      }
      else if(this.typeForm === 'e'){
        let params = {
          params:{
            description: this.form.description,
            type_id: this.form.task_type,
            deadline: this.form.deadline,
          }
        }
        app.put('/task/'+ this.taskID,null, params).then(res=>{
          if(res)
            this.$bvModal.msgBoxOk(this.labelSuccess[this.typeForm])
                .then(value => {
                  if(value)
                    this.$router.push({ path : '/tasks' });
                })
                .catch(err => {
                  console.log(err)
                })
        }).catch(err =>{
          console.log(err)
        })
      }

    },
    onCancel(event) {
      event.preventDefault()
      this.$router.push({ path : '/tasks' });

    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.typeForm ='e'
      console.log(this.typeForm)
      app.get('task/' + this.$route.params.id).then(res => {
        if (res.data) {
          this.form.description = res.data.description
          this.form.task_type = res.data.type_id.id
          this.form.deadline = res.data.deadline
        }
      })
    }
    app.get('task-types').then(res => {
      console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {
        this.task_types.push({text: res.data[i].name, value: res.data[i].id})
      }
    })
  }

}
</script>