import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
// import propertyData from "@/lib/propertyData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '../ui/button';
import PropertyMap from './PropertyMap';
import dynamic from 'next/dynamic';

function PropertyTable() {
    const [properties, setProperties] = useState([]);
    const [allProperties, setAllProperties] = useState([]); // Store all the fetched properties
    const [filters, setFilters] = useState({
        city: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
    });
    const PropertyMap = dynamic(() => import('./PropertyMap'), { ssr: false });

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/properties");
                if (!res.ok) {
                    throw new Error(`Error fetching properties: ${res.statusText}`);
                }
                const data = await res.json();
                setProperties(data);
                setAllProperties(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    // Handle filtering logic
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
        }));
    };

    const applyFilters = () => {
        let filteredProperties = [...allProperties];

        if (filters.city) {
        filteredProperties = filteredProperties.filter(
            (property) => property.city.toLowerCase() === filters.city.toLowerCase()
        );
        }

        if (filters.price) {
        filteredProperties = filteredProperties.filter((property) => {
            const priceValue = parseInt(property.price.replace(/[^0-9]/g, ""), 10);
            if (filters.price === "below-1M") return priceValue < 1000000;
            if (filters.price === "1M-2M") return priceValue >= 1000000 && priceValue <= 2000000;
            if (filters.price === "above-2M") return priceValue > 2000000;
            return true;
        });
        }

        if (filters.bedrooms) {
        filteredProperties = filteredProperties.filter(
            (property) => property.bedrooms === parseInt(filters.bedrooms)
        );
        }

        if (filters.bathrooms) {
        filteredProperties = filteredProperties.filter(
            (property) => property.bathrooms === parseInt(filters.bathrooms)
        );
        }

        setProperties(filteredProperties);
    };

    const clearFilters = () => {
        setFilters({
            city: "",
            price: "",
            bedrooms: "",
            bathrooms: "",
        });
        setProperties(allProperties); // Reset properties to all fetched data
    };

    return (
        <>
        <motion.div
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="p-10"
        >
        <h1 className="text-3xl font-bold mb-4">Property Details</h1>
        <div className="flex gap-4 mb-6">
            <select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
            >
            <option value="">Select City</option>
            <option value="Toronto">Toronto</option>
            <option value="Vancouver">Vancouver</option>
            <option value="Montreal">Montreal</option>
            <option value="Ottawa">Ottawa</option>
            <option value="Calgary">Calgary</option>
            </select>

            <select
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
            >
            <option value="">Select Price Range</option>
            <option value="below-1M">Below $1M</option>
            <option value="1M-2M">$1M - $2M</option>
            <option value="above-2M">Above $2M</option>
            </select>

            <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
            >
            <option value="">Select Bedrooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            </select>

            <select
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
            >
            <option value="">Select Bathrooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            </select>

            <Button onClick={applyFilters}>Apply Filters</Button>
            <Button onClick={clearFilters} className="bg-white text-black">Clear Filters</Button>
        </div>


        <Table className="w-full border rounded-lg">
            <TableHeader>
            <TableRow>
                {/* <TableHead>ID</TableHead> */}
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Bathrooms</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {properties.map((property) => (
                <TableRow key={property._id}>
                {/* <TableCell>{property.id}</TableCell> */}
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.city}</TableCell>
                <TableCell>{property.owner}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>{property.bedrooms}</TableCell>
                <TableCell>{property.bathrooms}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

        {/* Property using Map */}
        <div className='mt-5'>
            <h1 className="text-xl font-bold mb-4">You can select look at your nest on the map!</h1>
            <PropertyMap properties={properties} />
        </div>
        </motion.div>

    </>
    )
}

export default PropertyTable