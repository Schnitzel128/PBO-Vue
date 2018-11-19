<template>
  <b-container id="loginForm">
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
      passwordState: null
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      !this.username
        ? (this.usernameState = false)
        : (this.usernameState = true);
      !this.password
        ? (this.passwordState = false)
        : (this.passwordState = true);
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
