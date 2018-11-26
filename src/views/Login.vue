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
          id="inputPassword"
          v-model="password"
          type="password"
          placeholder="Password"
          :state="passwordState"
        />  
        <b-button 
          id="submitButton" 
          type="submit"
        >Login</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      usernameState: null,
      password: "",
      passwordState: null,
      error: null,
      errorDate: null,
      showAlert: false,
      successMessage: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      if (!this.username || !this.password) {
        this.usernameState = false;
        this.passwordState = false;
        return;
      }
      this.axios
        .post("./api/login/", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.resetTextFields();
          this.showSuccess = true;
          this.successMessage = "Login successful.";
          console.log(response.data);
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
      this.password = "";
      this.usernameState = null;
      this.passwordState = null;
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
#inputPassword {
  margin-bottom: 5px;
}

#loginForm {
  width: 30vw;
}
</style>
