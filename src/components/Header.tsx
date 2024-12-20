import { useTheme } from '@/context/themeContext';
import { Button, Layout } from 'antd';

const { Header: HeaderComp } = Layout;

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <HeaderComp className="sticky top-0 z-10 flex items-center justify-between bg-blue-500 p-4">
      <p className="text-2xl text-white">Blog Post APP</p>
      <Button
        onClick={toggleTheme}
        className={`rounded-full p-3 transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-800 text-white hover:bg-gray-700'
            : 'bg-gray-200 text-black hover:bg-gray-300'
        }`}
      >
        {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </Button>
    </HeaderComp>
  );
};

export default Header;
