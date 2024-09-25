import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
// import './rootLayout.css'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, useAuth, UserButton } from '@clerk/clerk-react'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import MobileMenu from '../../components/mobile/MobileMenu'

const RootLayout = () => {
    const { userId } = useAuth()
    const location = useLocation().pathname

    // protected clerk
 const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 const FRONTEND_API = import.meta.env.VITE_CLERK_FRONTEND_API;

 console.log(PUBLISHABLE_KEY,FRONTEND_API);
 

 if (!PUBLISHABLE_KEY || !FRONTEND_API) {
   throw new Error("Missing Publishable Key or Frontend API");
 }

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <div className=" h-screen flex flex-col">
                <header className="flex items-center justify-between ">
                    {/* mobile menu */}
                    {userId && <div className="lg:hidden px-5 xl:px-16">
                        <MobileMenu />
                    </div>}
                    <Link to="/" className={`flex items-center font-bold py-4 gap-2 ps-5 xl:ps-16 ${location !== "/" && " lg:bg-[#1e1e1e] lg:w-[21.35rem] xl:w-[24.1rem]"} `}>
                        <img src="/logo.png" alt="" className="w-8 h-8" />
                        <span>CHAT AI</span>
                    </Link>
                    <div className="user px-5 xl:px-16">
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </header>
                <main className="flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </QueryClientProvider>

    )
}

export default RootLayout