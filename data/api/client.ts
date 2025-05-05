import { useAuth } from '@clerk/nextjs'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
  }
}

// Base API client without authentication
export const apiClient = {
  async fetch<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new ApiError(response.status, error.message || 'An error occurred')
    }

    // Check if response has content before parsing JSON
    const contentLength = response.headers.get('content-length')
    const hasContent = contentLength && parseInt(contentLength) > 0

    // If no content, return undefined for void responses
    if (!hasContent) {
      return undefined as T
    }

    return response.json()
  }
}

// Hook to use the API client with authentication
export function useApiClient() {
  const { getToken } = useAuth()

  return {
    async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      const token = (await getToken()) || undefined
      return apiClient.fetch<T>(endpoint, options, token)
    }
  }
}
