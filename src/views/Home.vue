<template>
  <b-container>
    <div>
      <b-button @click="buttonClick">
        {{ helloMessage }}
      </b-button>
    </div>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
  </b-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      helloMessage: "Click ?"
    };
  },
  methods: {
    buttonClick() {
      alert("clicked");
      // axios is our way to go for http requests
      // this will only work, if you build vue (npm run build) and start the web server (npm run start)
      this.axios
        .get("/api/user") // route (this will be given by the backend team
        .then(response => {
          this.helloMessage = response.data;
        })
        .catch(e => {
          this.helloMessage = e.message;
        });
    }
  }
};
</script>
