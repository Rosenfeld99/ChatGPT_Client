import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChatList from '../../components/chatList/ChatList';

const DashboardLayout: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  // if (!isLoaded) return "Loading... uuuu";
  return (
    <div className="flex xl:gap-12 h-full">
      {/* desktop menu */}
      <div className="hidden lg:block">
        <ChatList />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
