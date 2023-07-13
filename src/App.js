import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Listing from 'views/Listing';
import AddTransaction from 'views/AddTransaction';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Listing />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
              <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
      </Router>
  );
};

export default App;
