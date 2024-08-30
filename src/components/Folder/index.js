import { Component } from "react";
import axios from "axios"
import "./index.css"
import { FaFolder } from "react-icons/fa6";
import Cookies from "js-cookie"
import { IoMdContact } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";

class Folder extends Component {

    // state={pop:false,pop1:false,input:"",color1:"black", pop2:false}

    constructor(props) {
        super(props);
        this.state = {
            clickTimeout: null,
            x: false,
            pop: false, pop1: false, input: "", color1: "black", pop2: false
            // To store the timeout for the click event
        };
        this.handleClick = this.handleClick.bind(this);
    }

    // Method to handle clicks
    handleClick = () => {
        console.log(this.state.x)
        if (this.state.x) {
            // If there's a timeout set, clear it and consider it a double-click
            clearTimeout(this.state.clickTimeout);
            const { changeId1, details } = this.props
            const { id } = details
            changeId1(id)
            this.setState({ clickTimeout: null });
            //   this.handleDoubleClick(); // Handle double-click event
        } else {
            console.log(this.state.x)
            this.setState((prevState) => ({ x: !prevState.x }))
            // If no timeout, set one and wait to see if another click happens
            this.setState({
                clickTimeout: setTimeout(() => {
                    // console.log(this.state.x)
                    //   this.handleSingleClick(); // Handle single-click event if no second click occurs
                    this.setState({ clickTimeout: null });
                }, 250), // 250ms is a typical threshold for a double-click
            });
        }
    }

    rename1 = () => {
        this.setState((prevState) => ({ pop1: !prevState.pop1 }))
        this.setState((prevState) => ({ pop: !prevState.pop }))

    }
    rename2 = () => {
        this.setState((prevState) => ({ pop1: !prevState.pop1 }))


    }
    // componentDidMount(){
    //     const { details } = this.props
    // const {  color } = details
    //     this.setState({color1:color})
    // }

    renaming = () => {
        const username = Cookies.get("name")
        const { id1, details, fetchFiles } = this.props
        const { id } = details
        const { input } = this.state
        console.log("RenamingFolder" + id1)
        const data = {
            "name": `${input}`,
            "id": `${id}`,
            "username": `${username}`
        }
        axios.put("https://googledriveclonebackend-lmpx.onrender.com/update/folder", data)
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
        const { color, name } = details
        console.log("COLOR" + color)
        this.setState({ input: name })
        this.setState({ color1: color })
    }

    input = (event) => {
        this.setState({ input: event.target.value })
    }

    popup = () => {
        this.setState((prevState) => ({ pop: !prevState.pop }))
    }
    color = () => {
        this.setState((prevState) => ({ pop2: !prevState.pop2 }))
    }
    changeId = () => {
        const { changeId1, details } = this.props
        const { id } = details
        changeId1(id)
    }

    boxClick = () => {
        const username = Cookies.get("name")
        const { details, fetchFiles } = this.props
        const { id } = details
        const color = "rgb(197, 182, 232)"
        const data = {
            "color": `${color}`,
            "id": `${id}`,
            "username": `${username}`
        }
        axios.put("https://googledriveclonebackend-lmpx.onrender.com/update/folder/color", data)
            .then(response => {
                console.log(response)
                const { id } = this.state
                fetchFiles(id);

                this.setState((prevState) => ({ pop2: !prevState.pop2 }))

            })
            .catch(error => {
                console.error("There was an error fetching the files!", error);
            });
        this.setState({ bgColor: "rgb(197, 182, 232)" })
        window.location.reload()
    }
    boxClick1 = () => {
        const username = Cookies.get("name")
        const { details, fetchFiles } = this.props
        const { id } = details
        const color = "rgb(225, 225, 166)"
        const data = {
            "color": `${color}`,
            "id": `${id}`,
            "username": `${username}`
        }
        axios.put("https://googledriveclonebackend-lmpx.onrender.com/update/folder/color", data)
            .then(response => {
                console.log(response)
                const { id } = this.state
                fetchFiles(id);

                this.setState((prevState) => ({ pop2: !prevState.pop2 }))

            })
            .catch(error => {
                console.error("There was an error fetching the files!", error);
            });
        this.setState({ bgColor: "rgb(225, 225, 166)" })
        window.location.reload()
    }
    boxClick2 = () => {
        const username = Cookies.get("name")
        const { details, fetchFiles } = this.props
        const { id } = details
        const color = "rgb(234, 207, 228)"
        const data = {
            "color": `${color}`,
            "id": `${id}`,
            "username": `${username}`
        }
        axios.put("https://googledriveclonebackend-lmpx.onrender.com/update/folder/color", data)
            .then(response => {
                console.log(response)
                const { id } = this.state
                fetchFiles(id);

                this.setState((prevState) => ({ pop2: !prevState.pop2 }))

            })
            .catch(error => {
                console.error("There was an error fetching the files!", error);
            });
        this.setState({ bgColor: "rgb(234, 207, 228)" })
        window.location.reload()
    }
    boxClick3 = () => {
        const username = Cookies.get("name")
        const { details, fetchFiles } = this.props
        const { id } = details
        const color = "rgb(178, 221, 198)"
        const data = {
            "color": `${color}`,
            "id": `${id}`,
            "username": `${username}`
        }
        axios.put("https://googledriveclonebackend-lmpx.onrender.com/update/folder/color", data)
            .then(response => {
                console.log(response)
                const { id } = this.state
                fetchFiles(id);

                this.setState((prevState) => ({ pop2: !prevState.pop2 }))

            })
            .catch(error => {
                console.error("There was an error fetching the files!", error);
            });
        this.setState({ bgColor: "rgb(178, 221, 198)" })
        window.location.reload()
    }

    render() {
        const { details } = this.props
        const { pop, pop1, pop2, input } = this.state
        const { id, created_at, name } = details
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
                                    <h4 className="head-folder">Rename folder</h4>

                                </div>
                                <input className="input-folder1" type="text" value={input} onChange={this.input} placeholder="Enter name you want" />

                                <div className="folder-buttons">
                                    <button onClick={this.rename2} className="file-modal-close-button folder-but">Cancel</button>
                                    <button onClick={this.renaming} className="but1 folder-but"> Rename</button>
                                </div>


                            </div>
                        </div>}
                    {pop &&
                        // <div className="modal-backdrop">
                        <div className="file-modal">
                            <div className="file-modal-header">
                                <h4>Menu bar</h4>
                                <button onClick={this.popup} className="file-modal-close-button">X</button>
                            </div>
                            <button onClick={this.rename1} className="file-rename-button">Rename</button>

                        </div>}
                    {pop2 &&
                        // <div className="modal-backdrop">
                        <div className="folder-modal">
                            <div className="file-modal-header">
                                <h4>Menu bar</h4>
                                <button onClick={this.color} className="file-modal-close-button">X</button>
                            </div>
                            <div className="colors">
                                <div className="l" onClick={this.boxClick3}>

                                </div>
                                <div className="x" onClick={this.boxClick}>

                                </div>
                                <div className="y" onClick={this.boxClick1}>

                                </div>
                                <div className="z" onClick={this.boxClick2}>
                                    {/* <p>hi</p> */}
                                </div>
                            </div>


                        </div>}
                    <div className="file">
                        <FaFolder style={{ color: this.state.color1 }} className="me-icon" onClick={this.color} />
                        <Link className="folder-click" to={`/folder/${id}`}>
                            <p onClick={this.changeId} className="anchor">{name}</p>
                        </Link>
                        {/* <a href={`http://localhost:3030/${path}`} className="anchor" target="_blank" rel="noopener noreferrer">
                    {name}
                </a> */}
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


export default Folder

