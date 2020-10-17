import React from 'react'
import './AvailableMeetingHeader.css'
// header with links to other pages

function AvailableMeetingHeader() {
    return (
        <div>
           <header className = 'appHeader'></header> 
            <l1 className = 'HeaderText1'> 
                <a href = "https://www.google.com/" target="_blank"> Available</a> 
            </l1>
            <l2 className = 'HeaderText2'> 
                <a href = "#">MeetingHistory</a>
            </l2>
        </div>
    )
}

export default AvailableMeetingHeader