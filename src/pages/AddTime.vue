<template>
    <q-page padding class="docs-input row justify-center">
        <div style="width: 500px; max-width: 90vw;">
            <h5>Adicionar Time</h5>
            <q-input type="text" float-label="Nome" />
            <q-input type="text" float-label="Subtítulo" />
            <q-input float-label="Conteúdo" type="textarea" />
            <br>
            <q-btn icon="create" label="Novo Time" />
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            nome: ''
        }
    }
}
</script>
