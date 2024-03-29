import './css/custom.css';
import './css/style.default.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import Detail from './Detail/Detail';
import History from './History/History';
import Home from './Home/Home';
import Chat from './Share/Chat/Chat';
import Footer from './Share/Footer/Footer';
import Header from './Share/Header/Header';
import Shop from './Shop/Shop';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />

                <Switch>

                    <Route exact path='/' component={Home} />
                    <Route path='/detail/:id' component={Detail} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/history' component={History} />
                    <Route path='/shop' component={Shop} />

                </Switch>
            </BrowserRouter>

            <Chat />

            <Footer />
        </div>
    );
}

export default App;
