import React, {Component} from "react";
import PackageList from "./PackageList";
import MyOrders from "./MyOrders";
import OrderStepper from "./OrderStepper";


class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.showPackageList ? (
                <PackageList/>
                // <OrderStepper/>
            ) : (
                <MyOrders/>
            )
        )
    }
}

export default Main;