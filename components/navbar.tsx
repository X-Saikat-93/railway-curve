"use client"; // Client-side interactivity

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/modeToggle"; // Your existing component
import { Menu } from "lucide-react"; // Icon for hamburger menu
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className='bg-background border-b sticky top-0 z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Left: Logo Heading */}
          <div className='flex-shrink-0'>
            <Link
              href='/'
              className='text-xl sm:text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-300 tracking-tight'>
              Railway Curve
            </Link>
          </div>

          {/* Middle: Menu Items (Desktop) */}
          <div className='hidden sm:flex space-x-6 lg:space-x-8 items-center'>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='relative text-foreground font-medium text-sm uppercase tracking-wide hover:text-primary hover:scale-105 transition-all duration-300 ease-in-out group'>
                {item.label}
                <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full' />
              </Link>
            ))}
          </div>

          {/* Right: Mode Toggle (Desktop) */}
          <div className='hidden sm:flex items-center'>
            <ModeToggle />
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className='sm:hidden flex items-center'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='hover:bg-muted transition-colors duration-200 rounded-full'>
                  <Menu className='h-6 w-6' />
                  <span className='sr-only'>Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side='left'
                className='w-[260px] sm:w-[300px] p-6 bg-background/95 backdrop-blur-md shadow-lg'>
                <SheetHeader>
                  <SheetTitle className='text-xl font-semibold text-foreground'>
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className='flex flex-col space-y-6 mt-6'>
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className='relative text-foreground font-medium text-lg hover:text-primary hover:scale-105 transition-all duration-300 ease-in-out group'
                      onClick={() => setIsOpen(false)}>
                      {item.label}
                      <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full' />
                    </Link>
                  ))}
                  {/* Mode Toggle in Sheet */}
                  <div className='pt-6 border-t'>
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
