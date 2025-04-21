"use client"

import { useState, useEffect } from "react"
import { useFirebase } from "/contexts/firebase-context"

export function useFirebaseData<T>(
  collectionName: string,
  id?: string,
  queryField?: string,
  queryOperator?: any,
  queryValue?: any,
  fallbackData?: T,
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { getDocuments, getDocumentById, queryDocuments, isReady } = useFirebase()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        if (!isReady) {
          if (fallbackData) {
            setData(fallbackData)
          }
          setLoading(false)
          return
        }

        let result

        if (id) {
          // Fetch a single document by ID
          result = await getDocumentById(collectionName, id)
        } else if (queryField && queryOperator && queryValue !== undefined) {
          // Fetch documents by query
          result = await queryDocuments(collectionName, queryField, queryOperator, queryValue)
        } else {
          // Fetch all documents in the collection
          result = await getDocuments(collectionName)
        }

        if (!result && fallbackData) {
          setData(fallbackData)
        } else {
          setData(result as T)
        }
      } catch (err) {
        console.error(`Error fetching data from ${collectionName}:`, err)
        setError(err as Error)
        if (fallbackData) {
          setData(fallbackData)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [
    collectionName,
    id,
    queryField,
    queryOperator,
    queryValue,
    fallbackData,
    getDocuments,
    getDocumentById,
    queryDocuments,
    isReady,
  ])

  return { data, loading, error }
}
