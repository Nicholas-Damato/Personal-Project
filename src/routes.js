import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import MiniPage from './components/MiniPage'
import MountPage from './components/MountPage'
import UserPage from './components/UserPage'
import Info from './components/Info'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/mini' component={MiniPage} />
        <Route path='/mount' component={MountPage} />
        <Route path='/user' component={UserPage} />
        <Info path='/info' componen={Info} />
    </Switch>
)