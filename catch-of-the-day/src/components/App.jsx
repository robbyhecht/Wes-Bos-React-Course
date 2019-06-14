import React from "react";
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'

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

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
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

