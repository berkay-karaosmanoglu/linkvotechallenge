import './App.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import links, {addLink, deleteLink, linkSlice, updateVotes, sortLinks } from './features/links';
import { useEffect, useReducer, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import './style.css';



function App() {
  library.add(fas);

  const dispatch = useDispatch();
  const linkList = useSelector((state) => state.links.value);
  /* Pagination setup */
  const [pageNumber, setPageNumber] = useState(0);
  const linksPerPage = 5;
  const firstLinkOfPage = pageNumber * linksPerPage;
  const pageCount = Math.ceil(linkList.length / linksPerPage);
  const changePage = ({selected}) => {
    setPageNumber(selected);
  }
  /* Dialog setup */
  const [open, setOpen] = React.useState(false);
  const [dialogObj, setDialog] = useState({})
  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => setOpen(false);

  /* Options for sorting */
  const [orderType, setOrderType] = useState("");
  const options = [
    { value: 'mostLiked', label: 'Most Upvoted' },
    { value: 'leastLiked', label: 'Least Upvoted' }
  ];
  function handleChange(e) {
    setOrderType(e.value);
  }

  /* Sorting select component */
  const SortSelect = (options) => {
    return(
      <div className='selectContainer'>
        <Select options={options} onChange={handleChange} />
      </div>
    )
  };

  /* Sort links if orderType or linkList changes */
  useEffect(() => {
    dispatch(sortLinks({linkList, orderType}))
  }, [orderType, linkList]);

  /* Submit link button navigate function */
  let navigate = useNavigate();
  function sendToPostLink() {
    navigate("/Postlink");
  }; 
  
  /* Link listing component */
  const displayLinks = linkList.slice(firstLinkOfPage, firstLinkOfPage + linksPerPage).map((link) => {
    return (
      <div className='linkBox'>
        <div className='upvotes'>
          <span>{link.points} <span>Points</span> </span>
        </div>
        <div className='info'>
          <div className='title'> 
              <a href={link.url}>{link.name}
                <span>({link.url})</span>
                </a>
    </div>
    <div className='voteButtons'>
    <button className={`upVote ` + (link.upvoted ? "active" : "")} onClick={() => {
      dispatch(updateVotes({id: link.id, point: 1, buttonName: "upvote"}))
    }}>
     <FontAwesomeIcon icon="fa-solid fa-thumbs-up" size='xl' className='upVoteIcon'/>
     Up Vote
    </button>
    <button className={'downVote ' + (link.downvoted ? "active" : "")} onClick={() => {
      dispatch(updateVotes({id: link.id, point: -1, buttonName: "downvote"}))
    }}>
      <FontAwesomeIcon icon="fa-solid fa-thumbs-down" size='xl' className='downVoteIcon'/>
      Down Vote
    </button>
    </div>
        </div>
        <button className='deleteButton' on onClick={() => {setDialog(link); handleClickOpen();}}> <FontAwesomeIcon icon="fa-solid fa-trash-can" size='xl' /></button> 
    </div>
    )
  });

  return (
    <div className="App">
      {""}
      <div className='addLinks'>
      <button onClick={sendToPostLink}><FontAwesomeIcon icon="fa-solid fa-plus" size='xl'/> Submit A Link</button>
      <Divider/>
      </div>
      {SortSelect(options)}
      <div className='linkList'>
        {displayLinks}
      </div>
      {/*Pagination*/}
      <ReactPaginate 
      pageCount= {pageCount}
      onPageChange={changePage}
      containerClassName={'paginationContainer'}
      previousLinkClassName={'prevBtn'}
      nextLinkClassName={'prevBtn'}
      disabledClassName={'pgntnDisabled'}
      activeClassName={'pgntnActive'}
      />
      {/* Toast for success notification */}
      <ToastContainer></ToastContainer>
      {/* Confirmation dialog for link remove */}
      <Dialog onClose={handleClose} open={open}>
          <div className='deleteBox-content'>
          <div className='modalHeader'>
              <span>Remove Link</span>
              <button className='closeButton' onClick={handleClose}><FontAwesomeIcon icon="fa-solid fa-x" /></button>
              </div>
            <p>
              Do you want to remove <br/>
              <span>{dialogObj.name}</span>
            </p>
      <button className='deleteLink buttonType1' onClick={() => {
          dispatch(deleteLink({id: dialogObj.id, name: dialogObj.name}));
          handleClose();
        }}>
          OK
          </button>
          <button className='cancel buttonType1' onClick={handleClose}>
            CANCEL
            </button>
          </div>           
    </Dialog>
    </div>
  );
}

export default App;
