const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdIn: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.valid();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body);
    }

    valid() {
        this.cleanUp();

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail');
        if (!this.body.name) this.errors.push('Name is a required field.');
        if (!this.body.email && !this.body.phone) {
            this.errors.push('Provide at least one email or phone number.');
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
    
        this.body = {
            name: this.body.name,
            lastname: this.body.lastname,
            email: this.body.email,
            phone: this.body.phone,
        };
    }

    async edit(id) {
        if(typeof id !== 'string') return;
        this.valid();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async searchId(id) {
        if(typeof id !== 'string') return;
        const contact = await ContactModel.findById(id);
        return contact;
    }

    static async searchContacts() {
        const contacts = await ContactModel.find()
            .sort({ createdIn: -1 });
        return contacts;
    }

    static async delete(id) {
        if(typeof id !== 'string') return;
        const contact = await ContactModel.findOneAndDelete({ _id: id });
        return contact;
    }
}

module.exports = Contact;
