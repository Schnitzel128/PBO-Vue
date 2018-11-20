<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button @click="loadUsers">Load User</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert
          variant="danger"
          :show="showAlert"
        >{{ error }} @{{ errorDate }}</b-alert>
      </b-col>
    </b-row>
    <b-row
      v-for="user in users"
      :key="user.id"
    >
      <b-col>
        {{ user.id }}
      </b-col>
      <b-col>
        {{ user.username }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      users: [],
      error: null,
      errorDate: null,
      showAlert: false
    };
  },
  methods: {
    loadUsers() {
      this.showAlert = false;
      this.axios
        .get("./api/user/")
        .then(response => {
          this.users = response.data;
        })
        .catch(e => {
          this.showAlert = true;
          this.error = e.message;
          this.errorDate = new Date();
        });
    }
  }
};
</script>

<style scoped>
</style>
