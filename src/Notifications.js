import React, {useState, useEffect, useCallback} from "react";
import Lists from "./Lists";

const Notifiations = () => {

    const[notfnList, setNotfnList] = useState([]);
    const[originalData, setOriginalData] = useState([]);
    const[showActive, setActive] = useState(false);
    const[searchTxt, setSearchTxt] = useState("");
    
    //to handle API call on page load
    useEffect(() => {
        fetch("https://c466ca5e-0412-4dee-a7cb-492868a09974.mock.pstmn.io/notifications/")
            .then((response)=>response.json())
            .then((result) => {
                setNotfnList(result);
                setOriginalData(result);
            })
    }, [])

    //to handle checkbox toggle
    const toggleActive = () => {
        if(!showActive){
            setActive(!showActive);
            let activeDataOnly = originalData.filter((item) => item.active === true);
            setNotfnList(activeDataOnly);
        } else {
            setActive(!showActive);
            setNotfnList(originalData);
        }
    }

    //debounce cll back fn for search
    const debounce = (func) => {
        let timer;
        return function(...args){
            const context = this;
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args)
            }, 500)
        }
    }

    //fn to han dle search on key change
    const handleSearch = (event) => {
        let val = event.target.value;
        handleSearchFilter(val)
    }

    //search filter method
    const handleSearchFilter = (val) => {        
        let filterData = [...originalData].filter((item) => item.information.includes(val));
        if(filterData.length > 0){
            setNotfnList(filterData);
        } 
    }

    //memoizing the debounce mehtod
    const optimised = useCallback(debounce(handleSearch), []);

    return(        
      <div className="container">
        <h1>Notifications</h1>
        <div className="container-elm">
            <span>Search: 
                <input type="text" name="searchTxt" onChange={handleSearch}/>
            </span>
            <span className="item-right"> 
                <input 
                    type="checkbox" 
                    checked={showActive}
                    onChange={() => toggleActive()}
                /> Show only active
            </span>
        </div>
        <Lists data={notfnList}/>
    </div>
    )
}

export default Notifiations;