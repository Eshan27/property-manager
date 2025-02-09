"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogClose } from "@/components/ui/dialog"
import { Edit, Trash } from "lucide-react" // Importing icons for Edit and Trash
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"

// Importing the properties data
import propertyData from "@/lib/propertyData";
import PropertyDialog from "./PropertyDialog"

function EditProperty() {
  const [propertyList, setPropertyList] = useState(propertyData)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEditProperty = (property) => {
    setSelectedProperty(property)
    setIsDialogOpen(true)
    // Logic for editing property (to be implemented later)
  }

  const handleRemoveProperty = (id) => {
    console.log("Remove property with ID:", id)
    // Logic for removing property (to be implemented later)
  }

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
                    <Button variant="outline" onClick={() => handleEditProperty(property)}>
                    <Edit size={16} /> Edit Property
                    </Button>
                    {/* <PropertyDialog /> */}
                    <Button variant="outline" onClick={() => handleRemoveProperty(property.id)}>
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
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                    City
                    </Label>
                    <Input id="city" value="city" type="text" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="owner" className="text-right">
                    Owner
                    </Label>
                    <Input id="owner" value="Pedro Duarte" type="text" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                    Price
                    </Label>
                    <Input id="price" value="100000" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Bedrooms
                    </Label>
                    <Input id="bedrooms" value="2" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bathrooms" className="text-right">
                    Bathrooms
                    </Label>
                    <Input id="bathrooms" value="4" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                    Address
                    </Label>
                    <Input id="address" value="montreal rue st" type="text" className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                <Button type="submit">Save changes</Button>
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
