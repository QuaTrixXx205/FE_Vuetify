<template>
    <v-sheet class="mx-auto mt-4" width="400">
        <div class="text-center mb-2"><b>Đăng nhập hệ thống</b></div>
        <v-form>
            <v-text-field v-model="userName" label="Tên đăng nhập"></v-text-field>
            <v-text-field v-model="userPass" label="Mật khẩu"></v-text-field>
            <v-btn class="mt-2" block @click="userLogin()" color="primary" elevation="0">Đăng nhập</v-btn>
        </v-form>
        <div v-if="loginError != ''" class="text-center mt-4 mb-2 error--text">{{ loginError }}</div>
    </v-sheet>
</template>

<style scoped>
    .error--text{
        color: red;
    }
</style>

<script>
import axios from '../utils/axios'

export default {
    name: 'LoginComponent',
    data: () => ({
        userName: "",
        userPass: "",
        loginError: ""
    }),

    methods: {
        userLogin() {
            axios.post('/login', {
                UserName: this.userName,
                PassWord: this.userPass
            }).then(function (response) {
                localStorage.setItem('auth', response.data.token)
                location = "/chu-de"
            }).catch((error) => {
                this.loginError = error.response.data.message;
            });
        },
    }
}
</script>