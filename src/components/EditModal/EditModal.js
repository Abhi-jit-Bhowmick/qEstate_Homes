import React, { useState } from 'react'
import "./EditModal.css"

function EditModal({item, onSave, onClose}) {

    const [editedItem, setEditedItem] = useState({...item})

    const handleInputChange= (event)=>{
        const {name, value} = event.target;
        setEditedItem((prevItem)=>({...prevItem, [name]:value}))
    }

    const handleSaveClick =()=>{
        onSave(editedItem);
        onClose();
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <h2>Edit Property</h2>
                <label>Property Name</label>
                <input type='text' name='property_name' value={editedItem.property_name} onChange={handleInputChange}/>

                <label>Price</label>
                <input type='text' name='price' value={editedItem.price} onChange={handleInputChange}/>

                <label>Address</label>
                <input type='text' name='address' value={editedItem.address} onChange={handleInputChange}/>
                <div className='modal-buttons'>
                    <button onClick={handleSaveClick} >Save</button>
                    <button onClick={onClose} >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal