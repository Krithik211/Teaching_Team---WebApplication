// client/src/hooks/useCourseTopTutors.ts
import { useState, useEffect } from 'react';
import { userApi } from '@/services/api';
import { CourseStat } from "@/types/Course";

export function useCourseTopTutors(lecturerId: number) {
  const [stats, setStats]     = useState<CourseStat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]     = useState<string>('');

  useEffect(() => {
    if (!lecturerId) {
      setStats([]);
      setError('');
      return;
    }

    setLoading(true);
    userApi
  .getTopTutorsByLecturer(lecturerId)
  .then(statsArray => {
    console.log('📊 topTutors API response:', statsArray);
    setStats(statsArray);
    setError('');
  })
      .catch(err => {
        console.error('Error fetching top tutors:', err);
        setError('Unable to load course statistics.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lecturerId]);

  return { stats, loading, error };
}
