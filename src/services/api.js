/**
 * Centralized API Service Client
 * Handles HTTP requests, base URL abstraction, headers, and error parsing.
 */

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
// Strip trailing slash if present
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

export const API_ENDPOINTS = {
  ORDERS: `${API_BASE_URL}/api/orders`,
  CONTACT: `${API_BASE_URL}/api/contact`
};

/**
 * Generic request helper
 */
async function request(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json().catch(() => ({})) : await response.text();

  if (!response.ok) {
    const errorMessage = (typeof data === 'object' && (data.error || data.message)) 
      ? (data.error || data.message) 
      : `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Submit customer order
 * @param {Object} orderPayload
 * @returns {Promise<Object>}
 */
export async function createOrder(orderPayload) {
  return request(API_ENDPOINTS.ORDERS, {
    method: 'POST',
    body: JSON.stringify(orderPayload)
  });
}

/**
 * Submit contact inquiry
 * @param {Object} contactPayload
 * @returns {Promise<Object>}
 */
export async function sendContactInquiry(contactPayload) {
  return request(API_ENDPOINTS.CONTACT, {
    method: 'POST',
    body: JSON.stringify(contactPayload)
  });
}

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  createOrder,
  sendContactInquiry
};
