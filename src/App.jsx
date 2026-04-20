import { Outlet } from 'react-router-dom';


function App() {

  return (
    <div className="app-shell">
      {/* This is where your Sidebar/Nav will go later */}
      <nav style={{ padding: '20px', background: '#eee' }}>
        Sidebar / Navigation Placeholder
      </nav>

      <main>

        <Outlet />
      </main>
    </div>
  );
}

export default App;