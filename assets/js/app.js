/* global document */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    value: '',
    calc: '',
};

const mutations = {
    eval (st) {
        try {
            st.value = (`${(new Function(`return ${st.calc}`))()}`).trim(); // eslint-disable-line no-new-func
        } catch (e) {}
        // I don't care about failures. Don't update the view
    },
    input (st, evt) {
        const val = evt.target.value || '';
        st.calc = (`${st.calc}${val}`).trim();
        mutations.eval(st);
        Vue.nextTick(() => {
            const calcEl = document.querySelector('.calc .scroll');
            calcEl.scrollLeft = calcEl.scrollWidth * 2;
        });
    },
    clear (st) {
        st.value = '';
        st.calc = '';
    },
};

const calc = {
    render (h) {
        return (
            <div class="calculator">
                <div class="value">
                    <div class="scroll">
                        <div>{ this.value }</div>
                    </div>
                </div>
                <div class="calc">
                    <div class="scroll">
                        <div>{ this.calcDisplay }</div>
                    </div>
                </div>
                <div class="pad">
                    <button value="7" on-click={this.input}>7</button>
                    <button value="8" on-click={this.input}>8</button>
                    <button value="9" on-click={this.input}>9</button>
                    <button value="*" on-click={this.input}>×</button>
                    <button value="4" on-click={this.input}>4</button>
                    <button value="5" on-click={this.input}>5</button>
                    <button value="6" on-click={this.input}>6</button>
                    <button value="/" on-click={this.input}>÷</button>
                    <button value="1" on-click={this.input}>1</button>
                    <button value="2" on-click={this.input}>2</button>
                    <button value="3" on-click={this.input}>3</button>
                    <button value="+" on-click={this.input}>+</button>
                    <button value="0" on-click={this.input}>0</button>
                    <button value="." on-click={this.input}>.</button>
                    <button on-click={this.clear}>C</button>
                    <button value="-" on-click={this.input}>−</button>
                </div>
            </div>
        );
    },
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

new Vue({
    el: '#app',
    render (h) { return <calc />; },
    components: {
        calc,
    },
    store: new Vuex.Store({
        state,
        mutations,
    }),
});
