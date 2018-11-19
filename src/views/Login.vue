<template>
  <b-container id="loginForm">
    <div>
      <b-form @submit="onSubmit">
        <b-form-input 
          v-model="username"
          type="text"
          placeholder="Username"
        />
        <b-form-input 
          v-model="password"
          type="password"
          placeholder="Password"
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
      password: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert("Username: " + this.username + " Password: " + this.password);
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

#loginForm {
  width: 30vw;
}
</style>
