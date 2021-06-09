import './styles.css';
import routes  from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="App">
      { routes }
      <ToastContainer 
  position="bottom-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={true}
  rtl={false}
  pauseOnFocusLoss={false}
  draggable={false}
  pauseOnHover={true}
/>
    </div>
  );
}

export default App;
