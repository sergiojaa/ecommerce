import AdminLayout from '@/app/components/admin/AdminLayout'
import ProductCreator from '@/app/components/admin/ProductCreator'
import React from 'react'

export default function page() {
    return (
        <AdminLayout>
            <ProductCreator />
        </AdminLayout>
    )
}
