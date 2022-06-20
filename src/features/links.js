import {createSelector, createSlice} from '@reduxjs/toolkit'
import { useReducer } from 'react';
import { useSelector } from 'react-redux';
import {linksData} from '../fakeData';
import { toast } from 'react-toastify';

const storedLinks = JSON.parse(localStorage.getItem('Links'));

export const linkSlice = createSlice({
    name: "links",
    initialState: {value: storedLinks ? storedLinks.value : linksData},
    reducers: {
        addLink: (state, action) => {
            try {
                state.value.push(action.payload);
            localStorage.setItem("Links", JSON.stringify(state));
            toast.success(action.payload.name + " added.");
            }
            catch (e) {
                toast.error("Something went wrong");
            }  
        },

        deleteLink: (state, action) => {
            try {
                state.value = state.value.filter((link) => link.id !== action.payload.id);
                localStorage.setItem("Links", JSON.stringify(state));
                toast.success(action.payload.name + " deleted.");
            }
            catch (e) {
                toast.error("Something went wrong");
            }
        },

        updateVotes: (state, action) => {
            state.value.map((link) => {
                if (link.id === action.payload.id){
                    if((action.payload.buttonName === "upvote") && link.upvoted !== true){
                        if(link.downvoted !== true) {
                        link.points =  link.points + 1;
                        link.upvoted = true;
                        link.downvoted = false;
                        localStorage.setItem("Links", JSON.stringify(state));
                        }
                        else {
                            link.points =  link.points + 2;
                        link.upvoted = true;
                        link.downvoted = false;
                        localStorage.setItem("Links", JSON.stringify(state)); 
                        }
                    }
                    else if((action.payload.buttonName === "downvote") && link.downvoted !== true){
                        if(link.upvoted !== true) {
                        link.points =  link.points - 1;
                        link.downvoted = true;
                        link.upvoted = false;
                        localStorage.setItem("Links", JSON.stringify(state));
                        }
                        else {
                        link.points =  link.points - 2;
                        link.downvoted = true;
                        link.upvoted = false;
                        localStorage.setItem("Links", JSON.stringify(state)); 
                        }
                    }                  
                }
            });
        },

        sortLinks: (state, action) => {
            switch(action.payload.orderType){
                case 'mostLiked': {
                state.value = state.value.sort((a, b) => b.points - a.points || b.id - a.id);
                break  
                }
                case 'leastLiked': {
                state.value = state.value.sort((a, b) => a.points - b.points || b.id - a.id);
                break  
                }
                case 'byId' : {
                    state.value = state.value.sort((a, b) => b.id - a.id);
                    }
                default : {
                state.value = state.value.sort((a, b) => b.id - a.id);
                }
            }; 
        }
    }
});

export const {addLink} = linkSlice.actions;
export const {deleteLink} = linkSlice.actions;
export const {updateVotes} = linkSlice.actions;
export const {sortLinks} = linkSlice.actions;
export default linkSlice.reducer;