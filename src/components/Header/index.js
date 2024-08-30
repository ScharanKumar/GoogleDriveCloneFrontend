import { Component } from "react";
import "./index.css"
import { IoSearch } from "react-icons/io5";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie"

class Header extends Component {
    y = () => {
        const { history } = this.props
        Cookies.remove('jwt_token')
        Cookies.remove("name")
        history.replace('/login')
    }
    render() {
        return (
            <div className="header-container">
                <img className="logo" alt="GoogleDriveImage" src="https://seeklogo.com/images/G/google-drive-logo-B74AC1144D-seeklogo.com.png" />
                <div className="header-container1">
                    <IoSearch className="searchIcon" />
                    <input placeholder="Search in Drive" className="headerinput" type="search" />
                    <TbAdjustmentsHorizontal className="searchIcon" />
                </div>
                <button className="logout-button" onClick={this.y}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Header)