import RegisterForm from '@/components/register-form'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <RegisterForm />
        </Suspense>
    )
}

export default page
