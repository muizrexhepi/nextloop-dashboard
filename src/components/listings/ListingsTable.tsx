// src/components/listings/ListingTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import type { Listing } from "@/services/types";

interface ListingTableProps {
  listings: Listing[];
  onEdit: (listing: Listing) => void;
  onDelete: (listingId: string) => void;
}

const getStatusVariant = (status: Listing["status"]) => {
  switch (status) {
    case "active":
      return "default";
    case "scheduled":
      return "secondary";
    case "ended":
    case "sold":
      return "outline";
    case "draft":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

export const ListingTable: React.FC<ListingTableProps> = ({
  listings,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Bids</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No listings found.
              </TableCell>
            </TableRow>
          ) : (
            listings.map((listing) => (
              <TableRow key={listing._id}>
                <TableCell className="font-medium max-w-[200px] truncate">
                  {listing.name || listing._id}
                </TableCell>
                <TableCell>
                  {(listing.seller as any)?.username || "N/A"}
                </TableCell>
                <TableCell className="font-semibold">
                  ${listing.currentPrice.toFixed(2)}
                </TableCell>
                <TableCell>{listing.totalBids}</TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusVariant(listing.status)}
                    className="capitalize"
                  >
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(listing.endTime), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  {/* Placeholder for a dropdown menu for more actions */}
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => onEdit(listing)}
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
