<template>
  <div class="container is-widescreen landing">
    <div class="area has-text-centered preservefilter">
      <div class="columns is-vcentered fadeIn">
        <div class="column is-hidden-mobile"></div>
        <div class="column is-8 has-text-centered">
          <div class="notification is-danger is-light is-shadow content">
            <h5 class="has-text-danger"><span class="icon is-margin-right"><span class="fa fa-exclamation-triangle"></span></span>Estás viendo una versión antigua de <a href="https://flitz.herokuapp.com"><strong>Flitz Chess</strong></a></h5> 
            Te sugerimos usar la nueva versión cuenta con mayor funcionalidad y es multilenguaje.<br>Ajedrez En Vivo, sin embargo, quedará disponible cuando lo necesites. <a href="https://flitz.herokuapp.com"><strong>Ir a nueva versión</strong></a><br><small>@martin 10-6-20</small></div>
          <div class="content is-hidden-mobile">
            <h1 class="has-text-white"></a>Estudia, entrena y gana</h1>
            <h6></h6>
          </div>
          <div class="content is-hidden-tablet">
            <h2 class="has-text-white"></a>Estudia, entrena y gana</h2>
            <h6></h6>
          </div>
          <div class="has-text-centered">
            <form id="search" class="has-text-centered" @submit.prevent="submit">
              <label class="label">
                <span v-html="eco.name" class="has-text-light">
                </span>
              </label>
              <div class="field has-addons is-hidden-mobile is-flex-centered">
                <div class="control">
                  <input v-model="query" class="input is-medium is-white is-rounded" name="query" type="text" placeholder="Evento, jugador o PGN" autofocus>
                </div>
                <div class="control">
                  <button type="submit" id="searchbtn" class="button is-medium is-rounded is-white">
                    <span class="icon has-text-info">
                      <span class="fas fa-search"></span>
                    </span>
                  </button>
                </div>
              </div>
              <div class="field has-addons is-hidden-tablet is-flex-centered">
                <div class="control">
                  <input v-model="query" class="input is-rounded" name="query" type="text" placeholder="Evento, jugador o PGN" autofocus>
                </div>
                <div class="control">
                  <button type="submit" id="searchbtn" class="button is-rounded is-white">
                    <span class="icon has-text-info">
                      <span class="fas fa-search"></span>
                    </span>
                  </button>
                </div>
              </div>
            </form>     
          </div>       
          <div class="has-text-centered">
            <h4 class="has-text-white">Jugar contra</h4>
            <h6>&nbsp;</h6>
          </div>
          <div class="columns is-vcentered has-text-centered is-hidden-mobile">
            <div class="column has-text-right">
              <router-link class="button is-rounded is-medium is-success" to="/lobby">
                <span class="icon">
                  <span class="fas fa-user-circle"></span>
                </span> 
                <span>Humano</span>
              </router-link>    
            </div>
            <div class="column has-text-left">
              <router-link class="button is-rounded is-medium is-info" to="/stockfish">
                <span class="icon">
                  <span class="fas fa-server"></span>
                </span> 
                <span>Stockfish</span>
              </router-link>              
            </div>
          </div>
          <div class="columns is-vcentered has-text-centered is-hidden-tablet">
            <div class="column">
              <router-link class="button is-rounded is-success" to="/lobby">
                <span class="icon">
                  <span class="fas fa-user-circle"></span>
                </span> 
                <span>Humano</span>
              </router-link>    
            </div>
            <div class="column">
              <router-link class="button is-rounded is-info" to="/stockfish">
                <span class="icon">
                  <span class="fas fa-server"></span>
                </span> 
                <span>Stockfish</span>
              </router-link>              
            </div>
          </div>
        </div>
        <div class="column is-hidden-mobile"></div>
      </div>
      <ul class="pieces">
        <li class="black"></li>
        <li class="black"></li>
        <li class="black"></li>
        <li class="black"></li>
        <li class="black"></li>
        <li class="black"></li>
        <li class="white"></li>
        <li class="white"></li>
        <li class="white"></li>
        <li class="white"></li>
        <li class="white"></li>
        <li class="white"></li>
      </ul>
      <div class="fakeboard">
        <div class="board-b72b1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'landing',
  mounted: function() {
    var t = this
    const saved = JSON.parse(localStorage.getItem('player'))
    const board = document.querySelector('.fakeboard')

    if (board) {
      board.classList = []
      board.classList.add('fakeboard')
      if (saved) {
        board.classList.add(saved.board || 'classic')
      }
    }

    axios.post(this.$root.endpoint + '/eco/pgn/random', {}).then((res) => {
      if(res.data.pgn){
        t.eco = res.data
        t.query = res.data.pgn
      }
    })
    
    if (saved.pieces) {
      document.querySelectorAll('.pieces li').forEach(e => {
        let li = window.getComputedStyle(e)
        e.style.backgroundImage = li.getPropertyValue('background-image').replace('cburnett',saved.pieces)
      })
    }
  },
  computed: {
    ...mapState([
      'player'
    ])
  },
  methods: {
    submit: function() {
      this.$router.push('/results?q=' + this.query)
    }
  },
  data () {
    return {
      query: null,
      eco: {
        name:'...'
      }
    }
  }
}
</script>