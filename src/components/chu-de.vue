<template>
    <div class="text-center my-3">
        <div class="mb-2"><b>DANH SÁCH CHỦ ĐỀ</b></div>
        <v-btn elevation="2" color="success" prepend-icon="mdi-plus" :rounded="10"
            @click="openUpdateChuDeDialog('', '')">
            Thêm mới
        </v-btn>
    </div>
    <v-table style="width: 90%; height: calc(100vh - 300px);" class="mx-auto">
        <thead>
            <tr>
                <th>Mã CD</th>
                <th class="text-left">Tên chủ đề</th>
                <th>Sửa</th>
                <th>Xoá</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in dataChuDe" :key="item.MaCD">
                <td>{{ item.MaCD }}</td>
                <td>{{ item.TenChuDe }}</td>
                <td>
                    <v-btn color="primary" @click="openUpdateChuDeDialog(item.MaCD, item.TenChuDe)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-btn color="red" @click="openDeleteChuDeDialog(item.MaCD)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>

    <!-- Dialog add/update chủ đề -->
    <v-dialog v-model="dialogUpdateChuDe" max-width="500px">
        <v-card>
            <v-card-title>
                <span>Thêm Chủ Đề</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="objChuDe.TenChuDe" label="Tên Chủ Đề"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" @click="closeUpdateChuDeDialog">Hủy</v-btn>
                <v-btn color="blue" @click="updateChude">Lưu</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Dialog delete chủ đề -->
    <v-dialog v-model="dialogDeleteChuDe" max-width="500px">
        <v-card>
            <v-card-title>
                <span>Xóa Chủ Đề</span>
            </v-card-title>
            <v-card-actions>
                <v-btn color="red" @click="closeDeleteDialog">Hủy</v-btn>
                <v-btn color="blue" @click="deleteChuDe">Xóa</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from "../utils/axios";
export default {
    name: "ChuDeComponent",
    data: () => ({
        dataChuDe: [],
        dialogUpdateChuDe: false,
        dialogDeleteChuDe: false,
        objChuDe: {
            MaCD: "",
            TenChuDe: ""
        },
    }),
    mounted() {
        this.getChuDe();
    },
    methods: {
        // setData(maCD, tenCD) {
        //     this.objChuDe.MaCD = maCD;
        //     this.objChuDe.TenChuDe = tenCD; 
        //     console.log(this.objChuDe); 
        // },
        openUpdateChuDeDialog(maCD = '', tenCD = '') {
            this.objChuDe = { MaCD: maCD, TenChuDe: tenCD };
            this.dialogUpdateChuDe = true;
        },
        openDeleteChuDeDialog(maCD) {
            this.objChuDe.MaCD = maCD;
            this.dialogDeleteChuDe = true;
            console.log(this.objChuDe);
        },
        closeUpdateChuDeDialog() {
            this.dialogUpdateChuDe = false;
        },
        closeDeleteDialog() {
            this.dialogDeleteChuDe = false;
        },
        getAuthHeaders() {
            return {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth')}`
                }
            };
        },
        getChuDe() {
            axios
                .get("/GetChuDe", {})
                .then((response) => {
                    this.dataChuDe = [...response.data];
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async updateChude() {
            try {
                const response = await axios.post("/UpdateChuDe", {
                    MaCD: this.objChuDe.MaCD,
                    TenChuDe: this.objChuDe.TenChuDe
                }, this.getAuthHeaders());

                console.log("Cập nhật thành công:", response.data);
                this.closeUpdateChuDeDialog();
                this.getChuDe();
            } catch (error) {
                console.error("Lỗi khi cập nhật chủ đề:", error);
                alert("Đã xảy ra lỗi khi cập nhật chủ đề.");
            }
        },
        async deleteChuDe() {
            try {
                const response = await axios.delete("/DeleteChuDe", {
                    ...this.getAuthHeaders(),
                    data: { MaCD: this.objChuDe.MaCD }
                });

                console.log("Xóa thành công:", response.data);
                this.closeDeleteDialog();
                this.getChuDe();
            } catch (error) {
                console.error("Lỗi khi xóa chủ đề:", error);
                alert("Đã xảy ra lỗi khi xóa chủ đề.");
            }
        }
    },
};
</script>
