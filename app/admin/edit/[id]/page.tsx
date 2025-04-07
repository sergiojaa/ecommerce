'use client'
import AdminLayout from '@/app/components/admin/AdminLayout'
import ProductEditor from '@/app/components/admin/ProductEditor'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Page() {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    return (
        <AdminLayout>
            <ProductEditor id={id} />
        </AdminLayout>
    )
}
