'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Experience = {
  id: string
  title: string
  company: string
  location: string
  start_date: string
  end_date: string | null
  description: string | null
}

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('experience')
        .select('*')   // ✅ no order by order_rank

      if (error) {
        console.error(error)
      } else {
        setExperience(data || [])
      }
    }

    fetchData()
  }, [])

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Experience</h1>

      {experience.length === 0 ? (
        <p className="text-gray-500">No experience data found.</p>
      ) : (
        experience.map((job) => (
          <div key={job.id} className="mb-8">
            <h2 className="text-xl font-semibold">
              {job.title} – {job.company}
            </h2>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-sm text-gray-400">
              {job.start_date} – {job.end_date || 'Present'}
            </p>

            {job.description && (
              <ul className="list-disc ml-6 mt-2 space-y-1">
                {job.description.split('\n').map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </main>
  )
}
