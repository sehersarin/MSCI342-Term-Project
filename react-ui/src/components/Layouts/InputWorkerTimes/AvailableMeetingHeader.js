import React from 'react'
import './AvailableMeetingHeader.css'
// header with links to other pages


function AvailableMeetingHeader() { // This is a header for the service worker pages - 
    // Href for google was used for testing
    return (
        <div>
           <header className = 'appHeader'></header> 
            <l1 className = 'HeaderText1'> 
                <a href =  "#" > Available</a>  
                {/* <a href = "https://www.google.com/" target="_blank"> Available</a>   */}
            </l1>
            <l2 className = 'HeaderText2'> 
                <a href = "#">MeetingHistory</a>
            </l2>
        </div>
    )
}

export default AvailableMeetingHeader