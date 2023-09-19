import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import { config } from '../../Config/Config'
import { useParams } from 'react-router-dom'

function ListingDetailPage() {

    const { property_id } = useParams()

    const [property, setProperty] = useState(null);


    const fetchListings = async () => {
        try {
            const response = await axios.get(`${config.backendEndPoint}/real-estate-data`);
            const data = response.data.listings;
            setProperty(data.find((ele) => ele.property_id === Number(property_id)))
        } catch (err) {
            console.log(err)
            setProperty(null)
        }
    }

    useEffect(() => {
        fetchListings()
    }, [])

    return (
        <>
            <Header />

            <div className='detail-page-container'>
                {property ?
                    (
                        <>
                            <div className='image-container'>
                                <img src='/assets/real-estate-detail.jpg' alt='real-estate-detail-img' />
                            </div>
                            <div className='property-details'>
                                <h1>{property.property_name}</h1>
                                <div className='property-description'>
                                    {property.description}
                                </div>
                                <div className='agent-details'>
                                    <h2 className='agent-details-header'>Contact</h2>
                                    <div className='agent-details-content'>
                                        <span>John Smith</span>
                                        <span className='title'>Email:</span>
                                        <span>johnsmith@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>Details unavailable at this moument</div>
                    )
                }
            </div>
        </>
    )
}

export default ListingDetailPage