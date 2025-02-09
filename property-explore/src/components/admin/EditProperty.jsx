"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogClose } from "@/components/ui/dialog"
import { Edit, Trash } from "lucide-react" // Importing icons for Edit and Trash
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"

// Importing the properties data
// import propertyData from "@/lib/propertyData";
import PropertyDialog from "./PropertyDialog"

function EditProperty() {
  const [propertyList, setPropertyList] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchProperties() {
      const response = await fetch("/api/properties");
      const data = await response.json();
      console.log('data:', data)
      setPropertyList(data);
    }
  
    fetchProperties();
  }, []);

  const openEditDialog = (property) => {
    setSelectedProperty(property)
    setIsDialogOpen(true)
  }

  // Editing Property
  const handleEditPropertySubmit = async () => {
    if (!selectedProperty) return;

    const { _id, ...updatedData } = selectedProperty;

    try {
      const response = await fetch("/api/properties", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: _id,
          ...updatedData
        }),
      });
  
      if (response.ok) {
        setPropertyList((prevList) =>
          prevList.map((property) => (property._id === _id ? selectedProperty : property))
        );
        setIsDialogOpen(false);
      } else {
        console.error("Failed to update property.");
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };
  
  //Removing property
  const handleRemoveProperty = async (_id) => {
    try {
      const response = await fetch("/api/properties", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id }),
      });
  
      if (response.ok) {
        setPropertyList((prevList) => prevList.filter((property) => property._id !== _id));
      } else {
        console.error("Failed to delete property.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };
  

  return (
    <div className="space-y-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {propertyList.map((property) => (
            <TableRow key={property.name}>
              <TableCell>{property.name}</TableCell>
              <TableCell>{property.city}</TableCell>
              <TableCell>{property.owner}</TableCell>
              <TableCell>{property.price}</TableCell>
              <TableCell>{property.bedrooms}</TableCell>
              <TableCell>{property.bathrooms}</TableCell>
              <TableCell className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => openEditDialog(property)}>
                    <Edit size={16} /> Edit Property
                    </Button>
                    {/* <PropertyDialog /> */}
                    <Button variant="outline" onClick={() => handleRemoveProperty(property._id)}>
                  <Trash size={16} /> Remove Property
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    {selectedProperty && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Edit Property Details</DialogTitle>
                <DialogDescription>
                    Edit your property details.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name of residence
                    </Label>
                    <Input
                      id="name"
                      value={selectedProperty?.name || ""}
                      onChange={(e) => setSelectedProperty({ ...selectedProperty, name: e.target.value })}
                      className="col-span-3"
                      />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                    City
                    </Label>
                    <Input
                      id="city"
                      value={selectedProperty?.city || ""}
                      onChange={(e) => setSelectedProperty({ ...selectedProperty, city: e.target.value })}
                      className="col-span-3"
                      />                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="owner" className="text-right">
                    Owner
                    </Label>
                    <Input
                      id="owner"
                      value={selectedProperty?.owner || ""}
                      onChange={(e) => setSelectedProperty({ ...selectedProperty, owner: e.target.value })}
                      className="col-span-3"
                      />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                    Price
                    </Label>
                    <Input
                      id="price"
                      value={selectedProperty?.price || ""}
                      onChange={(e) => setSelectedProperty({ ...selectedProperty, price: e.target.value })}
                      className="col-span-3"
                      />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bedrooms" className="text-right">
                    Bedrooms
                    </Label>
                    <Input
                      id="bedrooms"
                      type='number'
                      value={selectedProperty?.bedrooms || ""}
                      onChange={(e) => setSelectedProperty({ ...selectedProperty, bedrooms: e.target.value })}
                      className="col-span-3"
                      />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bathrooms" className="text-right">
                    Bathrooms
                    </Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={selectedProperty?.bathrooms || ""}
                      onChange={(e) => setSelectedProperty({ ...selectedProperty, bathrooms: e.target.value })}
                      className="col-span-3"
                      />
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                    Address
                    </Label>
                    <Input id="address" value="montreal rue st" type="text" className="col-span-3" />
                </div> */}
                </div>
                <DialogFooter>
                <Button type="submit" onClick={handleEditPropertySubmit}>Save changes</Button>
                <DialogClose>
                <Button type="button">
                    Close
                </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )}
      


    </div>
  )
}

export default EditProperty
