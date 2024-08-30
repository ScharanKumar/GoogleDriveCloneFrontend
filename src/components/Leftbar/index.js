import { Component } from "react";
import "./index.css"
import Cookies from "js-cookie"
import { FaPlus } from "react-icons/fa6";
import { MdHomeFilled } from "react-icons/md";
import { SiGoogledrive } from "react-icons/si";
import { FaComputer } from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlineUploadFile } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { PiFolderPlus } from "react-icons/pi";
import { Link } from "react-router-dom"
import axios from "axios"




class Leftbar extends Component {
    state = { pop: false, selectedFile: null, create: "", pop1: false }

    // componentDidMount() {
    //     // Add click event listener to the document
    //     // document.addEventListener('mousedown', this.handleClickOutside);
    //   }
    
    //   componentWillUnmount() {
    //     // Remove click event listener from the document
    //     document.removeEventListener('mousedown', this.handleClickOutside);
    //   }
    
    //   handleClickOutside = (event) => {
    //     // Check if the click is outside the element
    //     if (this.state.wrapperRef.current && !this.state.wrapperRef.current.contains(event.target)) {
    //         this.setState((prevState) => ({ pop: !prevState.pop }))
    //       // You can add your custom logic here, e.g., closing a modal
    //     }
    //   };

    onFileChange = (event) => {
        console.log("Baby" + this.props.folder_id)
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        const { folder_id, fetchFiles } = this.props
        const date = new Date()
        const username = Cookies.get("name")

        const formData = new FormData();

        formData.append("file", this.state.selectedFile);

        axios.post(`https://googledriveclonebackend-lmpx.onrender.com/upload/${folder_id}/${date}/${username}`, formData)
            .then(response => {

                this.setState({ selectedFile: null });
                this.setState((prevState) => ({ pop: !prevState.pop }))
                fetchFiles(this.props.folder_id)

            })
            .catch(error => {
                console.error("There was an error uploading the file!", error);
            });
    };

    createFolder = () => {
        const { create } = this.state
        const username = Cookies.get("name");
        const { folder_id, fetchFiles } = this.props
        const created_at = new Date()
        const color = "black"
        const data = {
            "username": `${username}`,
            "name": `${create}`,
            "parent_id": `${folder_id}`,
            "color": `${color}`,
            "created_at": `${created_at}`

        }

        axios.post("https://googledriveclonebackend-lmpx.onrender.com/folders", data)
            .then(response => {
                this.setState({ create: "" });
                fetchFiles(this.props.folder_id)
                this.setState((prevState) => ({ pop1: !prevState.pop1 }))
                // this.setState((prevState)=>({pop:!prevState.pop}))
            })
            .catch(error => {
                console.error("There was an error uploading the file!", error);
            });

    }

    change = (event) => {
        this.setState({ create: event.target.value })
    }

    creating = () => {
        this.setState((prevState) => ({ pop1: !prevState.pop1 }))
        // this.setState((prevState)=>({pop:!prevState.pop}))
    }

    modal = () => {
        this.setState((prevState) => ({ pop: !prevState.pop }))
        
    }
    folder_name = (event) => {
        this.setState({ create: event.target.value })
    }
    render() {
        const { pop, create, pop1 } = this.state
        return (

            <div className="leftbarCon1">
                {pop &&
                    // <div className="modal-backdrop">
                    <div className="left-modal" >
                        <div className="modal-header">
                            <h4>Menu bar</h4>
                            <button onClick={this.modal} className="modal-close-button">X</button>
                        </div>
                        <div className="input-file-container">
                            <input type="file" onChange={this.onFileChange} />
                            <div className="file-upload">
                                <MdOutlineUploadFile className="addition-icon" />
                                <button className="but1" onClick={this.onFileUpload}>File upload</button>
                            </div>
                        </div>


                        <hr className="horizontal" />
                        <div className="input-file-container1" onClick={this.creating}>
                            <PiFolderPlus className="addition-icon" />
                            <button onClick={this.modal} className="but1"> New Folder</button>
                        </div>


                    </div>}

                {pop1 &&
                    <div className="modal-backdrop">
                        <div className="modal1">
                            <div className="modal-header">
                                <h4 className="head-folder">New Folder</h4>

                            </div>
                            <input className="input-folder1" type="text" value={create} onChange={this.folder_name} placeholder="Enter folder name" />

                            <div className="folder-buttons">
                                <button onClick={this.creating} className="modal-close-button folder-but">Cancel</button>
                                <button onClick={this.createFolder} className="but1 folder-but"> Create</button>
                            </div>


                        </div>
                    </div>}
                <div onClick={this.modal} className="adding-container">
                    <FaPlus className="addition-icon" />
                    <button className="but1" >New</button>
                </div>
                <Link to="/" className="adding-container1">
                    <MdHomeFilled className="addition-icon1" />
                    <span className="but-none">Home</span>
                </Link>
                <Link to="/drive" className="adding-container1">
                    <SiGoogledrive className="addition-icon2" />
                    <span className="but-none">My drive</span>
                </Link>
                <div className="adding-container1">
                    <FaComputer className="addition-icon1" />
                    <button className="but-none">Computers</button>

                </div>
                <div className="adding-container2">
                    <MdOutlinePeopleAlt className="addition-icon1" />
                    <button className="but-none">Shared with me</button>
                </div>
                <div className="adding-container1">
                    <FaRegClock className="addition-icon1" />
                    <button className="but-none">Recent</button>

                </div>
            </div>
        )
    }
}

export default Leftbar