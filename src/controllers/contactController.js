const Contact = require('../models/ContactModel');

exports.index = (request, response) => {
    response.render('contact', {
        contact: {}
    });
};

exports.register = async (request, response) => {
    try {
        const contact = new Contact(request.body);
        await contact.register();
        
        if(contact.errors.length > 0) {
            request.flash('errors', contact.errors);
            request.session.save(() => response.redirect('/contact/index'));
            return;
        }
    
        request.flash('success', 'Contact registered successfully.');
        request.session.save(() => response.redirect(`/contact/index/${contact.contact._id}`));
        return;
    } catch(e) {
        console.log(e);
        return response.render('404');
    }
};

exports.editIndex = async (request, response) => {
    if(!request.params.id) return response.render('404');

    const contact = await Contact.searchId(request.params.id);
    if(!contact) return response.render('404');

    response.render('contact', { contact });
};

exports.edit = async (request, response) => {
    try {
        if(!request.params.id) return response.render('404');
        const contact = new Contact(request.body);
        await contact.edit(request.params.id);
    
        if(contact.errors.length > 0) {
            request.flash('errors', contact.errors);
            request.session.save(() => response.redirect(`/contact/index/${request.params.id}`));
            return;
        }
    
        request.flash('success', 'Contact edited successfully.');
        request.session.save(() => response.redirect(`/contact/index/${request.params.id}`));
        return;
    } catch(e) {
        console.log(e);
        response.render('404');
    }
};

exports.delete = async (request, response) => {
    if(!request.params.id) return response.render('404');

    const contact = await Contact.delete(request.params.id);
    if(!contact) return response.render('404');

    request.flash('success', 'Contact deleted sucessfully.');
    request.session.save(() => response.redirect('/'));
    return;
};