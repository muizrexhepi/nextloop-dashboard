// src/components/listings/AddListingDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateListingPayload, ListingStatus } from "@/services/types";

interface AddListingDialogProps {
  onSave: (data: CreateListingPayload) => Promise<void>;
}

const initialFormData: Partial<CreateListingPayload> = {
  name: "",
  description: "",
  startingPrice: 0,
  endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .substring(0, 16), // 7 days from now, format for datetime-local
  status: "draft",
};

export const AddListingDialog: React.FC<AddListingDialogProps> = ({
  onSave,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (
    id: keyof CreateListingPayload,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // NOTE: category and seller are required on the backend, so we need to mock/handle them
    // For now, we'll provide dummy data for the required fields not in the form
    const payload: CreateListingPayload = {
      ...formData,
      description: formData.description || "Default Description",
      startingPrice: formData.startingPrice || 0,
      currentPrice: formData.startingPrice || 0,
      startTime: new Date().toISOString(),
      endTime: new Date(formData.endTime!).toISOString(),
      images: [],
      // MOCK DATA for required object references
      category: "60c72b2f9c8d5c0015f8a0a4", // Replace with actual category ID
      seller: "60c72b2f9c8d5c0015f8a0a5", // Replace with actual seller ID
      bidIncrement: 10,
      shippingCost: 0,
      shippingOptions: [],
      isFeatured: false,
      isBoosted: false,
      status: formData.status as ListingStatus,
    } as CreateListingPayload;

    try {
      await onSave(payload);
      setOpen(false);
      setFormData(initialFormData); // Reset form
    } catch (error) {
      console.error("Failed to create listing:", error);
      // Show toast/error message here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Listing</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new item to the marketplace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startingPrice" className="text-right">
                Start Price
              </Label>
              <Input
                id="startingPrice"
                type="number"
                value={formData.startingPrice}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endTime" className="text-right">
                End Time
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(v) => handleSelectChange("status", v)}
                defaultValue={formData.status}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
