// add admin cloud functions
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
        console.log(result);
    });
});


// auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
        db.collection('topic').onSnapshot(snapshot => {
            setupTopic(snapshot.docs);
            
        }, err => {
            console.log(err.message);
        });
        db.collection('messages').onSnapshot(snapshot => {
            setupChat(snapshot.docs);
            
        }, err => {
            console.log(err.message);
        });
    }else {
        setupUI();
        setupTopic([]);
        setupChat([]);
    }
});


// chat
const formMessage = document.querySelector('#message-form');
formMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('messages').add({
        message: formMessage['message'].value,
        chatName: formMessage['chatName'].value
    }).then(() => {

    
    })
});


// create new topic
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $('#modal-create').modal('toggle');

    db.collection('topic').add({
        title: createForm['title'].value,
        content: createForm['content'].value,
        date: createForm['date'].value,

    }).then(() => {
        createForm.reset();
        
    }).catch(err => {
        console.log(err.message);
    });
});

// sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value,
            username: signupForm['username'].value

          });
    }).then(() => {
        signupForm.reset();
        $('#modal-signup').modal('toggle');
    }).catch(err => {
        
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {

    });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    $('#modal-login').modal('toggle');
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        loginForm.reset();

    });

});