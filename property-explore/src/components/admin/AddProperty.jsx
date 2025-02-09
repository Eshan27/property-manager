"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react" // Or any other icon
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function AddProperty() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProperty, setNewProperty] = useState({
    name: "Sample Property",
    description: "This is a description of the property",
    price: "250,000",
    location: "123 Main St, Cityville",
  })

  const properties = [
    { name: "Property 1", description: "Description 1", price: "150,000", location: "Location 1" },
    { name: "Property 2", description: "Description 2", price: "300,000", location: "Location 2" },
  ]

  const handleAddProperty = () => {
    // Add your logic for adding a property here
    setIsDialogOpen(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
            <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Property</DialogTitle>
          <DialogDescription>
            Add the correct property details.
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
  )
};

export default AddProperty;
