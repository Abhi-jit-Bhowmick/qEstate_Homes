import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { BiSolidEdit } from 'react-icons/bi';
import EditModal from '../EditModal/EditModal';
import "./ListingsTableView.css"
import { useNavigate } from "react-router-dom";
import { TbListDetails } from 'react-icons/tb';





function ListingsTableView({
  listingsData,
  locationFilter,
  priceRangeFilter,
  sortBy
}) {
  // STATES::
  //currentPage
  //filteredData
  //selectedRows

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const nevigate = useNavigate()

  let itemPerPage = 10;
  let displayData = applyFiltres(filteredData, locationFilter, priceRangeFilter, sortBy)
  const totalPages = Math.ceil(displayData.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const isAllSelected = selectedRows.length === itemPerPage


  //EDITING FUNCTIONS

  const handleEdit=(item)=>{
    setEditingItem(item)
    setIsEditModalOpen(true)
  }

  const handleEditSave =(editedItem)=>{
    const updatedData = [...filteredData];

    const indexTobeEdited = updatedData.findIndex((item)=>item.property_id === editedItem.property_id);

    if(indexTobeEdited !== -1){
      updatedData[indexTobeEdited] = editedItem
      setFilteredData(updatedData)
    }
    setEditingItem(null)
  }

  const handleCloseEditModal =()=>{
    setIsEditModalOpen(false)
    setEditingItem(null)
  }

  //DELETE FUNCTIONS

  const handleDelete =(id)=>{
    const updatedData = filteredData.filter((ele)=> ele.property_id !== id)
    const updateTotalPages = Math.ceil(updatedData.length/ itemPerPage)
    if(currentPage >updateTotalPages){
      setCurrentPage(updateTotalPages)
    }
    setFilteredData(updatedData)
    setSelectedRows([])
  }

  const handleDeleteAllSelected =()=>{
    if(selectedRows.length === 0) return ;
    const updatedData = filteredData.filter((property)=> !selectedRows.includes(property.property_id))
    const updateTotalPages = Math.ceil(updatedData.length/ itemPerPage)
    if(currentPage >updateTotalPages){
      setCurrentPage(updateTotalPages)
    }
    setFilteredData(updatedData)
    setSelectedRows([])
  }

  //CHECKBOX HANDlERS

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id))
    }
  }

  const handleSelectAll = (event, displayData) => {
    const isAllChecked = event.target.checked;

    if (isAllChecked) {
      const startIndex = (currentPage - 1) * itemPerPage

      let rowSelected = [];

      for (let i = startIndex; i < startIndex + itemPerPage; i++) {
        if (i < displayData.length) {
          rowSelected.push(displayData[i].property_id)
        } else
          rowSelected.push(Math.random())
        setSelectedRows(rowSelected)
      }
    } else {
      setSelectedRows([])
    }
  }

  //PAGINATION HANDLERS

  const handleFirstPage = () => {
    setCurrentPage(1)
    setSelectedRows([])
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
    setSelectedRows([])
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
    setSelectedRows([])
  }

  const handleLastPage = () => {
    setCurrentPage(totalPages)
    setSelectedRows([])
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
    setSelectedRows([])
  }

  //NORMAL METHODS::

  //Apply all the selected filters
  function applyFiltres(filteredData, location, priceRange, sortBy) {
    let updatedData = [...filteredData];

    if (location.length) {
      updatedData = updatedData.filter((listing) => location.includes(listing.city))
    }
    if (priceRange.length) {
      updatedData = updatedData.filter((listing) => {
        let found = false;
        priceRange.forEach((rangeEntry) => {
          let low = rangeEntry.split("-")[0];
          let high = rangeEntry.split("-")[1];
          if (Number(listing.price) >= Number(low) && Number(listing.price) <= Number(high))
            found = true;
        })
        return found
      })
    }
    if (sortBy === "price") {
      updatedData = updatedData.sort((firstListing, secondListing) => firstListing.price - secondListing.price)
    } else if (sortBy === "date") {
      updatedData = updatedData.sort
        ((firstListing, secondListing) =>
          new Date(firstListing.listing_date) - new Date(secondListing.listing_date)
        )
    }
    // console.log("UPDATED DATA::", updatedData)
    return updatedData;
  }

  const getPageNumbers = (totalPages) => {
    const pageNumber = [];
    for (let currPage = 1; currPage <= totalPages; currPage++) {
      pageNumber.push(currPage)
    }
    return pageNumber;
  }

  const pageNumbers = getPageNumbers(totalPages)

  // ALL USEEFFECT::

  useEffect(() => {
    setFilteredData(listingsData)
  }, [listingsData])

  useEffect(()=>{
    setCurrentPage(1);
    setSelectedRows([])
  },[locationFilter, priceRangeFilter])

  return (
    console.log(displayData),
    <div className='listings-table-container'>
      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={isAllSelected}
                onChange={(event) => handleSelectAll(event, displayData)}
              />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            displayData.slice(startIndex, endIndex).map((items, index) => (
              <tr className='table-row' >
                <td>
                  <input
                    type='checkbox'
                    onChange={(event) => handleRowCheckboxChange(event, items.property_id)}
                    checked={selectedRows.includes(items.property_id)}
                  />
                </td>
                <td className='property-name'>{items.property_name}</td>
                <td>Rs{items.price}</td>
                <td>{items.address}</td>
                <td>{items.listing_date}</td>
                <td className='action-items'>
                  <AiFillDelete  onClick={()=>handleDelete(items.property_id)}/>
                  <BiSolidEdit  onClick={()=>handleEdit(items)}/>
                  <TbListDetails  onClick={()=>nevigate(`/detail/${items.property_id}`)}/>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>


      {/* TABLE FOOTER */}
      <div className='table-footer'>
        <button onClick={handleDeleteAllSelected}>Delete Selected</button>
        <div className='pagination-container'>
          <span>page {totalPages < 1 ? 0 : currentPage} of {totalPages}</span>
          <div className='pagination'>
            <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            {/* map */}
            {
              pageNumbers.map((page) => (
                <button key={page} onClick={() => handlePageClick(page)}>{page}</button>
              ))
            }
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
          </div>
        </div>
      </div>
      {
        isEditModalOpen && (
          <EditModal onClose={handleCloseEditModal} onSave={handleEditSave} item={editingItem}/>
        )
      }
    </div>
  )
}

export default ListingsTableView