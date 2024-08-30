import React, { Component } from "react";
import "./index.css"
import Leftbar from "../Leftbar";
import Cookies from "js-cookie"
import Folder from "../Folder"
import File from "../File"
import axios from "axios";
import Header from "../Header"
import HeaderInside from "../HeaderInside";

class Drive extends Component {
    // state={files:[],folders:[],id:null, pop:false, id_change:"",name:""}
    constructor(props) {
        super(props);
        this.todoDrag = React.createRef(); // Create a ref
        this.todoDragOver = React.createRef();
        this.state = { files: [], folders: [], id: null, id_change: "", isPanelVisible: false }

    }

    D_start = (e, index) => {
        this.todoDrag.current = index
        console.log("start" + index)
    }
    D_enter = (e, index) => {
        this.todoDragOver.current = index
    }
    D_end = (e, index) => {
        const { folders } = this.state
        // console.log(files)
        console.log(this.todoDrag.current)
        console.log(this.todoDragOver.current)
        const x = [...folders]
        const item = x[this.todoDrag.current]
        x.splice(this.todoDrag.current, 1)
        x.splice(this.todoDragOver.current, 0, item)
        console.log(x)
        this.setState({ folders: x })
    }
    D_end1 = (e, index) => {
        const { files } = this.state
        console.log(files)
        console.log(this.todoDrag.current)
        console.log(this.todoDragOver.current)
        const x = [...files]
        const item = x[this.todoDrag.current]
        x.splice(this.todoDrag.current, 1)
        x.splice(this.todoDragOver.current, 0, item)
        console.log(x)
        this.setState({ files: x })
    }



    componentDidMount() {
        const { id } = this.state
        this.fetchFiles(id);

    }

    changeId1 = (id1) => {
        console.log("folder" + id1)
        this.fetchFiles(id1)
        this.setState({ id: id1 })

    }

    fetchFiles = (id) => {

        const username = Cookies.get("name");
        console.log("username" + username)

        axios.get(`https://googledriveclonebackend-lmpx.onrender.com/folders/${id}/${username}/contents`)
            .then(response => {
                console.log(response)
                this.setState({ files: response.data.res4, folders: response.data.res5 });
                console.log(response.data.res4)
            })
            .catch(error => {
                console.error("There was an error fetching the files!", error);
            });

    };

    showPanel = () => {
        this.setState({ isPanelVisible: true });
    }

    hidePanel = () => {
        this.setState({ isPanelVisible: false });
    }



    render() {
        const { files, folders, id } = this.state
        console.log(id + "id")
        const x = (files.length > 0) ? true : false
        const y = (folders.length > 0) ? true : false
        const z = (x === false && y === false) ? true : false
        return (
            <div className="drive-container">
                <Header />
                <div className="drive-container1">

                    <div className={`leftbar-cont left-panel${this.state.isPanelVisible ? 'visible' : ''}`} onMouseEnter={this.showPanel}
                        onMouseLeave={this.hidePanel}>

                        <Leftbar fetchFiles={this.fetchFiles} folder_id={id} />


                    </div>
                    <div className="actual-container">
                        <HeaderInside />
                        <div className="content">
                            {y &&
                                <ul className="folder-container">
                                    {folders.map((every, index) => (
                                        <div draggable droppable onDragStart={e => this.D_start(e, index)} onDragEnter={e => this.D_enter(e, index)} onDragEnd={e => this.D_end(e, index)} className="file-container">
                                            <Folder id1={this.state.id} fetchFiles={this.fetchFiles} details={every} key={every.id} changeId1={this.changeId1} rename={this.rename} />
                                        </div>
                                    ))}
                                </ul>
                            }
                            {x &&
                                <div className="file-container">
                                    {files.map((every, index) => (
                                        <div draggable droppable onDragStart={e => this.D_start(e, index)} onDragEnter={e => this.D_enter(e, index)} onDragEnd={e => this.D_end1(e, index)} className="file-container">
                                            <File id1={this.state.id} fetchFiles={this.fetchFiles} details={every} key={every.id} />
                                        </div>
                                    ))}
                                </div>
                            }
                            {z && <img src="http://localhost:3030/uploads/Asset%201%2011xbookhub.png" alt="NothingIsPresent" />}

                        </div>


                    </div>
                </div>
            </div>

        )
    }
}

export default Drive