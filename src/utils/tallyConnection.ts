/**
 * Utility functions for checking Tally connection status
 */

// Function to check if Tally is connected on the specified port
export const checkTallyConnection = async (
  host: string,
  port: number
): Promise<boolean> => {
  try {
    return await checkTallyServerConnection(host, port);
  } catch (error) {
    console.error("Error checking Tally connection:", error);
    return false;
  }
};

/**
 * Checks if Tally server is running and accessible at the specified host and port
 *
 * This function attempts to make a network request to the Tally server.
 * If the request succeeds, it means Tally is running and accessible.
 */
const checkTallyServerConnection = async (
  host: string,
  port: number
): Promise<boolean> => {
  try {
    // Construct the URL to the Tally server
    const url = `http://${host}:${port}`;

    // Create a fetch request with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    // Attempt to connect to the Tally server
    await fetch(url, {
      method: "HEAD", // Only fetch headers, not the entire content
      cache: "no-cache",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // If we get here, the fetch was successful
    return true;
  } catch (error) {
    console.log(`Failed to connect to Tally server at ${host}:${port}`, error);
    return false;
  }
};
