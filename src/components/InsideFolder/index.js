import React, { Component } from "react";
import "./index.css"
import Leftbar from "../Leftbar";
import Cookies from "js-cookie"
import Folder from "../Folder"
import File from "../File"
import axios from "axios";
import Header from "../Header";
import HeaderInside from "../HeaderInside";

class InsideFolder extends Component {
    // state={files:[],folders:[],id1:"", pop:false,name:""}
    constructor(props) {
        super(props);
        this.todoDrag = React.createRef(); // Create a ref
        this.todoDragOver = React.createRef();
        this.state = { files: [], folders: [], id1: null, isPanelVisible: false }

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



    // componentDidUpdate(prevProps) {
    //     // When the route changes (e.g., when the userId changes), update the state
    //     if (this.props.match.params.id !== prevProps.match.params.id) {
    //       this.setState({
    //         id1: this.props.match.params.id
    //       });
    //     }
    //   }

    // rename=(id,name1)=>{
    //     console.log("rename"+id)
    //     console.log("rename"+name1)
    //     this.setState({pop:true,name:name1,id1:id})
    // }

    componentDidMount() {

        const { match } = this.props
        const { params } = match
        const { id } = params

        this.fetchFiles(id);
        this.setState({ id1: id })

    }

    changeId1 = (id1) => {
        console.log("folder" + id1)
        this.fetchFiles(id1)
        this.setState({ id1: id1 })

    }

    fetchFiles = (id) => {
        console.log("printing id" + id)



        const username = Cookies.get("name");
        console.log("username" + username)
        // https://googledriveclonebackend-lmpx.onrender.com
        // http://localhost:3030

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
    // nameChange=(event)=>{
    //     this.setState({name:event.target.value})
    // }

    // updateName=()=>{
    //     const {name,id1}=this.state
    //     const data={
    //         "name":`${name}`,
    //         "id":`${id1}`
    //     }
    //     axios.put("http://localhost:3031/update/folder",data)
    //         .then(response => {
    //             console.log(response)
    //             // const {id}=this.state
    //     this.fetchFiles(id1);

    //             this.setState((prevState)=>({pop:!prevState.pop}))

    //         })
    //         .catch(error => {
    //             console.error("There was an error fetching the files!", error);
    //         });
    // }

    // modal=()=>{

    //     this.setState((prevState)=>({pop:!prevState.pop}))
    // }
    showPanel = () => {
        this.setState({ isPanelVisible: true });
    }

    hidePanel = () => {
        this.setState({ isPanelVisible: false });
    }

    render() {
        const { files, folders, id1 } = this.state
        console.log(id1 + "id")
        const x = (files.length > 0) ? true : false
        const y = (folders.length > 0) ? true : false
        const z = (x === false && y === false) ? true : false
        return (
            <div className="drive-container">
                <Header />
                <div className="drive-container1">
                    {/* {pop &&
                <div className="modal-backdrop">
                <div className="modal">
                    <div className="modal-header">
                        <h4>Menu bar</h4>
                        <button onClick={this.modal} className="modal-close-button">X</button>
                    </div>
                    <input value={name} type="text" onChange={this.nameChange} />
                <button onClick={this.updateName}>Update</button>
                        
                    
                    
                </div>
            </div>} */}
                    <div className={`leftbar-cont left-panel${this.state.isPanelVisible ? 'visible' : ''}`} onMouseEnter={this.showPanel}
                        onMouseLeave={this.hidePanel}>
                        <Leftbar fetchFiles={this.fetchFiles} folder_id={this.state.id1} />

                    </div>
                    <div className="actual-container">
                        <HeaderInside />

                        <div className="content">
                            {y &&
                                <ul className="folder-container">
                                    {folders.map((every, index) => (
                                        <div draggable droppable onDragStart={e => this.D_start(e, index)} onDragEnter={e => this.D_enter(e, index)} onDragEnd={e => this.D_end(e, index)} className="file-container">
                                            <Folder id1={this.state.id1} fetchFiles={this.fetchFiles} details={every} key={every.id} changeId1={this.changeId1} rename={this.rename} />
                                        </div>
                                    ))}
                                </ul>
                            }
                            {x &&
                                <div className="file-container">
                                    {files.map((every, index) => (
                                        <div draggable droppable onDragStart={e => this.D_start(e, index)} onDragEnter={e => this.D_enter(e, index)} onDragEnd={e => this.D_end1(e, index)} className="file-container">
                                            <File id1={this.state.id1} fetchFiles={this.fetchFiles} details={every} key={every.id} rename={this.rename} />
                                        </div>
                                    ))}
                                </div>
                            }

                            {z &&
                                <img src="http://localhost:3030/uploads/Asset%201%2011xbookhub.png" className="img-nothing" alt="NothingIsPresent" />}
                        </div>


                    </div>
                </div>
            </div>

        )
    }
}

export default InsideFolder