import { useRouter } from 'next/router';
import React from 'react'

const Error = () => {
    const router = useRouter();
    const { error } = router.query
  return (
    <div>{error}</div>
  )
}

export default Error