import React, { Component } from 'react'
import { getBoardPosters, getMoviesInfo } from '../helpers/movieDatabase.js'
import { auth, database } from './../services/firebase.js'
import ReactLoading from 'react-loading'
import { addMovieToBoard, getUserInfo } from '../helpers/database.js'
import Header from './../reusable-components/Header.js'
const axios = require('axios')

class MyAccount extends Component {
    constructor(props) {
        super(props)
        this.state={
            info:null,

        }
    }

    componentDidMount() {
        getUserInfo((info)=>{this.setState({info:info})})

    }

    render() {
        return (
            <div
                style={{
                    backgroundColor: '#414141',
                    height: window.innerHeight,
                    position: 'relative',
                    fontFamily:'Poppins',
                }}
            >
                <Header></Header>
                <div style={{paddingTop:150}}></div>

            </div>
        )
    }
}
export default MyAccount;