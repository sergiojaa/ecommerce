'use client'
import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { useRouter } from 'next/navigation'
import useAdminAuth from '@/app/helpers/useAdminAuth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        useAdminAuth()
            .then((res) => {
                if (res === false) {
                    router.push('/profile')
                }
            })
            .catch(() => router.push('/profile'))

    }, [router])

    return (
        <div className='flex mt-[50px]'>
            <AdminSidebar />
            {children}
        </div>
    )
}
