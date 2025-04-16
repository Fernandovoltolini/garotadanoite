
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type TableName = keyof Database['public']['Tables'];

export function useRealTimeUpdates<T>(table: TableName, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      const { data: initialResults, error } = await supabase
        .from(table)
        .select('*');

      if (initialResults) {
        setData(initialResults as T[]);
      }
    };

    fetchInitialData();

    // Set up real-time subscription
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: table 
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              setData(prevData => [...prevData, payload.new as T]);
              break;
            case 'UPDATE':
              setData(prevData => 
                prevData.map(item => 
                  (item as any).id === (payload.new as any).id 
                    ? payload.new as T 
                    : item
                )
              );
              break;
            case 'DELETE':
              setData(prevData => 
                prevData.filter(item => 
                  (item as any).id !== (payload.old as any).id
                )
              );
              break;
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table]);

  return data;
}
