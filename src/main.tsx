import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import './index.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './Store.ts';
import FooterNavigator from './pages/main/footer/FooterNavigator.tsx';
import Header from './pages/main/header/Header.tsx';
import { EMainPage } from './types/enums.ts';

const ProfilePage = () => (
  <div>
    <h1>Profile</h1>
    <p>Welcome to your profile! Here you can update your personal information and see your activity.</p>
  </div>
);

const CommunitiesPage = () => (
  <div>
    <h1>Communities</h1>
    <p>Discover and join communities that match your interests.</p>
  </div>
);

const AddCommunityPage = () => (
  <div>
    <h1>Add Community</h1>
    <p>Start your own community and connect with others who share your passion.</p>
  </div>
);

const FindPage = () => (
  <div>
    <h1>Search</h1>
    <p>Find new opportunities and explore the world around you.</p>
  </div>
);

const MainApp = () => {
  const [currentView, setCurrentView] = useState(EMainPage.Profile);

  const renderContent = () => {
    switch (currentView) {
      case EMainPage.Profile:
        return <ProfilePage />;
      case EMainPage.Communities:
        return <CommunitiesPage />;
      case EMainPage.AddCommunity:
        return <AddCommunityPage />;
      case EMainPage.Find:
        return <FindPage />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <StrictMode>
      <Header />
      <Provider store={store}>
        <div className="main-content">{renderContent()}</div>
      </Provider>
      <FooterNavigator setCurrentView={setCurrentView} currentPage={currentView} />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<MainApp />);
