import Link from 'next/link'
import React from 'react'
import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'
import { currentUser } from '@clerk/nextjs/server'
import { syncUser } from '@/actions/user.action'
import Image from 'next/image'

export default async function Navbar() {
  
  const user = await currentUser()
  if(user) await syncUser()
    
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/icon.svg" 
              alt="Socially Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-primary font-mono tracking-wider">
              Socially
            </span>
          </Link>
        </div>

        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </div>
  </nav>

  )
}
