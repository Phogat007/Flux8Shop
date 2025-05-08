
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample addresses - in a real app, this would come from an API
const initialAddresses = [
  {
    id: 1,
    name: "Home",
    line1: "123 Main Street",
    line2: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    default: true,
  },
  {
    id: 2,
    name: "Work",
    line1: "555 Market Street",
    line2: "Suite 1000",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    default: false,
  },
];

interface Address {
  id: number;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  default: boolean;
}

const AddressBook = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const { toast } = useToast();

  const handleAddressFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    if (currentAddress) {
      // Edit mode
      const updatedAddresses = addresses.map(addr => 
        addr.id === currentAddress.id 
          ? { 
              ...addr, 
              name: formData.get('name') as string,
              line1: formData.get('line1') as string,
              line2: formData.get('line2') as string,
              city: formData.get('city') as string,
              state: formData.get('state') as string,
              zipCode: formData.get('zipCode') as string,
              country: formData.get('country') as string,
              default: formData.get('default') === 'on'
            } 
          : addr
      );
      
      setAddresses(updatedAddresses);
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully."
      });
    } else {
      // Add mode
      const newAddress: Address = {
        id: Date.now(),
        name: formData.get('name') as string,
        line1: formData.get('line1') as string,
        line2: formData.get('line2') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zipCode: formData.get('zipCode') as string,
        country: formData.get('country') as string,
        default: formData.get('default') === 'on'
      };
      
      setAddresses([...addresses, newAddress]);
      toast({
        title: "Address added",
        description: "Your address has been added successfully."
      });
    }
    
    setIsAddressDialogOpen(false);
    setCurrentAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setIsAddressDialogOpen(true);
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: "Address deleted",
      description: "Your address has been removed from your address book."
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Address Book</CardTitle>
          <CardDescription>Manage your shipping and billing addresses</CardDescription>
        </div>
        <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setCurrentAddress(null)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
              <DialogDescription>
                {currentAddress ? "Update your address details below." : "Fill in the address details below."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddressFormSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Address Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    defaultValue={currentAddress?.name || ""} 
                    placeholder="Home, Work, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line1">Address Line 1</Label>
                  <Input 
                    id="line1" 
                    name="line1" 
                    defaultValue={currentAddress?.line1 || ""} 
                    placeholder="Street address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                  <Input 
                    id="line2" 
                    name="line2" 
                    defaultValue={currentAddress?.line2 || ""} 
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      defaultValue={currentAddress?.city || ""} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      defaultValue={currentAddress?.state || ""} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip / Postal Code</Label>
                    <Input 
                      id="zipCode" 
                      name="zipCode" 
                      defaultValue={currentAddress?.zipCode || ""} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      name="country" 
                      defaultValue={currentAddress?.country || ""} 
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="default"
                    name="default"
                    defaultChecked={currentAddress?.default}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="default">Set as default address</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{currentAddress ? "Update Address" : "Add Address"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div 
              key={address.id} 
              className={`border rounded-lg p-4 ${address.default ? 'border-primary' : ''} relative`}
            >
              {address.default && (
                <span className="absolute top-2 right-2 text-xs bg-primary text-white px-2 py-1 rounded-md">Default</span>
              )}
              <div className="mb-2">
                <h3 className="font-medium">{address.name}</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditAddress(address)}
                >
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        {addresses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
            <p className="text-muted-foreground mb-4">Add an address to make checkout faster.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressBook;
