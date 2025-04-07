function loadContent(section) {
    const contentDiv = document.getElementById('content');
    const links = document.querySelectorAll('.topnav a');

    // Clear existing content and reset active class
    contentDiv.innerHTML = '';
    links.forEach(link => link.classList.remove('active'));
    
    // Mark the clicked link as active
    document.querySelector(`.topnav a[href="#${section}"]`)?.classList.add('active');

    // Use fetch function for content loading
    const filePath = `public/${section}.html`;
    
    fetch(filePath)
        .then(response => response.text())
        .then(data => contentDiv.innerHTML = data)
        .catch(error => {
            console.error(`Error loading ${section} content:`, error);
            contentDiv.innerHTML = `<p>Failed to load ${section.charAt(0).toUpperCase() + section.slice(1)} content.</p>`;
        });
}

function loadContentFromLogo() {
  loadContent('home');

  // Ensure the 'Home' nav link gets the active class
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  document.querySelector('.nav-links a[href="#home"]')?.classList.add('active');
}


// Load Home section by default when the page loads
window.onload = () => loadContent('home');


document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('modeToggle');
    const themeLink = document.getElementById('themeStylesheet');
  
    // Load saved mode from localStorage
    const savedMode = localStorage.getItem('theme') || 'light';
    setTheme(savedMode);
  
    toggleBtn.addEventListener('click', () => {
      const currentTheme = themeLink.getAttribute('href').includes('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  
    function setTheme(mode) {
      themeLink.setAttribute('href', `/src/${mode}mode.css`);
      localStorage.setItem('theme', mode);
      document.getElementById('modeToggle').innerHTML =
        mode === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
  });
  