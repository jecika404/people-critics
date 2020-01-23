const topicCard = document.querySelector('.main');
const bodyMessage = document.querySelector('.body-message');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const fixedNav = document.querySelector('.navbar');
const accountDetails = document.querySelector('.account-details');
const userDetails = document.querySelector('.user-details');
const adminItems = document.querySelectorAll('.admin');


const setupUI = (user) => {
    if(user) {
        // account info
        if(user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        }
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div class="p-2">
                <div class="mb-3">
                    <svg class="nav-icon mr-2">
                        <use xlink:href="assets/img/sprite.svg#icon-supervised_user_circle"></use>
                    </svg>
                    <span class="nav-email">${user.admin ? 'Admin' : 'User' }</span>
                </div>
                <div class="mb-3">
                    <svg class="nav-icon mr-2">
                        <use xlink:href="assets/img/sprite.svg#icon-person"></use>
                    </svg>
                    <span class="nav-email">${user.email}</span>
                </div>
            </div>
            `;
            accountDetails.innerHTML = html;

        })
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <svg class="nav-icon">
                <use xlink:href="assets/img/sprite.svg#icon-person"></use>
            </svg>
            <span class="nav-email">${doc.data().username}</span>  
            `;
            userDetails.innerHTML = html;
        });
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else {
        adminItems.forEach(item => item.style.display = 'none');

        // hide account info
        accountDetails.innerHTML = '';

        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }  
}

// Setup Topic
const setupTopic = (data) => {
    if(data.length) {
        
        let html = '';
        data.forEach(doc => {
            const topic = doc.data();
            const when = dateFns.distanceInWordsToNow(
                topic.created_at.toDate(),
                { addSuffix: true }
            );  
            const cardBody = `
            <div class="col-sm-6">
            <div class="card">
            <div class="card-body">
                <div class="header-card admin">
                    <h5 class="card-title">${topic.title}</h5>
                    <a href="#" class="delete">
                        <svg class="svg-delete">
                            <use xlink:href="assets/img/sprite.svg#icon-clearclose"></use>
                        </svg>
                    </a>
                </div>
                <p class="card-text">${topic.content}</p>
                <span class="card-text text-muted">${when}</span>
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

// setup chat room
const setupChat = (data) => {
    if(data.length)  {       
        let html = '';

        data.forEach(doc => {  
            const chats = doc.data();
            const when = dateFns.distanceInWordsToNow(
                chats.created_at.toDate(),
                { addSuffix: true }
            );
            const lists = `
              <ul class="list-group">
                <li class="list-group-item list-group-item-action list-group-item-light">
                    <span class="mr-2 username-color">${chats.username}</span>
                    <span>${chats.message}</span>
                    <div><small>${when}</small></div>
                </li>
              </ul>
            `;
            html += lists;
           
        });
        bodyMessage.innerHTML = html;

    }else {
        bodyMessage.innerHTML = '';
  
    }
}

