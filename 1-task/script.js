async function fetchUser() {
    const username = document.getElementById('username').value;
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
  
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('Username topilmadi');
  
      const userData = await userResponse.json();
      updateProfile(userData);
  
      const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const repoData = await repoResponse.json();
      showRepositories(repoData);
  
      loading.style.display = 'none';
    } catch (error) {
      alert(error.message);
      loading.style.display = 'none';
    }
  }
  
  function updateProfile(data) {
    document.getElementById('profile-img').src = data.avatar_url;
    document.getElementById('name').innerText = data.name || 'No name';
    document.getElementById('username-display').innerText = data.login;
    document.getElementById('bio').innerText = data.bio || 'No bio';
    document.getElementById('company').innerText = data.company || 'No company';
    document.getElementById('location').innerText = data.location || 'No location';
    document.getElementById('followers').innerText = data.followers;
    document.getElementById('following').innerText = data.following;
  }
  
  function showRepositories(repos) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '';
    repos.slice(0, 5).forEach(repo => {
      const li = document.createElement('li');
      li.innerText = `${repo.name} - ${repo.language} - Stars: ${repo.stargazers_count} - Forks: ${repo.forks_count}`;
      repoList.appendChild(li);
    });
  }
  