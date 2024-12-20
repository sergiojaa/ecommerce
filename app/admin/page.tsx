'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDropDownMenu from '../components/CategoryDropDownMenu';
import useAdminAuth from '../helpers/useAdminAuth';
import { useRouter } from 'next/navigation';
import ProductCreator from '../components/admin/ProductCreator';


export default function Page() {


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
    <ProductCreator />
  );
}
