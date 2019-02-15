<template>
    <q-page padding class="docs-input row justify-center">
        <q-btn icon="create" label="Novo Time"  @click.native="$router.push('/times/add')" />
        <q-page class="flex flex-center">
            <q-card v-for="i in 5" :key=i inline color="secondary" dark class="q-ma-sm">
                <q-card-title>
                    Time {{ i }}
                    <span slot="subtitle">Subtitulo</span>
                    <q-icon slot="right" name="alarm" />
                </q-card-title>
                <q-card-main>
                    Texto
                </q-card-main>
                <q-card-separator />
                <q-card-actions>
                    <q-btn flat>Verificar</q-btn>
                    <q-btn flat>Cancelar</q-btn>
                </q-card-actions>
            </q-card>
        </q-page>
    </q-page>
</template>
