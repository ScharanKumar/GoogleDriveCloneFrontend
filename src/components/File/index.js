import { Component } from "react";
import axios from "axios"
import "./index.css"
import Cookies from "js-cookie"
import { IoMdContact } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";

class File extends Component {
    state = { pop: false, pop1: false, input: "" }
    rename1 = () => {
        this.setState((prevState) => ({ pop1: !prevState.pop1 }))
        this.setState((prevState) => ({ pop: !prevState.pop }))
    }
    rename2 = () => {
        this.setState((prevState) => ({ pop1: !prevState.pop1 }))
    }

    renaming = () => {
        const username = Cookies.get("name")
        const { id1, details, fetchFiles } = this.props
        const { id } = details
        const { input } = this.state
        const data = {
            "name": `${input}`,
            "id": `${id}`,
            "username": `${username}`
        }
        axios.put("https://googledriveclonebackend-lmpx.onrender.com/update/files", data)
            .then(response => {
                console.log(response)

                fetchFiles(id1);

                this.setState((prevState) => ({ pop1: !prevState.pop1 }))


            })
            .catch(error => {
                console.error("There was an error fetching the files!", error);
            });
    }


    componentDidMount() {
        const { details } = this.props
        const { name } = details
        this.setState({ input: name })
    }

    input = (event) => {
        this.setState({ input: event.target.value })
    }

    popup = () => {
        this.setState((prevState) => ({ pop: !prevState.pop }))
    }

    render() {
        const { details } = this.props
        const { pop, pop1, input } = this.state
        const { path, created_at, name } = details
        const created_at1 = new Date(created_at)
        const year = created_at1.getFullYear()
        const date = created_at1.getDate()
        const month = created_at1.toLocaleString('en-US', { month: 'short' });
        const opened = date + " " + month + " " + year
        return (
            <li className="file-container0">
                <div className="file-container">
                    {pop1 &&
                        <div className="file-modal-backdrop">
                            <div className="file-modal1">
                                <div className="file-modal-header">
                                    <h4 className="head-folder">Rename file</h4>

                                </div>
                                <input className="input-folder1" type="text" value={input} onChange={this.input} placeholder="Enter name you want" />

                                <div className="folder-buttons">
                                    <button onClick={this.rename2} className="file-modal-close-button folder-but">Cancel</button>
                                    <button onClick={this.renaming} className="but1 folder-but"> Rename</button>
                                </div>


                            </div>
                        </div>}
                    {pop &&

                        <div className="file-modal">
                            <div className="file-modal-header">
                                <h4>Menu bar</h4>
                                <button onClick={this.popup} className="file-modal-close-button">X</button>
                            </div>
                            <button onClick={this.rename1} className="file-rename-button">Rename</button>

                        </div>}
                    <div className="file">
                        <FaRegFileAlt className="me-icon" />
                        <a href={`http://localhost:3030/${path}`} className="anchor" target="_blank" rel="noopener noreferrer">
                            {name}
                        </a>
                    </div>
                    <div className="me-section">
                        <IoMdContact className="contact-icon" />
                        <p className="anchor">Me</p>
                    </div>
                    <div className="date-cont">
                        <p className="anchor">{opened}</p>
                    </div>
                    <div className="file-size">
                        <hr className="horizon" />
                    </div>
                    <div >
                        <IoMdMore onClick={this.popup} className="me-icon" />
                    </div>
                </div>
                <hr className="horizontal-file" />

            </li>
        )
    }
}


export default File