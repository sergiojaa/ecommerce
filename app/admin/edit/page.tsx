import AdminLayout from '@/app/components/admin/AdminLayout'
import ProductEditor from '@/app/components/admin/ProductEditor'
import React from 'react'

export default function page() {
    return (
        <AdminLayout>
            <ProductEditor />
        </AdminLayout>
    )
}
