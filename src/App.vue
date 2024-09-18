<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>My files</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>

            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>

          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
          <v-list>
            <v-list>
              <v-list-item to="/login" router-link>
                <v-list-item-content>
                  <v-list-item-title>Login</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/chu-de" router-link>
                <v-list-item-content>
                  <v-list-item-title>Chủ đề</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="" @click="logOut" v-if="isAuthenticated">
                <v-list-item-content>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height: 100vh;">
          <router-view></router-view>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    drawer: false,
    isAuthenticated: !!localStorage.getItem("auth")
  }),
  methods: {
    logOut() {
      // Xóa token auth khỏi localStorage
      localStorage.removeItem("auth");
      this.isAuthenticated = false;
      // Điều hướng về trang login
      this.$router.push("/login");
    },
  },
  watch: {
    // Theo dõi thay đổi của route để cập nhật trạng thái đăng nhập
    $route() {
      this.isAuthenticated = !!localStorage.getItem("auth");
    },
  },
}
</script>
