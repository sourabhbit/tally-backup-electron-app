/**
 * Utility functions for checking internet connectivity
 */

// List of reliable endpoints to check for internet connectivity
const RELIABLE_ENDPOINTS = [
  "https://www.google.com",
  "https://www.cloudflare.com",
  "https://www.microsoft.com",
  "https://www.amazon.com",
];

// Function to check if internet is connected
export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    return await checkConnectivity();
  } catch (error) {
    console.error("Error checking internet connection:", error);
    return false;
  }
};

/**
 * Checks internet connectivity by attempting to fetch from reliable endpoints
 *
 * This function tries to fetch from multiple reliable endpoints with a timeout.
 * If any of the fetch requests succeed, it means the internet is connected.
 */
const checkConnectivity = async (): Promise<boolean> => {
  // Try to fetch from one of the reliable endpoints with a timeout
  const endpoint =
    RELIABLE_ENDPOINTS[Math.floor(Math.random() * RELIABLE_ENDPOINTS.length)];

  try {
    // Create a fetch request with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    await fetch(endpoint, {
      method: "HEAD", // Only fetch headers, not the entire content
      mode: "no-cors", // This prevents CORS issues
      cache: "no-cache",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // If we get here, the fetch was successful
    return true;
  } catch (error) {
    // If the fetch failed, try the navigator.onLine property as a fallback
    // Note: This is not always reliable but can be used as a secondary check
    console.log("Fetch failed, falling back to navigator.onLine:", error);
    return navigator.onLine;
  }
};
