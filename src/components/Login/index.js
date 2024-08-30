import { Component } from "react";
import "./index.css"
import Cookies from "js-cookie"

class Login extends Component {
    state = {
        username: "", password: "", showSubmitError: false,
        errorMsg: ''
    }

    user = (event) => {
        this.setState({ username: event.target.value })
    }

    pass = (event) => {
        this.setState({ password: event.target.value })
    }

    reg = () => {
        const { history } = this.props
        history.replace("/register")
    }

    onSubmitSuccess = jwtToken => {
        console.log(jwtToken)
        const { history } = this.props
        const { username } = this.state

        console.log(username)

        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        Cookies.set('name', username, { expires: 30 })

        this.setState({ showSubmitError: false, errorMsg: "" })
        history.replace('/')
    }

    onSubmitFailure = errorMsg => {
        this.setState({ showSubmitError: true, errorMsg })
    }
    login = async () => {
        const { username, password } = this.state
        if (username !== "" && password !== "") {
            const data = {
                username,
                password
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",

                },
                body: JSON.stringify(data)
            }
            const response = await fetch("http://localhost:3030/login", options)
            console.log(response)

            if (response.ok === true) {
                const resdata = await response.json()
                console.log(resdata.jwtToken)
                this.onSubmitSuccess(resdata.jwtToken)
            } else {
                const resdata1 = await response.text()
                console.log(resdata1)
                this.onSubmitFailure(resdata1)
            }
        }
        else {
            this.setState({ showSubmitError: true, errorMsg: "Enter both Username and Password" })
        }
    }

    render() {
        const { username, password, showSubmitError, errorMsg } = this.state
        return (
            <div className="conLogin1">
                <div className="conInsideLog1">
                    <h1 className="headL1">Jackpot</h1>
                    <img src='https://cdn.pixabay.com/photo/2024/02/19/02/02/login-8582364_1280.png' alt='LoginImage' className='img1L' />
                    <div className="containerL">


                        <button className="buttonL3"></button>

                        <button className="buttonL2"></button>

                    </div>

                </div>
                <div className="conInsideLog2">

                    <h2 className="headL2">Login for Jackpot here.</h2>
                    <div className="conInside">
                        <h1>Username</h1>
                        <input value={username} onChange={this.user} className="inputL1" type="text" placeholder="Enter username" />
                        <div>
                            <h1>Password</h1>
                            <input value={password} onChange={this.pass} className="inputL1" type="password" placeholder="Enter password" />
                        </div>
                        <button onClick={this.login} className="buttonL">Login</button>
                        <button onClick={this.reg} className='buttonL1' type='button' >Register</button>
                        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login