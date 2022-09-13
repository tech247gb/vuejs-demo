<template>
  <div>
    <app-modal v-if="isOpen" @close="close">
      <div id="editEmployeeModal">
        <div class="modal-dialog">
          <div
            class="modal-content"
            style="width: 500px; background-color: white"
          >
            <form @submit.prevent="handleSubmit">
              <div class="modal-header">
                <h4 class="modal-title">New Employee</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label> Name</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Gender</label>
                  <select
                    class="form-select form-select-lg mb-3"
                    v-model="form.gender"
                  >
                    <option
                      selected="selected"
                      disabled="disabled"
                      value="null"
                    >
                      Select Any
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>email</label>
                  <input
                    type="email"
                    v-model="form.email"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Status</label>
                  <select
                    class="form-select form-select-lg mb-3"
                    v-model="form.status"
                  >
                    <option
                      selected="selected"
                      disabled="disabled"
                      value="null"
                    >
                      Select Any
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <input
                  @click="close"
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  value="Cancel"
                />
                <input type="submit" class="btn btn-info" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </app-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import "../assets/css/dashboard.css";

export default Vue.extend({
  name: "UserForm",

  props: {
    name: {
      type: String,
      default: null,
      validators: prop => prop === null || typeof prop === String
    },
    gender: {
      type: String,
      default: null,
      validators: prop => prop === null || typeof prop === String
    },
    email: {
      type: String,
      default: null,
      validators: prop => prop === null || typeof prop === String
    },
    status: {
      type: String,
      default: null,
      validators: prop => prop === null || typeof prop === String
    },
  },

  data() {
    return {
      isOpen: false,
      form: {
        name: null,
        gender: null,
        email: null,
        status: null,
      },
      userId: null,
    };
  },

  methods: {
    open(userInfo): void {
      if (userInfo && Object.values(userInfo).length) {
        this.form.name = userInfo.name;
        this.form.gender = userInfo.gender;
        this.form.email = userInfo.email;
        this.form.status = userInfo.status;
        this.userId = userInfo.id;
      }
      this.isOpen = true;
    },

    handleSubmit(): void {
      this.$emit('addOrUpdateUser', this.userId ? { id: this.userId, ...this.form} : this.form );
      this.close();
    },

    close(): void {
      this.form.name = null;
      this.form.gender = null;
      this.form.email = null;
      this.form.status = null;
      this.isOpen = false;
    },
  },
});
</script>
