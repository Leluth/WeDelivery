import React, {Component} from "react";
import PackageList from "./PackageList";
import MyOrders from "./MyOrders";

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.showPackageList ? (
                <PackageList signal={this.props.signal}/>
            ) : (
                <MyOrders/>
            )
        )
    }
}

export default Main;