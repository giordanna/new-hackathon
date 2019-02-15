<template>
  <div padding class="docs-input row justify-center">
    
    
    <q-page>
      <h6>Time 1: {{ score }}</h6>
      <br>
      <q-progress
        :percentage="score / total * 100"
        color="warning"
        animate
        stripe
        height="20px"
      />
      <br>
      <h6>Time 2: 100</h6>
      <br>
      <q-progress
        :percentage="100 / total * 100"
        color="info"
        animate
        stripe
        height="20px"
      />
      <q-card v-for="card in cards" style="width: 300px" :key="card.id" inline color="secondary" dark class="q-ma-sm">
        <q-card-title>
          {{ card.titulo }}
          <span slot="subtitle">{{ card.subtitulo }}</span>
          <q-icon slot="right" :name="!card.checkout ? 'alarm' : 'check_circle'" />
        </q-card-title>
        <q-card-main>
          {{ card.pontuacao }} pontos
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
          <q-btn flat :disabled="card.checkout" @click.native="finalizar(card)">Feito</q-btn>
          <q-btn flat @click.native="$router.push('/cards/' + card.id) + '/edit'">Editar</q-btn>
          <q-btn flat @click.native="excluir(card.id)">Excluir</q-btn>
        </q-card-actions>
      </q-card>
    </q-page>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  computed: {
    cards() {
      return this.$store.getters.cards
    },
    score() {
      return this.$store.getters.score
    },
    total() {
      let soma = 0
      this.cards.map( card => soma += card.pontuacao )
      console.log(soma)
      return soma
    }
  },
  mounted() {
    this.$store.dispatch('getCards')
      .then(() => {
        this.$store.dispatch('getScore')
      })
  },
  methods: {
    finalizar(card) {
      this.$store.dispatch("updateCard", {
        id: card.id,
        titulo: card.titulo,
        subtitulo: card.subtitulo,
        pontuacao: card.pontuacao,
        checkout: true
      })
    },
    excluir(id) {
      this.$store.dispatch("deleteCard", id)
    }
  }
}
</script>
