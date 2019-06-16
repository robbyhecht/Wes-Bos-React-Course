import React from "react";
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from "./Fish"
import base from '../base'

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const { params } = this.props.match
        //  first reinstate our local storage
        const localStorageRef = localStorage.getItem(params.storeId)
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)})
        }
        // ref is a reference to a piece of data in the datatbase
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    // *
    addFish = fish => {
        // **
        const fishes = { ...this.state.fishes }; // ... is an object spread
        fishes[`fish${Date.now()}`] = fish; // Date.now provides a unique identifier
        this.setState({ fishes }); // fishes:fishes is unnecesary in ES6
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes })
    };

    addToOrder = key => {
        // ***
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                                index={key}
                            />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        )
    }
}

export default App;

// * methods that update state must live in the same component as the state they are updating

// ** steps for updating state:
//  1. Take a copy of the existing state (don't want to modify state directly- this would be a mutation)
 // 2. Add out new fish to the fishes variable
 // 3. Set the new fishes object to state

// ***
// 1. take a copy of state
// 2. Either add to order or update the number in our order
// 3. Update our state object