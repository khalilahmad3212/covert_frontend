import React, { useContext, useEffect, useState } from 'react';

import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Filter from './Filter/Filter';
import Card from './Card';
import { UserContext } from '../../context/UserContext';
import api from '../../util/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListingGrid = () => {

    let width = window.innerWidth;

    const { user } = useContext(UserContext)

    const navigate = useNavigate();

    const [properties, setProperties] = useState(null)

    const [selectedOption, setSelectedOption] = useState('All');
    const [bulkData, setBulkData] = useState([])
    const [showDialogue, setShowDialogue] = useState(false);
    const [operation, setOperation] = useState('')


    const [category, setCategory] = useState('All');

    const performBulkAction = (fn) => {
        fn(bulkData)
        setBulkData([])
    }

    const publish = (ids) => {
        console.log('ids: ', ids);
        let data = {
            published: true
        }

        ids.forEach(async (id, index) => {

            let url = `/admin/properties/${id}`;

            try {
                const response = await api.put(url, data);

                console.log('Response(Publish): ', response);
                console.log('Data(Publish): ', response.data);

            } catch (error) {
                console.log(`Error While Publishing Property: ${id}`);
                console.log(`Error indx: ${index}: `, error.message);
                alert(`Error While Publishing Property: ${id}`)
            }
        });

        setSelectedOption('Published')
    }

    const unPublish = (ids) => {
        let data = {
            published: false
        }

        ids.forEach(async (id, index) => {

            let url = `/admin/properties/${id}`;

            try {
                const response = await api.put(url, data);

                console.log('Response(UnPublish): ', response);
                console.log('Data(UnPublish): ', response.data);

            } catch (error) {
                console.log(`Error While UnPublishing Property: ${index}`);
                alert(`Error While UnPublishing Property: ${index}`)
            }
        });

        setSelectedOption('UnPublished')
    }


    const deletePorperties = (ids) => {

        ids.forEach(async (id, index) => {

            let url = `/admin/properties/${id}`;

            try {
                const response = await api.delete(url);
                toast('Property Deleted Succuessfully');
                getPropertiesData();
            } catch (error) {
                console.log(`Error While Delete Property: ${index}: `, error.message);
                toast(`Error While Delete Property: ${index}: ${error.message}`)
            }
        });

        setSelectedOption('All')
    }

    const getPropertiesData = async (filter) => {

        let url = ''
        if (selectedOption === 'All') {

            url = `/properties`

        } else if (selectedOption === 'Published') {

            url = `/properties?published=true`

        } else if (selectedOption === 'UnPublished') {

            url = `/properties?published=false`

        } else if (selectedOption === 'Past Deals') {
            url = `/properties?showHome=true`;
        }

        try {
            // console.log('Url: ', url);
            const { data } = await api.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    ...filter
                }
            })

            setProperties(data.properties)
            console.log('Properties: ', data);

        } catch (error) {
            toast("Error while getting properties");
            console.log('Error: ', error);
        }
    }


    useEffect(() => {
        getPropertiesData();
    }, [selectedOption]);


    if (!properties) return <div>Loading.....</div>


    return (
        <div className="flex mt-10 px-3 gap-7">
            <div className=' max-h-min bg-transparent hidden md:block' style={{
                flex: 2
            }}>
                <div className=''>
                    <Filter getPropertiesData={getPropertiesData} />
                </div>
            </div>

            <div style={{ flex: (width > 680) ? 4 : 1 }} className='md:px-4'>
                {
                    user?.role === 'admin' && (
                        <div className='flex justify-between items-center gap-3 mb-5'>
                            <div className=" mb-3">
                                <FormControl fullWidth>
                                    <InputLabel id="category-select-label">Property Type</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        value={selectedOption}
                                        label="Property Type"
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    >
                                        {
                                            ['All', 'Published', 'UnPublished', 'Past Deals'].map((e) => (
                                                <MenuItem value={e}>{e}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            {/* <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="All">All</option>
                                <option value="Published">Published</option>
                                <option value="UnPublished">UnPublished</option>
                                <option value="ShowHome">Past Deals</option>
                            </select> */}
                            <div className='flex items-center justify-end gap-5 flex-1 '>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ bgcolor: "#716EDC", maxWidth: 'max-content', "&:hover": { bgcolor: "#716EDC" } }}
                                    onClick={() => {
                                        setOperation('Publish')
                                        setShowDialogue(true)
                                    }}
                                    disabled={(bulkData.length > 0 && selectedOption === 'UnPublished') ? false : true}
                                >
                                    Publish
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ bgcolor: "#716EDC", maxWidth: 'max-content', "&:hover": { bgcolor: "#716EDC" } }}
                                    onClick={() => {
                                        setOperation('Unpublish')
                                        setShowDialogue(true)
                                    }}
                                    disabled={(bulkData.length > 0 && selectedOption === 'Published') ? false : true}

                                >
                                    Unpulish
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ bgcolor: "#716EDC", maxWidth: 'max-content', "&:hover": { bgcolor: "#716EDC" } }}
                                    onClick={() => {
                                        setOperation('Delete');
                                        setShowDialogue(true)
                                    }}
                                    disabled={bulkData.length > 0 ? false : true}

                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ bgcolor: "#716EDC", maxWidth: 'max-content', "&:hover": { bgcolor: "#716EDC" } }}
                                    onClick={() => {
                                        navigate('/admin/property')
                                    }}

                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    )
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-5 relative">
                    {
                        properties.map((property) => (
                            <Card getPropertiesData={getPropertiesData} property={property} key={property?._id} bulkData={bulkData} setBulkData={setBulkData} />
                        ))
                    }
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            p: 1,
                            px: 4,
                            bgcolor: "#716EDC",
                            "&:hover": {
                                backgroundColor: "#716EDC",
                            },
                            mx: 'auto'
                        }}
                    >
                        Load More
                    </Button>
                </Box>
            </div>
            {
                showDialogue && (
                    <div className='fixed z-10 left-0 right-0 bottom-0 top-0 flex justify-center items-center'>
                        <div className='absolute left-0 right-0 bottom-0 top-0 bg-green-700 opacity-50' />
                        <div className='w-[500px] h-[200px] bg-white z-10 px-5 py-8 flex flex-col justify-between'>

                            <h3 className=' text-xl font-bold'>
                                {
                                    operation === 'Publish' ? (
                                        <>
                                            You are Going to Publish <span className='text-3xl'>{bulkData.length}</span> Items
                                        </>
                                    ) : operation === 'Unpublish' ? (
                                        <>
                                            You are Going to Unpublish <span className='text-3xl'>{bulkData.length}</span> Items
                                        </>
                                    ) : operation === 'Delete' ? (
                                        <>
                                            You are Going to Delete <span className='text-3xl'>{bulkData.length}</span> Items
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )
                                }

                            </h3>
                            <div className='flex justify-end gap-4'>
                                <button
                                    onClick={() => setShowDialogue(false)}
                                    className=' bg-gray-400 px-5 py-2 rounded-md text-lg text-white'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        performBulkAction(
                                            operation === 'Publish' ? publish :
                                                operation === 'Unpublish' ? unPublish :
                                                    operation === 'Delete' ? deletePorperties : ''
                                        );
                                        setShowDialogue(false)
                                    }}
                                    className=' bg-blue-500 px-5 py-2 rounded-md text-lg text-white'
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>


    );
};

export default ListingGrid;
