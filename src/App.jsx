import { Outlet } from 'react-router-dom';
import Sidebar from './components/sideBar';
import { useState } from 'react';


function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-red-500">
      {/* This is where your Sidebar/Nav will go later */}
      <Sidebar />
      <main className="flex-1 h-screen bg-[#141625] p-3 lg:pl-[7%] overflow-x-hidden ">
        <section className='lg:h-screen flex  justify-center pt-[20%] lg:pt-[4%]  '>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default App;