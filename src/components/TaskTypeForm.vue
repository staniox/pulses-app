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
            label="Nome do tipo de tarefa:"
            label-for="input-1"
        >
          <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              required
          ></b-form-input>
        </b-form-group>
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
  name: "TaskTypeForm",
  components: {Container},
  data() {
    return {
      //c para criar e para editar
      typeForm: 'c',
      labelHeader: ({c:"Criar Tipo de tarefa", e:"Editar tipo de tarefa"}),
      labelSuccess: ({c:"Tipo de tarefa Inserida com sucesso", e:"Tipo de tarefa Editada com sucesso"}),
      taskID: this.$route.params.id,
      form: {
        name: '',
      },

    }
  },
  methods: {
    setLoad() {
      this.onLoad()
    },
    onSubmit(event) {
      event.preventDefault()
      if (this.typeForm === 'c'){
        let formData = new FormData();
        formData.append('name', this.form.name)

        app.post('/task-type', formData).then(res=>{
          if(res)
          this.$bvModal.msgBoxOk(this.labelSuccess[this.typeForm])
              .then(value => {
                if(value)
                  this.$router.push({ path : '/task-types' });
              })
              .catch(err => {
                console.log(err)
              })
        }).catch(err =>{
          console.log(err)
        })
      }
      else if(this.typeForm === 'e'){
        let params = {
          params:{
            name: this.form.name
          }
        }
        app.put('/task-type/'+ this.taskID,null, params).then(res=>{
          if(res)
            this.$bvModal.msgBoxOk(this.labelSuccess[this.typeForm])
                .then(value => {
                  if(value)
                    this.$router.push({ path : '/task-types' });
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
      this.$router.push({ path : '/task-types' });

    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.typeForm ='e'
      app.get('/task-type/' + this.$route.params.id).then(res => {
        if (res.data) {
          this.form.name = res.data.name
        }
      })
    }
  }

}
</script>