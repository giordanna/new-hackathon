<template>
    <q-page padding class="docs-input row justify-center">
        <div style="width: 500px; max-width: 90vw;">
            <h5>Adicionar Carta</h5>
            <q-input v-model="carta.titulo" type="text" float-label="Título" />
            <q-input v-model="carta.subtitulo" type="text" float-label="Subtítulo" />
            <q-input v-model="carta.pontuacao" type="number" float-label="Pontuação" :step="2" suffix="pontos" />
            <br>
            <q-btn icon="create" label="Nova Carta" class="primary" :disabled="disabled" @click.native="enviar" />
            <q-btn tag="q-btn" label="Cancelar" @click.native="$router.push('/')" />
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            carta: {
                titulo: '',
                subtitulo: '',
                pontuacao: 0
            }
        }
    },
    computed: {
        disabled() {
            return this.carta.titulo === '' || this.carta.subtitulo === '' || this.carta.pontuacao === 0
        }
    },
    methods: {
        enviar() {
            this.$store.dispatch('addCard', this.carta)
            this.$router.push('/')
        }
    }
}
</script>
