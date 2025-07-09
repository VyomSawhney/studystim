'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

interface WaitlistEntry {
  id: string
  email: string
  timestamp: Date
  source: string
  status: string
}

export default function AdminPage() {
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const waitlistRef = collection(db, 'waitlist')
        const q = query(waitlistRef, orderBy('timestamp', 'desc'))
        const querySnapshot = await getDocs(q)
        
        const data: WaitlistEntry[] = []
        querySnapshot.forEach((doc) => {
          const docData = doc.data()
          data.push({
            id: doc.id,
            email: docData.email,
            timestamp: docData.timestamp.toDate(),
            source: docData.source,
            status: docData.status
          })
        })
        
        setWaitlistData(data)
      } catch (error) {
        console.error('Error fetching waitlist:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWaitlist()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">StudyStim Waitlist</h1>
            <div className="text-sm text-gray-500">
              Total signups: {waitlistData.length}
            </div>
          </div>

          {waitlistData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No waitlist signups yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Source</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {waitlistData.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{entry.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {entry.timestamp.toLocaleDateString()} {entry.timestamp.toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{entry.source}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 