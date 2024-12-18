<template>
    <div>
        <h1>Voeg een item toe</h1>
        <form @submit.prevent="addItem">
            <input v-model="name" placeholder="Naam" />
            <input v-model="value" placeholder="Waarde" />
            <button type="submit">Toevoegen</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            value: '',
            message: '',
        };
    },
    methods: {
        async addItem() {
            try {
                const response = await fetch('https://makermonitor.vercel.app/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: this.name, value: this.value }),
                });


                const data = await response.json();
                this.message = data.message || 'Item toegevoegd!';
            } catch (error) {
                console.error(error);
                this.message = 'Fout bij het toevoegen van het item.';
            }
        },
    },
};
</script>