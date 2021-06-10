import React, {memo} from "react";

const Lists = (props) => {
    console.log(props.data);
    return(
        <>
           {
               props.data.map((item, index) => {
                   return(
                        <div className="container-items" key={index*3} style={{borderLeft:`4px solid ${item.color}`}}>
                            <div className="container-item-time">
                                {item.date}
                            </div>
                            <div className="container-item-disc">
                                {item.information}
                            </div>
                        </div> 

                   )
               }) 
            }
        </>       
    )
}

export default memo(Lists);