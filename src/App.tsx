// TODO: Add routing

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import JobTracking from "./pages/JobTrackingPage";

function App() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[50px_1fr] h-screen">
      <Header />
      <Sidebar />
      <div className="col-start-2 col-end-2 row-[span] w-full p-6">
        <JobTracking />
      </div>
    </div>
  );
}

export default App;
