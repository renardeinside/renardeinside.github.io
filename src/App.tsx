import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Index from './pages/Index';
import Valentine from './pages/Valentine';

function App() {
  return (
    <main>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/valentine" element={<Valentine />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
