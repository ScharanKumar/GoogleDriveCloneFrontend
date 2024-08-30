import { Component } from "react";
import { IoMdMore } from "react-icons/io";
import { IoArrowUpOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import "./index.css"
class HeaderInside extends Component {
    render() {
        return (
            <li className="file-container0 fix">

                <div className="file-container">
                    <div className="file">
                        <p>Name</p>
                        <IoArrowUpOutline className="arrow-icon" />
                    </div>
                    <div className="me-section">

                        <p className="anchor">Owner</p>
                    </div>
                    <div className="date-cont">
                        <p className="anchor">Last Modified</p>
                        <MdArrowDropDown className="me-icon" />
                    </div>
                    <div className="file-size">
                        <p className="horizon1">File size</p>
                    </div>
                    <div >
                        <IoMdMore className="me-icon" />
                    </div>
                </div>
                <hr className="horizontal-file" />
            </li>
        )
    }
}
export default HeaderInside