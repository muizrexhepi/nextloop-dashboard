// src/components/listings/ListingsContent.tsx
import { useState, useEffect, useCallback } from "react";
import {
  createListing,
  getAllListings,
  deleteListing,
} from "@/services/api/listings"; // API functions
import { AddListingDialog } from "./AddListingDialog";
import { toast } from "sonner"; // Assuming you have a toast library like Sonner installed
import { Loader2 } from "lucide-react";
import type { CreateListingPayload, Listing } from "@/services/types";
import { Button } from "../ui/button";
import { ListingTable } from "./ListingsTable";

export function ListingsContent() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch listings from the API
  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch all listings with no filters for the initial dashboard view
      const data = await getAllListings({ limit: 50 });
      setListings(data);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError("Failed to load listings. Please check the API connection.");
      toast.error("Failed to load listings.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Handler for creating a new listing
  const handleCreateListing = async (data: CreateListingPayload) => {
    try {
      const newListing = await createListing(data);
      setListings((prev) => [newListing, ...prev]);
      toast.success(`Listing "${data.name}" created successfully!`);
    } catch (err) {
      console.error("Error creating listing:", err);
      toast.error("Failed to create listing. Check server response.");
      throw err; // Re-throw to allow the dialog to handle its loading state
    }
  };

  // Handler for deleting a listing (placeholder logic)
  const handleDeleteListing = async (listingId: string) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      await deleteListing(listingId);
      setListings((prev) => prev.filter((l) => l._id !== listingId));
      toast.success("Listing deleted successfully.");
    } catch (err) {
      console.error("Error deleting listing:", err);
      toast.error("Failed to delete listing.");
    }
  };

  // Handler for editing (placeholder)
  const handleEditListing = (listing: Listing) => {
    toast.info(`Editing listing: ${listing.name}`);
    // In a real app, this would open an Edit Dialog
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
        <p className="text-muted-foreground">
          Manage all marketplace listings ({listings.length} total)
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <AddListingDialog onSave={handleCreateListing} />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Loading listings...</p>
        </div>
      ) : error ? (
        <div className="text-center p-8 border rounded-md bg-red-50/50">
          <p className="font-medium text-red-600">Error: {error}</p>
          <Button onClick={fetchListings} className="mt-4" variant="outline">
            Try Again
          </Button>
        </div>
      ) : (
        <ListingTable
          listings={listings}
          onEdit={handleEditListing}
          onDelete={handleDeleteListing}
        />
      )}
    </div>
  );
}
