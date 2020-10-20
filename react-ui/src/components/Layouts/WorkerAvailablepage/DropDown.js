import React from 'react'


function DropDown({title, items}) { // Dropdown list component for worker Avaialbe page
    const[open, setOpen] = React.useState(false);
    const[selection, setSelection] = React.useState([]);
    const toggle = () => setOpen(!open);

    function handleOnClick(item){
        if(!selection.some(current => current.id === item.id)){
                setSelection([item]);
        } else{
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !==item.id
            );
            setSelection([... selectionAfterRemoval]);
        }
    }
    
    function isItemInSelection(item){
        if(selection.some(current => current.id === item.id)){
            return true;
        }
        return false;
    }
    
    return (
        <div className = "Wrapper">
            <div
                Index = {0}
                className = "Header"
                role = "button"
                onKeyPress = {() => toggle()}
                onClick= {()=> toggle()}
                >
                    <div className = "title">
                        <p className = "BoldTitle">{title}</p>
                    </div>
                        
                    <div className = "action">
                        <p>{open? 'Close': 'Open'}</p>
                    </div>
            </div>
            {open && (
                <ui className = "List">
                    {items.map(item =>(
                        <li className = "item" key = {item.id}>
                            <button type = "button" onClick = {() => handleOnClick(item)}>
                                <span>{item.value}</span>
                                <span>{isItemInSelection(item) && ' Selected'}</span>
                            </button>
                        </li>
                    ))}
                </ui>
            )}
        </div>
    );
}

export default DropDown
