import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {

    const [text, setText] = useState(''); //Creates the text state 

    

    const onChange = (e) => setText(e.target.value);
    //E.target.name will grab the name parameter from the input box, so this code is more ubiquitous

    const onSubmit = (e) => { //Arrow function prevents needing to bind "this"
        e.preventDefault(); //Need to use prevent default to not save the information to a file
        if (text===""){
            setAlert("Please Enter Something", "light");
        }else{
            searchUsers(text);
            setText("");
        }

    }

        return (
            <div>
                <form className = "form" onSubmit = {onSubmit}>
                    <input type = "text" name = "text" 
                    placeholder="Search Users" value = {text} 
                    onChange = {onChange}/>

                    <input type = "submit" value = "Search" 
                    className="btn btn-dark btn-block"/>
                </form>
                {showClear && 
                (<button className = "btn btn-light btn-block" 
                onClick = {clearUsers}>Clear</button>)
                }
                
            </div>
        )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired, 
    setAlert: PropTypes.func.isRequired, 
}

export default Search
