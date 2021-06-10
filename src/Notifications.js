import React, {useState, useEffect} from "react";
import Lists from "./Lists";

const Notifiations = () => {

    const[notfnList, setNotfnList] = useState([]);
    const[originalData, setOriginalData] = useState([]);
    const[showActive, setActive] = useState(false);
    const[searchTxt, setSearchTxt] = useState("");
    
    useEffect(() => {
        fetch("https://c466ca5e-0412-4dee-a7cb-492868a09974.mock.pstmn.io/notifications/")
            .then((response)=>response.json())
            .then((result) => {
                setNotfnList(result);
                setOriginalData(result);
            })
    }, [])

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

    const handleSearch = (event) => {
        setSearchTxt(event.target.value);
        setTimeout(()=> {
            searchNotifications();
        },100)
    }
    const searchNotifications = () => {
        let filterData = originalData.filter((item) => item.information.includes(searchTxt))
        setNotfnList(filterData);
    }
    return(        
      <div className="container">
        <h1>Notifications</h1>
        <div className="container-elm">
            <span>Search: 
                <input type="text" name="searchTxt" value={searchTxt} onChange={(e) => handleSearch(e)}/>
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