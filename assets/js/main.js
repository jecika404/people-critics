const topicCard = document.querySelector('.card');

// setup topic
const setupTopic = (data) => {
    let html = '';
    data.forEach(doc => {
        const topic = doc.data();
        const cardBody = `
        <div class="card-body">
              <h5 class="card-title">${topic.title}</h5>
              <p class="card-text">${topic.content}</p>
              <p class="card-text"><small class="text-muted">${topic.date}</small></p>
        </div>
        <img class="card-img-bottom" src="assets/img/test.jpg" alt="Card image cap">
        `;
        html += cardBody;
    });

    topicCard.innerHTML = html;
}