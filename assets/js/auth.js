
// auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        db.collection('topic').get().then(snapshot => {
            setupTopic(snapshot.docs);
            setupUI(user);
        });
    }else {
        setupUI();
        setupTopic([]);
    }
});

// sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    $('#modal-signup').modal('toggle');
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        signupForm.reset();

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