import { SignUp } from '@clerk/clerk-react'
// import './signUpPage.css'

export default function SignUpPage() {
  return (<div className="flex items-center justify-center h-full">
    <SignUp path="/sign-up" signInUrl='sign-in'/>
  </div>)
}