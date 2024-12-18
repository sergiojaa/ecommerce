'use client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    // Log the search queries when the component mounts
    console.log('Search queries:', query);
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Page</h1>
      <p>
        Query Parameter: <span className="font-mono">{JSON.stringify(query)}</span>
      </p>
      {query.search && (
        <div>
          <p>You searched for: <span className="font-bold">{query.search}</span></p>
        </div>
      )}
    </div>
  );
}
