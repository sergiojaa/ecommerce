'use client'
import React, { useEffect } from 'react';
import useAdminAuth from '../helpers/useAdminAuth';
import { useRouter } from 'next/navigation';
import ProductCreator from '../components/admin/ProductCreator';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminLayout from '../components/admin/AdminLayout';


export default function Page() {

  return (
    <AdminLayout>
      <div className='flex-[2]'>
        მოგესალმებით ადმინ პანელზე
      </div>
    </AdminLayout>
  );
}
