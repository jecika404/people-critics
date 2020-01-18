const topicCard = document.querySelector('.main');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const fixedNav = document.querySelector('.navbar');
const accountDetails = document.querySelector('.account-details');


const setupUI = (user) => {
    if(user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>logged in as: ${user.email}</div>
            <div>${doc.data().bio}</div>
            `;
            accountDetails.innerHTML = html;
        })
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else {
        // hide account info
        accountDetails.innerHTML = '';

        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }  
}

// setup topic
const setupTopic = (data) => {
    if(data.length) {
        
        let html = '';
        data.forEach(doc => {
            
            const topic = doc.data();
            const cardBody = `
            <div class="card mb-4">
            <div class="row no-gutters">
            <div class="col-4">
            <img src="assets/img/test.jpg" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body main-card">
                <h5 class="card-title">${topic.title}</h5>
                <p class="card-text">${topic.content}</p>
                <p class="card-text"><small class="text-muted">${topic.date}</small></p>
            </div>
            </div>
        </div>
        </div>
            `;
            html += cardBody;
           
        });

        topicCard.innerHTML = html;
        fixedNav.classList.remove('fixed-top');
        fixedNav.classList.add('nav-login');
    }else {
        topicCard.innerHTML = '';
        fixedNav.classList.remove('nav-login');
        fixedNav.classList.add('fixed-top');
        
    }
}