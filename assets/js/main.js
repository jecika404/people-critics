const topicCard = document.querySelector('.card');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const fixedNav = document.querySelector('.navbar');


const setupUI = (user) => {
    if(user) {
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else {
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