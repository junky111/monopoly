import React, { Component, PropTypes } from 'react';

// let stateComp = React.createClass({
//     propTypes : {
//         name : React.PropTypes.string
//     },
//     getDefaultProps : function(){
//         return {
//             name : "Mike"
//         }
//     },
//     getInitialState : function(){
//         return {
//             value : 1
//         }
//     },
//     render : function(){
//         return (
//             <div>
//                 {this.state.value}
//             </div>
//         )
//     }
// });
//

class MyComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Component shouldComponentUpdate children!');
        return true;
    }

    render() {
        return <p>
            Test
        </p>
    }
}

export default class Test extends Component {
//     constructor(){
//         super();
//         this.state ={data: 'testing'};
//     }
//     buttonClick(){
//         this.setState({data: 'Mjhos'});
//     }
//     render(){
//         return <div>
//             <button onClick={this. buttonClick.bind(this)}>Click Me!</button>
//         </div>
//     }
// }
// React.render(<App/>,document.getElementById('app'));
    constructor() {
        super();
        this.state = {
            status: 'no status',
            data: [
                {
                    product: "test1",
                    price: 100
                },
                {
                    product: "test2",
                    price: 200
                },
                {
                    product: "test3",
                    price: 300
                }
            ]
        };
    }
    handleClick = () => {
        this.setState({status: 'I am fine!'});
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Component shouldComponentUpdate parent!!');
        return true;
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <MyComponent/>
                click me
                <ul>{this.state.data.map( (item, index) => (
                    <li key={index}>
                        <p>{item.product} =</p>
                        <p> ${item.price}</p>
                    </li>
                ))}
                </ul>
            </div>
        );
    }
}
//
// let DefaultComp = React.createClass({
//     getDefaultProps : function(){
//         return {
//             name : "Mike"
//         }
//     },
//     render : function(){
//         return (
//             <p>Hello {this.props.name}</p>
//         )
//     }
// });
//
// DefaultComp.propTypes = {
//     name: React.PropTypes.string
// };
// DefaultComp.defaultProps = {
//     name: 'My name'
// };
