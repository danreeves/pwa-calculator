/* globals document, requestAnimationFrame */

import React from 'react';
import Head from 'next/head';

class Calc extends React.Component {
    static async getInitialProps () {
        return {
            value: '',
            calc: '',
            calcDisplay: '',
        };
    }

    constructor (props) {
        super(props);

        this.state = { ...props };
        this.eval = this.eval.bind(this);
        this.input = this.input.bind(this);
        this.clear = this.clear.bind(this);
    }

    eval () {
        try {
            this.setState({
                value: (`${(new Function(`return ${this.state.calc}`))()}`).trim(),  // eslint-disable-line no-new-func
            });
        } catch (e) {}
        // I don't care about failures. Don't update the view
    }

    input (e) {
        const val = e.target.value || '';
        this.setState({ calc: (`${this.state.calc}${val}`).trim() }, () => {
            this.eval();
            this.setState({
                calcDisplay: this.state.calc
                    .replace(/[\s|\u00A0]*\+[\s|\u00A0]*/g, '\u00A0+\u00A0')
                    .replace(/[\s|\u00A0]*\-[\s|\u00A0]*/g, '\u00A0−\u00A0')
                    .replace(/[\s|\u00A0]*\*[\s|\u00A0]*/g, '\u00A0×\u00A0')
                    .replace(/[\s|\u00A0]*\/[\s|\u00A0]*/g, '\u00A0÷\u00A0')
                    .trim(),
            }, () => {
                const calcEl = document.querySelector('.calc .scroll');
                calcEl.scrollLeft = calcEl.scrollWidth * 2;
            });
        });
    }

    clear () {
        this.setState({
            value: '',
            calc: '',
            calcDisplay: '',
        });
    }

    render () {
        return (
            <div className="calculator">
                <Head>
                    <title>Calculator</title>
                    <link rel="stylesheet" type="text/css" href="/static/calc.css" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className="value">
                    <div className="scroll">
                        <div>{ this.state.value }</div>
                    </div>
                </div>
                <div className="calc">
                    <div className="scroll">
                        <div>{ this.state.calcDisplay }</div>
                    </div>
                </div>
                <div className="pad">
                    <button value="7" onClick={this.input}>7</button>
                    <button value="8" onClick={this.input}>8</button>
                    <button value="9" onClick={this.input}>9</button>
                    <button value="*" onClick={this.input}>×</button>
                    <button value="4" onClick={this.input}>4</button>
                    <button value="5" onClick={this.input}>5</button>
                    <button value="6" onClick={this.input}>6</button>
                    <button value="/" onClick={this.input}>÷</button>
                    <button value="1" onClick={this.input}>1</button>
                    <button value="2" onClick={this.input}>2</button>
                    <button value="3" onClick={this.input}>3</button>
                    <button value="+" onClick={this.input}>+</button>
                    <button value="0" onClick={this.input}>0</button>
                    <button value="." onClick={this.input}>.</button>
                    <button onClick={this.clear}>C</button>
                    <button value="-" onClick={this.input}>−</button>
                </div>
            </div>
        );
    }
}

Calc.propTypes = {
    value: React.PropTypes.string,
    calc: React.PropTypes.string,
    calcDisplay: React.PropTypes.string,
};

export default Calc;
