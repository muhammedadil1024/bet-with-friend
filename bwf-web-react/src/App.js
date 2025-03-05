import Header from './components/layout/Header';
import Main from "./components/layout/Main";
import Sidebar from "./components/layout/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom'
import "./App.css";
import Theme from './Theme';
import { AuthProvider } from './components/hooks/UseAuth';
import { useState } from 'react';
import Footer from './components/layout/Footer';

function App() {

    const user = JSON.parse(localStorage.getItem('bwf-user'));

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <ThemeProvider theme={Theme}>
        <AuthProvider user={user}>
            <BrowserRouter>
                <div className="App">
                    <header className="App-header">
                        <Header />                      
                    </header>
                    <section className="general-content">
                            <Sidebar open={open} toggleDrawer={toggleDrawer} />
                            <Main />
                    </section>
                    <footer>
                        <Footer />
                    </footer>
                </div>
            </BrowserRouter>
        </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
