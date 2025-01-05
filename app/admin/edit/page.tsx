import AdminLayout from '@/app/components/admin/AdminLayout'
import ProductCreator from '@/app/components/admin/ProductCreator'
import ProductEditor from '@/app/components/admin/ProductEditor'
import React from 'react'

export default function page() {
    return (
        <AdminLayout>
            <ProductEditor />
        </AdminLayout>
    )
}
