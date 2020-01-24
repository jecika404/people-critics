// Add Admin - Cloud Functions
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
        $('#modal-rola').modal('toggle');
    });
});


// Auth Status Changes
auth.onAuthStateChanged(user => {
    if(user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
        db.collection('topic').orderBy('created_at').onSnapshot(snapshot => {
            setupTopic(snapshot.docs);
            
        }, err => {
            console.log(err.message);
        });
        db.collection('chats').orderBy('created_at').onSnapshot(snapshot => {
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


// Chats
const formMessage = document.querySelector('#message-form');

formMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    const now = new Date();
    db.collection('chats').add({
        message: formMessage['message'].value.trim(),
        username: formMessage['chatName'].value.trim(),
        created_at: firebase.firestore.Timestamp.fromDate(now)

    }).then(() => {
        document.getElementById('message').value='';
        
    })   
});


// Admin - Create New Topic
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const now = new Date();
    db.collection('topic').add({
        title: createForm['title'].value.trim(),
        content: createForm['content'].value.trim(),
        created_at: firebase.firestore.Timestamp.fromDate(now)

    }).then(() => {
        createForm.reset();
        $('#modal-create').modal('toggle');
        
    }).catch(err => {
        console.log(err);
    });
});



// Sign Up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value.trim();
    const password = signupForm['signup-password'].value.trim();
    
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            username: signupForm['username'].value.trim()
          });
    }).then(() => {
        signupForm.reset();
        $('#modal-signup').modal('toggle');
    }).catch(err => {
        signupForm.querySelector('.alert').classList.remove('d-none');
        signupForm.querySelector('.alert').innerHTML = err.message;
        
    });
});

// Log Out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {

    });
});

// Log In
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value.trim();
    const password = loginForm['login-password'].value.trim();
    
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        loginForm.reset();
        $('#modal-login').modal('toggle');
    }).catch(err => {
        loginForm.querySelector('.alert').classList.remove('d-none');
        loginForm.querySelector('.alert').innerHTML = err.message;
        
    });

});