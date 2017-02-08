import React, {PropTypes, Component} from 'react';

import './HelloWorldPage.css';

const defaultProps = {
    initialName: 'Аноним'
};

class HelloWorldPage extends Component {
    constructor(props) {
        super(props);

        // this.handleNameChange = this.handleNameChange.bind(this);
        // this.renderGreetingWidget = this.renderGreetingWidget.bind(this);

        this.propTypes = {
            initialName: PropTypes.string
        };

        this.state = {
            name: this.props.initialName,
            touched: false,
            greetingWidget: () => null
        };
    }

    handleNameChange = (val) => {
        const name = val.target.value;

        this.setState({touched: true});

        if (name.length === 0) {
            this.setState({name: this.props.initialName});
        } else {
            this.setState({name});
        }
    }

    renderGreetingWidget = () => {
        if (!this.state.touched) {
            return null;
        }

        return (
            <div>
                <hr />
                <p>Здравствуйте, {this.state.name}!</p>
            </div>
        );
    }

    render() {
        return (
            <div className='App'>
                <h1>Hello World!</h1>
                <div>
                    <p>Введите Ваше имя или фамилию:</p>
                    <div><input onChange={this.handleNameChange}/></div>
                    {this.renderGreetingWidget()}
                </div>
            </div>
        );
    }
}

export default HelloWorldPage;