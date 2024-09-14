import { SignIn } from '@clerk/clerk-react'
// import './signInPage.css'

export default function SignInPage() {
  return <div className="flex items-center justify-center h-full">
    <SignIn path="/sign-in" signUpUrl='sign-up' forceRedirectUrl={"/dashboard"}/>
  </div>
}