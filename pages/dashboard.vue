<template>
  <div>
    <app-loader v-if="$fetchState.pending || isLoader" />
    <div v-else class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">
          <nav
            id="sidebarMenu"
            class="collapse d-lg-block sidebar collapse bg-white"
          >
            <div class="position-sticky">
              <div class="list-group list-group-flush mx-3 mt-4">
                <a
                  href="#"
                  class="list-group-item list-group-item-action py-2 active ripple"
                  aria-current="true"
                >
                  <i class="fas fa-tachometer-alt fa-fw me-3"></i
                  ><span>Main dashboard</span>
                </a>
                <button
                  class="btn"
                  style="
                    display: flex;
                    width: 90%;
                    margin-top: 4px;
                    margin-right: 10px;
                    height: 40px;
                  "
                  @click="openNewUserModal"
                >
                  <i class="material-icons">&#xE147;</i
                  ><span style="margin-top: 4px; margin-left: 4px"
                    >Add New Employee</span
                  >
                </button>
                <button
                  class="btn"
                  style="
                    display: flex;
                    width: 90%;
                    margin-top: 4px;
                    margin-right: 10px;
                    height: 40px;
                  "
                  @click="handleLogout"
                >
                  <span class="material-icons">logout</span>
                  <span style="margin-top: 4px; margin-left: 4px">Logout</span>
                </button>
              </div>
            </div>
          </nav>

          <nav
            id="main-navbar"
            class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
          >
            <div
              class="container-fluid"
              style="background-color: white; height: 60px"
            >
              <hr>
              <!-- Toggle button -->
              <button
                class="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="fas fa-bars"></i>
              </button>
              <div>
                <h3>Manage <b>Employees</b></h3>
              </div>
              <!-- Right links -->
              <ul class="navbar-nav ms-auto d-flex flex-row">
                <!-- Avatar -->
                <li class="nav-item dropdown">
                  <a
                    style="border: none"
                    class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                      class="rounded-circle"
                      height="22"
                      alt=""
                      loading="lazy"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main style="margin-top: 58px">
            <table class="table align-middle hover mb-0 bg-white">
              <thead class="bg-light">
                <user-headers />
              </thead>
              <tbody v-for="(data, index) in userInfos" :key="index">
                <user-info-row
                  :user-info="data"
                  @editUser="updateUser"
                  @deleteUser="deleteUser"
                />
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
    <user-form ref="userForm" @addOrUpdateUser="addUser" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../assets/css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { mapGetters } from "vuex";
import { setStateFromLocal } from "../helpers/authHelper";

export default Vue.extend({
  name: "PagesDashboard",

  middleware: "auth",

  data() {
    return {
      userInfos: null,
      isLoader: null,
    };
  },
  computed: {
    ...mapGetters({
      userData: "users/usersInfos",
      isUserAuthenticated: "isUserAuthenticated",
    }),
  },

  async beforeMount(): Promise<void> {
    setStateFromLocal(this.$store);
    await this.$fetch();
  },

  async fetch(): Promise<void> {
    await this.$store.dispatch("users/getAllUsers");
    this.assignToUserInfos();
  },

  watch: {
    userData(): void {
      this.assignToUserInfos();
    },
  },

  methods: {
    assignToUserInfos(): void {
      this.userInfos = [...new Set(this.userData)];
    },

    close(): void {
      if (this.$refs.modal) {
        this.$refs.modal.close();
      }
    },

    deleteUser(userId) {
      this.$store.dispatch("users/removeUser", userId);
      this.assignToUserInfos();
    },

    async addUser(userData): Promise<void> {
      await this.$store.dispatch("users/addUser", userData);
    },

    async handleLogout(): Promise<void> {
      this.isLoader = "running";
      const response = await this.$store.dispatch("logout");
      this.isLoader = null;
      if (response) {
        this.$router.go();
      } else {
        alert("Something wrong, Try again...");
      }
    },
    updateUser(): void {
      this.assignToUserInfos();
    },

    openNewUserModal(): void {
      if (this.$refs.userForm) {
        this.$refs.userForm.open();
      }
    },
  },
});
</script>
