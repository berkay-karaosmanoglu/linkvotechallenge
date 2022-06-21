import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import links, {addLink, deleteLink, linkSlice, updateVotes, sortLinks } from './features/links';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {createSelector, createSlice} from '@reduxjs/toolkit';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './style.css';

library.add(fas)


const Postlink = () => {

    const dispatch = useDispatch();
    const linkList = useSelector((state) => state.links.value);
    const idList = linkList.map(link => parseInt(link.id));
    const lastId = Math.max(...idList);
    const [linkName, setLinkName] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    
    return(
        <div className='postLinkContent'>
        <Link to="/"><FontAwesomeIcon icon="fa-solid fa-arrow-left" size='xs'/> Return to list</Link>
        <div>
            <h1>Add new link</h1>
            <label>Link Name</label>
            <br/>
            <input type={'text'} placeholder="e.g. Alphabet" required onChange={event => setLinkName(event.target.value)} />
            <br/>
            <label>Link Name</label>
            <br/>
            <input type={'url'} placeholder="e.g. http://abc.xyz" required onChange={event => setLinkUrl(event.target.value)} />
            <br/>
            <button className='submit buttonType1' onClick={() => {
                dispatch(addLink({id: lastId + 1, name: linkName, url: linkUrl, points: 0, upvoted: false, downvoted: false}))
            }}>Submit</button>
        </div>
        <ToastContainer></ToastContainer>
        </div>
        
    )
    
}

export default Postlink;