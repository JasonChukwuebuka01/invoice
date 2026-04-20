import { Outlet } from 'react-router-dom';
import Sidebar from './components/sideBar';


function App() {

  return (
    <div className="flex h-screen w-screen">
      {/* This is where your Sidebar/Nav will go later */}
      <Sidebar />
      <main className="flex-1 h-screen border-2 border-black pl-[7%] overflow-x-hidden">
        <section className='h-screen border-2 border-red-500 flex  justify-center'>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default App;