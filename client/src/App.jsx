import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, AppLayout } from './pages';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="" element={<AppLayout />}>

                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
