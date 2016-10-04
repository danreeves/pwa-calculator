import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    value: '',
    calc: '',
};

const mutations = {
    eval (state) {
        try {
            state.value = (`${(new Function(`return ${state.calc}`))()}`).trim();
        } catch (e) {}
        // I don't care about failures. Don't update the view
    },
    input (state, val) {
        state.calc = (state.calc + `${val}`).trim();
        mutations.eval(state);
        Vue.nextTick(function () {
            document.querySelector('.calc .scroll').scrollLeft = 9999999;
        });
    },
    clear (state) {
        state.value = '';
        state.calc = '';
    }
};

const calc = {
    template: `
        <div class="calculator">
            <div class="value">
                <div class="scroll">
                    <div>{{ value }}</div>
                </div>
            </div>
            <div class="calc">
                <div class="scroll">
                    <div>{{ calcDisplay }}</div>
                </div>
            </div>
            <div class="pad">
                <button @click="input('7')">7</button>
                <button @click="input('8')">8</button>
                <button @click="input('9')">9</button>
                <button @click="input('*')">×</button>
                <button @click="input('4')">4</button>
                <button @click="input('5')">5</button>
                <button @click="input('6')">6</button>
                <button @click="input('/')">÷</button>
                <button @click="input('1')">1</button>
                <button @click="input('2')">2</button>
                <button @click="input('3')">3</button>
                <button @click="input('+')">+</button>
                <button @click="input('0')">0</button>
                <button @click="input('.')">.</button>
                <button @click="clear">C</button>
                <button @click="input('-')">−</button>
            </div>
        </div>
    `,
    computed: {
        calcDisplay () {
            return this.$store.state.calc
                .replace(/[\s|\u00A0]*\+[\s|\u00A0]*/g, '\u00A0+\u00A0')
                .replace(/[\s|\u00A0]*\-[\s|\u00A0]*/g, '\u00A0−\u00A0')
                .replace(/[\s|\u00A0]*\*[\s|\u00A0]*/g, '\u00A0×\u00A0')
                .replace(/[\s|\u00A0]*\/[\s|\u00A0]*/g, '\u00A0÷\u00A0')
                .trim();
        },
        ...Vuex.mapState([
            'value',
            'calc',
        ]),
    },
    methods: Vuex.mapMutations([
        'input',
        'eval',
        'clear',
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
