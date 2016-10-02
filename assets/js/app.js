import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    value: 0,
    calc: '',
};

const mutations = {
    eval (state) {
        state.value = (new Function(`return ${state.calc}`))();
        state.calc = ''
    },
    input (state, val) {
        state.calc += `${val}`;
    },
};

const calc = {
    template: `
        <div>
            <div>{{ value }}</div>
            <div>{{ calc }}</div>
            <button @click="input('1')">1</button>
            <button @click="input('2')">2</button>
            <button @click="input('3')">3</button>
            <button @click="input('4')">4</button>
            <button @click="input('5')">5</button>
            <button @click="input('6')">6</button>
            <button @click="input('7')">7</button>
            <button @click="input('8')">8</button>
            <button @click="input('9')">9</button>
            <button @click="input('0')">0</button>
            <button @click="input(' + ')">+</button>
            <button @click="input(' - ')">-</button>
            <button @click="input(' / ')">/</button>
            <button @click="input(' * ')">*</button>
            <button @click="eval">=</button>
        </div>
    `,
    computed: Vuex.mapState([
        'value',
        'calc',
    ]),
    methods: Vuex.mapMutations([
        'input',
        'eval',
    ]),
};

const app = new Vue({
    el: '#app',
    template: '<calc></calc>',
    components: {
        calc,
    },
    store: new Vuex.Store({
        state,
        mutations,
    }),
});
