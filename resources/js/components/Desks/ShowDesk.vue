<template>
    <div class="container">
        <h1>{{ name }}</h1>
        <div class="form-group">
            <input
                type="text"
                v-model="name"
                @blur="saveName"
                class="form-control"
            />
        </div>
        <form @submit.prevent="addNewDesk">
            <div class="form-group mt-3">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Название списка"
                    v-model="desk_list_name"
                />
            </div>
            <button class="btn btn-primary mt-3">Добавить список</button>
        </form>
        <div class="row">
            <div
                class="col-lg-3"
                v-for="desk_list in desk_lists"
                v-bind:key="desk_list"
            >
                <div class="card mt-3">
                    <a href="#" class="card-body">
                        <h4 class="card-title">{{ desk_list.name }}</h4>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["deskId"],
    data() {
        return {
            name: null,
            errored: false,
            loading: true,
            desk_lists: true,
            desk_list_name: null,
        };
    },
    mounted() {
        axios
            .get("/api/desks/" + this.deskId)
            .then((response) => {
                this.name = response.data.data.name;
            })
            .catch((error) => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => {
                this.loading = false;
            });
        this.getDeskLists();
    },
    methods: {
        getDeskLists() {
            axios
                .get("/api/desk-lists", {
                    params: {
                        desk_id: this.deskId,
                    },
                })
                .then((response) => {
                    this.desk_lists = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        saveName() {
            axios
                .post("/api/desks/" + this.deskId, {
                    _method: "PUT",
                    name: this.name,
                })
                .then((response) => {})
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
