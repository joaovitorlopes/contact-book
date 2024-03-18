import 'core-js/stable';
import 'regenerator-runtime/runtime';


// Signin and Signup validation
import Login from './modules/Login';
const register = new Login('.form-register');
const login = new Login('.form-login');
register.init();
login.init();

// Contact save/edit validation
import Contact from './modules/Contact';
const edit = new Contact('.form-edit');
const save = new Contact('.form-save');
edit.init();
save.init();

// import './assets/css/style.css';

