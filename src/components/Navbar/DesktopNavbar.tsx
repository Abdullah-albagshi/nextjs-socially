import {
	SignInButton,
	UserButton,
} from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import { ToggleTheme } from '../ToggleTheme';
import { Button } from '../ui/button';
import Link from 'next/link';
import { BellIcon, HomeIcon, UserIcon } from 'lucide-react';

export default async function DesktopNavbar() {
	const user = await currentUser();

	return (
    <div className="hidden md:flex items-center space-x-4">

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
      <ToggleTheme />

    </div>
	);
}
