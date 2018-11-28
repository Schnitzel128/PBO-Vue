<template>
  <b-container>
    <b-row>
      <b-col>
        <h4>User Management</h4>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="4">
        <b-alert
          variant="success"
          :show="success"
        >{{ successMessage }}</b-alert>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="4">
        <b-alert
          variant="danger"
          :show="showAlert"
        >{{ error }}</b-alert>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="4">
        <b-alert
          variant="info"
          :show="deleted"
        >{{ deletedMessage }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h5>id</h5>
      </b-col>
      <b-col>
        <h5>username</h5>
      </b-col>
      <b-col>
        <h5>actions</h5>
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
      <b-col>
        <b-button
          variant="danger"
          @click="delUser(user.username)"
        >Delete</b-button>
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
      showAlert: false,
      success: false,
      successMessage: "",
      deletedMessage: "",
      deleted: false
    };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      this.hideError();
      this.hideSuccess();
      this.axios
        .get("/api/user/")
        .then(response => {
          this.users = response.data;
          this.showSuccess("Users loaded");
        })
        .catch(e => {
          if (typeof e.response.data !== "undefined") {
            this.showError(e.response.data);
          } else {
            this.showError(e.message);
          }
        });
    },
    delUser(username) {
      this.hideError();
      this.hideSuccess();
      this.axios
        .delete("/api/user/" + username)
        .then(response => {
          this.showDeletedSuccess("User deleted (" + response.data + ")");
          this.loadUsers();
        })
        .catch(e => {
          if (typeof e.response.data !== "undefined") {
            this.showError(e.response.data);
          } else {
            this.showError(e.message);
          }
        });
    },
    showError(message) {
      this.showAlert = true;
      this.error = message;
    },
    showSuccess(message) {
      this.success = true;
      this.successMessage = message;
    },
    showDeletedSuccess(message) {
      this.deleted = true;
      this.deletedMessage = message;
    },
    hideSuccess() {
      this.success = false;
    },
    hideError() {
      this.showAlert = false;
    }
  }
};
</script>

<style scoped>
</style>
