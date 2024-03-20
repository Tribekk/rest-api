<template>
    <h1>Доски</h1>
    <form @submit.prevent="addNewDesk">
        <div class="form-group">
            <input
                type="text"
                class="form-control"
                placeholder="Название доски"
                v-model="name"
            />
        </div>
        <button class="btn btn-primary mt-3">Добавить</button>
    </form>
    <div class="alert alert-danger mt-3" role="alert" v-if="errored">
        <h5>Ошибка загрузки данных!</h5>
        <p>{{ errors[0] }}</p>
    </div>
    <div
        class="spinner-border"
        style="width: 5rem; height: 5rem"
        role="status"
        v-if="loading"
    >
        <span class="visually-hidden">Загрузка...</span>
    </div>
    <div class="row">
        <div class="col-lg-4" v-for="desk in desks" v-bind:key="desk">
            <div class="card mt-3">
                <router-link
                    class="card-body"
                    :to="{ name: 'ShowDesk', params: { deskId: desk.id } }"
                >
                    <h4 class="card-title">{{ desk.name }}</h4>
                </router-link>
                <button
                    type="button"
                    class="btn btn-danger mt-3"
                    @click="deleteDesk(desk.id)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            desks: [],
            errored: false,
            loading: true,
            name: null,
        };
    },
    mounted() {
        this.getAllDesks();
    },
    methods: {
        getAllDesks() {
            axios
                .get("/api/desks")
                .then((response) => {
                    this.desks = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        deleteDesk(id) {
            if (confirm("Удалить доску?")) {
                axios
                    .post("/api/desks/" + id, {
                        _method: "DELETE",
                    })
                    .then((response) => {
                        this.desks = [];
                        this.getAllDesks();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        addNewDesk() {
            axios
                .post("/api/desks", {
                    name: this.name,
                })
                .then((response) => {
                    this.name = "";
                    this.desks = [];
                    this.getAllDesks();
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data.errors.name) {
                        this.errors = [];
                        this.errors.push(error.response.data.errors.name[0]);
                    }
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
