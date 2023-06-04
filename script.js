const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const topicContainer = document.getElementById('topicContainer');

// Sample topic data
const topics = [
  { title: 'Topic 1', description: 'This is the description for Topic 1.' },
  { title: 'Topic 2', description: 'This is the description for Topic 2.' },
  { title: 'Topic 3', description: 'This is the description for Topic 3.' },
  // Add more topics here
];

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  const filteredTopics = topics.filter(function(topic) {
    return topic.title.toLowerCase().includes(searchTerm);
  });
  displayTopics(filteredTopics);
});

function displayTopics(topics) {
  topicContainer.innerHTML = '';
  topics.forEach(function(topic) {
    const topicElement = document.createElement('div');
    topicElement.classList.add('topic');
    topicElement.innerHTML = `
      <h2>${topic.title}</h2>
      <p>${topic.description}</p>
    `;
    topicContainer.appendChild(topicElement);
  });
}

// Display all topics on page load
displayTopics(topics);

// Function to fetch topics from an API
async function fetchTopics() {
    try {
      const response = await fetch('https://www.boredapi.com/api/activity');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching topics:', error);
      return [];
    }
  }
  
  // Function to display loading message
  function displayLoading() {
    topicContainer.innerHTML = '<p>Loading...</p>';
  }
  
  // Function to display error message
  function displayError() {
    topicContainer.innerHTML = '<p>Error fetching topics.</p>';
  }
  
  // Function to initialize the website
  async function initialize() {
    displayLoading();
  
    try {
      const topics = await fetchTopics();
      displayTopics(topics);
    } catch (error) {
      displayError();
    }
  }
  
  // Initialize the website
  initialize();