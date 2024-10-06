import { SignUp } from '@clerk/clerk-react';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <SignUp 
        path="/sign-up" 
        signInUrl="/sign-in" 
      />
    </div>
  );
};

export default SignUpPage;
