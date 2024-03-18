import validator from "validator";

export default class Contact {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }
    
    validate(e) {
        const el = e.target;
        const nameInput = el.querySelector('input[name="name"]');
        const lastNameInput = el.querySelector('input[name="lastname"]');
        const emailInput = el.querySelector('input[name="email"]');
        const phoneInput = el.querySelector('input[name="phone"]');
        let error = false;

        
        if(!nameInput.value || !lastNameInput.value) {
            alert('Name and lastname are a required fields.');
            error = true;
        }
        
        if(!validator.isEmail(emailInput.value)) {
            alert('Invalid e-mail');
            error = true;
        }
        
        if (!emailInput.value && !phoneInput.value) {
            alert('Provide at least one email or phone number.');
        }

        
        if(!error) el.submit();
    }

}