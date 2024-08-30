import React, { Component } from "react";
import Leftbar from "../Leftbar";
import Header from "../Header";
import "./index.css"
import Cookies from "js-cookie"
import File from "../File"
import axios from "axios"
import HeaderInside from "../HeaderInside";


class Home extends Component {
    constructor(props) {
        super(props);
        this.todoDrag = React.createRef(); // Create a ref
        this.todoDragOver = React.createRef();
        this.state = { files: [], id: null, isPanelVisible: false }

    }

    D_start = (e, index) => {
        this.todoDrag.current = index
        console.log("start" + index)
    }
    D_enter = (e, index) => {
        this.todoDragOver.current = index
    }
    D_end = (e, index) => {
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
    fetchFiles = (id) => {


        // const options1 = {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Accept: "application/json",

        //     }
        //   }
        //   const responsedata = await fetch("http://localhost:3030/files", options1)
        //   if (responsedata.ok===true){
        //     const y = await responsedata.json()
        //     console.log(y)
        //     this.setState({ files: y });
        //   }

        const username = Cookies.get("name");
        console.log("username" + username)

        axios.get(`https://googledriveclonebackend-lmpx.onrender.com/all/files/${username}`)
            .then(response => {
                console.log(response)
                this.setState({ files: response.data.res4 });
                console.log(response.data.res4)
            })
            .catch(error => {
                console.error("There was an error fetching the files!", error);
            });


        // axios.get('http://localhost:3030/files')
        //     .then(response=>{return response.json()})
        //     .then(response1 => {
        //         console.log(response1.data)
        //         this.setState({ files: response1.data });
        //     })
        //     .catch(error => {
        //         console.error("There was an error fetching the files!", error);
        //     });
    };
    showPanel = () => {
        this.setState({ isPanelVisible: true });
    }

    hidePanel = () => {
        this.setState({ isPanelVisible: false });
    }
    render() {
        const { files, id } = this.state
        const x = files.length > 0 ? true : false
        const y = x === false ? true : false
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
                            {x &&
                                <div className="file-container">
                                    {files.map((every, index) => (
                                        <div draggable droppable onDragStart={e => this.D_start(e, index)} onDragEnter={e => this.D_enter(e, index)} onDragEnd={e => this.D_end(e, index)} className="file-container">
                                            <File fetchFiles={this.fetchFiles} details={every} key={every.id} rename={this.rename} />
                                        </div>
                                    ))}
                                </div>
                            }
                            {y && <img src="http://localhost:3030/uploads/Asset%201%2011xbookhub.png" alt="NothingIsPresent" />}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home