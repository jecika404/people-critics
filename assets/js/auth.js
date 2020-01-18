

// auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        db.collection('topic').onSnapshot(snapshot => {
            setupTopic(snapshot.docs);
            setupUI(user);
        })
    }else {
        setupUI();
        setupTopic([]);
    }
});

// create new topic
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $('#modal-create').modal('toggle');
    db.collection('topic').add({
        title: createForm['title'].value,
        content: createForm['content'].value,
        date: createForm['date'].value
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
    $('#modal-signup').modal('toggle');
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
          });
        

    }).then(() => {
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