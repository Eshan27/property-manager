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
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    owner: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    latitude: "",
    longitude: "",
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = {
      ...formData,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      location: {
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      },
    };

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        body: JSON.stringify(propertyData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error);
        setMessageType("error");
        return;
      }

      setMessage("Property added successfully!");
      setMessageType("success");
      setFormData({
        name: "",
        city: "",
        owner: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.error("Error adding property:", error);
      setMessage("Something went wrong");
      setMessageType("error");    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "city", "owner", "price"].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              name="latitude"
              type="text"
              value={formData.latitude}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              name="longitude"
              type="text"
              value={formData.longitude}
              onChange={handleInputChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Property</Button>
            {message && (
              <p className={`mt-4 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
            <DialogClose>
            <Button type="button">
              Close
            </Button>
            </DialogClose>
          </DialogFooter>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default AddProperty;
