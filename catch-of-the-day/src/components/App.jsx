import React from "react";
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from "./Fish"

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

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
        // 1. take a copy of state
        // 2. Either add to order or update the number in our order
        // 3. Update our state object
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
                <Order />
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

