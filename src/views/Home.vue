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
      helloMessage: "Hello Button"
    };
  },
  methods: {
    buttonClick() {
      alert("clicked");
    }
  }
};
</script>
