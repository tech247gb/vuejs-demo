<template>
  <tr>
    <td style="width: 20%">{{ userInfo.name }}</td>
    <td class="text-center">{{ userInfo.gender }}</td>
    <td class="text-center">{{ userInfo.email }}</td>
    <td class="text-center">{{ userInfo.status }}</td>
    <td class="actionButtons" style="border: none">
      <!-- edit button -->
      <button class="edit" @click="editUser">
        <i class="material-icons" data-toggle="tooltip" title="Edit"
          >&#xE254;</i
        >
      </button>
      <!-- delete button -->
      <button @click="deleteUser" class="delete" data-toggle="modal">
        <i class="material-icons" data-toggle="tooltip" title="Delete"
          >&#xE872;</i
        >
      </button>
    </td>
    <user-form ref="userForm" @addOrUpdateUser="updateUser" />
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "UserInfoRow",

  props: {
    userInfo: {
      type: Object,
      default: null,
      validators: prop => prop === null || typeof prop === Object
    },
  },

  methods: {
    editUser(): void {
      if (this.userInfo) {
        if (this.$refs.userForm) {
          this.$refs.userForm.open(this.userInfo);
        }
      }
    },

    async updateUser(userData): Promise<void> {
      await this.$store.dispatch("users/updateUser", userData);
      this.$emit("updateUser");
    },

    deleteUser(): void {
      this.$emit("deleteUser", this.userInfo.id);
    },
  },
});
</script>

<style>
button {
  border: none;
  background-color: none;
}

.actionButtons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border-top: 0px solid #e9ecef;
}
</style>
