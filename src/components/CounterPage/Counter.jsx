import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import './Counter.css';

const defaultProps = {
    onClick: () => {},
    value: 0
};

class Counter extends Component {
    constructor(props) {
        super(props);

        this.propTypes = {
            onClick: PropTypes.func,
            value: PropTypes.number
        };
    }

    render() {
        const { onClick, value } = this.props;

        //for Upwork ReactJS test
        const button = React.createElement(
            Button,
            [{ type: "submit" }],
            "Save"
        );

        //for Upwork ReactJS test
        const form = React.createElement( "form",null, React.createElement("label",
            { htmlFor: "email" }, "Email:"
            ), React.createElement("input",
            { type: "email", id: "email", className: "form-control-id" } )
        );

        return (
            <div>
                <div className='counter-label'>
                    Value: {value}
                </div>
                <Button onClick={onClick}>+</Button>
                {button}
                {form}
            </div>
        );
    }
}

Counter.defaultProps = defaultProps;

export default Counter;