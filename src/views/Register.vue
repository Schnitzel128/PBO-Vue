<template>
  <b-container id="loginForm">
    <b-alert
      variant="danger"
      :show="showAlert"
    >{{ error }} @{{ errorDate }}</b-alert>
    <b-alert
      variant="success"
      :show="showSuccess"
    >{{ successMessage }} </b-alert>
    <div>
      <b-form @submit="onSubmit">
        <b-form-input 
          id="inputUsername"
          v-model="username"
          type="text"
          placeholder="Username"
          :state="usernameState"
        />
        <b-form-input 
          v-model="password1"
          class="inputPassword"
          type="password"
          placeholder="Password"
          :state="passwordState1"
        /> 
        <b-form-input 
          v-model="password2"
          class="inputPassword2"
          type="password"
          placeholder="Confirm Password"
          :state="passwordState2"
        />  
        <b-button 
          id="submitButton" 
          type="submit"
        >Register</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Register",
  data: function() {
    return {
      username: "",
      usernameState: null,
      password1: "",
      passwordState1: null,
      password2: "",
      passwordState2: null,
      error: null,
      errorDate: null,
      showAlert: false,
      successMessage: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.username || !this.password1 || !this.password2) {
        this.usernameState = false;
        this.passwordState2 = false;
        this.passwordState1 = false;
        return;
      }
      if (this.password1 !== this.password2) {
        this.passwordState2 = false;
        this.passwordState1 = false;
        return;
      }
      this.axios
        .post("./api/register/", {
          username: this.username,
          password: this.password1,
          password2: this.password2
        })
        .then(response => {
          this.resetTextFields();
          this.showSuccess = true;
          this.successMessage = response.data;
        })
        .catch(e => {
          this.showAlert = true;
          this.errorDate = new Date();
          let errorMessage = e.message;
          if (typeof e.response.data !== "undefined") {
            errorMessage = e.response.data;
          }
          this.error = errorMessage;
          this.resetTextFields();
        });
    },
    resetTextFields() {
      this.username = "";
      this.password1 = "";
      this.password2 = "";
      this.usernameState = null;
      this.passwordState2 = null;
      this.passwordState1 = null;
    }
  }
};
</script>

<style scoped>
#submitButton {
  margin: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

#inputUsername,
.inputPassword {
  margin-bottom: 5px;
}

#loginForm {
  width: 30vw;
}
</style>
