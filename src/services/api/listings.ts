import type {
  CreateListingPayload,
  GetListingsQueryParams,
  Listing,
  UpdateListingPayload,
} from "../types";
import apiClient from "./apiClient";

import type { AxiosResponse } from "axios";

// Base endpoint for listings
const LISTINGS_ENDPOINT = "/listing";

/**
 * Creates a new listing.
 * Corresponds to: createListing: async (req, res)
 * @param listingData The data for the new listing.
 * @returns The created Listing object.
 */
export const createListing = async (
  listingData: CreateListingPayload
): Promise<Listing> => {
  const response: AxiosResponse<Listing> = await apiClient.post(
    `${LISTINGS_ENDPOINT}/create`,
    listingData
  );
  return response.data;
};

/**
 * Fetches all listings, with optional filtering and pagination.
 * Corresponds to: getAllListings: async (req, res)
 * @param params Query parameters for filtering and pagination.
 * @returns An array of Listing objects.
 */
export const getAllListings = async (
  params: GetListingsQueryParams = {}
): Promise<Listing[]> => {
  const response: AxiosResponse<Listing[]> = await apiClient.get(
    LISTINGS_ENDPOINT,
    { params }
  );
  console.log({ response });
  return response.data;
};

/**
 * Fetches a single listing by its ID.
 * Corresponds to: getListingById: async (req, res)
 * @param id The ID of the listing.
 * @returns The requested Listing object.
 */
export const getListingById = async (id: string): Promise<Listing> => {
  const response: AxiosResponse<Listing> = await apiClient.get(
    `${LISTINGS_ENDPOINT}/${id}`
  );
  return response.data;
};

/**
 * Updates an existing listing.
 * Corresponds to: updateListing: async (req, res)
 * @param id The ID of the listing to update.
 * @param updateData The partial data to update.
 * @returns The updated Listing object.
 */
export const updateListing = async (
  id: string,
  updateData: UpdateListingPayload
): Promise<Listing> => {
  const response: AxiosResponse<Listing> = await apiClient.put(
    `${LISTINGS_ENDPOINT}/${id}`,
    updateData
  );
  return response.data;
};

/**
 * Deletes a listing by its ID.
 * Corresponds to: deleteListing: async (req, res)
 * @param id The ID of the listing to delete.
 * @returns A success message object.
 */
export const deleteListing = async (
  id: string
): Promise<{ message: string }> => {
  const response: AxiosResponse<{ message: string }> = await apiClient.delete(
    `${LISTINGS_ENDPOINT}/${id}`
  );
  return response.data;
};

/**
 * Fetches listings by a specific category ID.
 * Corresponds to: getListingsByCategory: async (req, res)
 * NOTE: Your server route seems to be /listings/category/:categoryId, which we'll assume here.
 * @param categoryId The ID of the category.
 * @returns An array of Listing objects.
 */
export const getListingsByCategory = async (
  categoryId: string
): Promise<Listing[]> => {
  // Assuming the server route is structured like /listings/category/:categoryId
  const response: AxiosResponse<Listing[]> = await apiClient.get(
    `${LISTINGS_ENDPOINT}/category/${categoryId}`
  );
  return response.data;
};
