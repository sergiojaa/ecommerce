'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
    const searchParams = useSearchParams()

    useEffect(() => {

    }, [searchParams])

    return (
        <div>page</div>
    )
}
