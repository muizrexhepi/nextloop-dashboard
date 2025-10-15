// src/services/types/listings.ts

// Since User and Category are referenced, we define minimal types for them.
// You'll likely expand these in src/services/types/users.ts and categories.ts later.
export interface UserReference {
  _id: string;
  username: string; // Assuming a username for a simple reference
  // ... other minimal user fields
}

export interface CategoryReference {
  _id: string;
  name: string;
  // ... other minimal category fields
}

export interface ListingImage {
  url: string;
  alt?: string;
}

export interface Bid {
  bidder: string | UserReference; // Can be a string ID or a populated User object
  amount: number;
  timestamp: Date | string;
  isAutoBid: boolean;
}

export interface ShippingOption {
  method: string;
  cost: number;
  estimatedDays: number;
}

export type ListingStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "ended"
  | "sold"
  | "cancelled";

/**
 * The main Listing interface for data returned from the API (populated)
 */
export interface Listing {
  _id: string;
  name?: string;
  description: string;
  category: string | CategoryReference; // Populated or just ID
  seller: string | UserReference; // Populated or just ID
  startingPrice: number;
  currentPrice: number;
  reservePrice?: number;
  buyNowPrice?: number;
  bidIncrement: number;
  startTime: string | Date; // Using string or Date for ISO format
  endTime: string | Date;
  images: ListingImage[];
  status: ListingStatus;
  bids: Bid[];
  highestBidder?: string | UserReference;
  totalBids: number;
  views: number;
  watchCount: number;
  shippingCost: number;
  shippingOptions: ShippingOption[];
  isFeatured: boolean;
  isBoosted: boolean;
  boostExpiry?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Type for creating a new listing (excluding server-generated fields)
 */
export type CreateListingPayload = Omit<
  Listing,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "bids"
  | "totalBids"
  | "views"
  | "watchCount"
  | "highestBidder"
>;

/**
 * Type for updating an existing listing
 */
export type UpdateListingPayload = Partial<CreateListingPayload>;

/**
 * Type for the query parameters when fetching all listings
 */
export interface GetListingsQueryParams {
  status?: ListingStatus;
  seller?: string;
  category?: string;
  sortBy?: keyof Listing;
  limit?: number;
  skip?: number;
}
