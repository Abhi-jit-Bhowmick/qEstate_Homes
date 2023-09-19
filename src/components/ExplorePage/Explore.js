import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { config } from "../../Config/Config";
import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import SortingFilter from "../SortingFilter/SortingFilter";
import ListingsTableView from "../ListingsTableView/ListingsTableView";
import "./Explore.css"

function Explore() {
        const [listingsData, setListingsData] = useState([]);
        const [locationFilter, setLocationFilter] = useState([]);
        const [priceRangeFilter, setPriceRangeFilter] = useState([]);
        const [sortBy, setSortBy] = useState("");

        async function fetchListings() {
                try {
                        const response = await axios.get(
                                `${config.backendEndPoint}/real-estate-data`
                        );
                        setListingsData(response.data.listings);
                } catch (err) {
                        console.log(err);
                }
        }

        // Filter Handelers::
        const handleLocationFilterChange = (event) => {
                const isChecked = event.target.checked;
                if(isChecked){
                        setLocationFilter((prevState)=>([...prevState, event.target.value]))
                }else{
                        setLocationFilter((prevState)=>prevState.filter((item)=> item !== event.target.value))
                }
         };

        const handlePriceRangeFilterChange = (event) => {
                const isChecked = event.target.checked;
                if(isChecked){
                        setPriceRangeFilter((prevState)=>([...prevState, event.target.value]))
                }else{
                        setPriceRangeFilter((prevState)=>prevState.filter((item)=>item !== event.target.value))
                }

        };

        const handleSortByChange = (event) => {
                setSortBy(event.target.value)
        };

        // UseEffect ::
        useEffect(() => {
                fetchListings();
        }, []);
        return (
                <>
                        {/* Header */}
                        <Header onPage="explore"/>

                        <div className="property-listings-view">
                                {/* CheckBoxFilters */}
                                <CheckboxFilter
                                        handleLocationFilterChange={handleLocationFilterChange}
                                        handlePriceRangeFilterChange={handlePriceRangeFilterChange}
                                        locationFilter={locationFilter}
                                        priceRangeFilter={priceRangeFilter}
                                />

                                {/* SortingFilters */}
                                <SortingFilter 
                                        sortBy={sortBy}
                                        handleSortByChange={handleSortByChange}

                                />

                                {/* ListingsTableView */}
                                <ListingsTableView 
                                        priceRangeFilter={priceRangeFilter}
                                        locationFilter={locationFilter}
                                        listingsData={listingsData}
                                        sortBy={sortBy}
                                />
                        </div>
                </>
        );
}

export default Explore;
