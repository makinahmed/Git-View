let repositoriesBtn = document.getElementById('repositories-btn')
let followersBtn = document.getElementById('followers-btn')
repositoriesBtn.style.display = 'none'
followersBtn.style.display = 'none'


const loadData = () => {
    let input = document.getElementById('input-field')
    let userName = input.value;
    fetch(`https://api.github.com/users/${userName}`)
        .then(res => res.json())
        .then(data => displayProfile(data))
        .catch(() => {
            input.value = ''
        })

}

// myprofile 

const displayProfile = (user) => {
    let profile = document.getElementById('profile');
    let div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
                    <img src="${user.avatar_url}" class="card-img-top ">
                    <h2>${user.name}</h2>
                    <p>${user.login}</p>
                    <p>${user.bio}</p>
                    <span><i class="fas fa-arrow-right"></i>  Followers:${user.followers} <i class="fas fa-arrow-right"></i>  Following:${user.following}</span> 
                   
                   
                    <div class="card-body ">
                    <p>Location: ${user.location}</p>
                    </div>
    `
    profile.appendChild(div);
    document.getElementById('findUser').style.display = 'none'
    repositoriesBtn.style.display = 'block'
followersBtn.style.display = 'block'
    loadSubscriptions(user)

}

// subscription

const loadSubscriptions = (user) => {

    fetch(`https://api.github.com/users/${user.login}/subscriptions`)
        .then(res => res.json())
        .then(data => displaySubscriptions(data))

}



const displaySubscriptions = (data) => {
    let subscriptions = document.getElementById('subscriptions')

    data.map(subscription => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.classList.add('col-lg-6')
        div.classList.add('p-4')
        div.innerHTML = `
        <h3>Repository Name : ${subscription.name}</h3>
        <p>About Repository : ${subscription.description || "Not Available"}</p>
        <p>Languages: ${subscription.language || "Not Available"}</p>
        <p>Last Update: ${subscription.updated_at}</p>
        <a  class="btn btn-primary w-50 mb-3 mx-auto" href="${subscription.svn_url}|| 'NOT FOUND!'">Visit Repository</a>  <a class="btn btn-success w-50 mx-auto" href="${subscription.homepage} || 'NOT FOUND!'">Visit Live Site</a>
       
`
        subscriptions.appendChild(div);
    })
}

const loadFollowers = () => {
    fetch(`https://api.github.com/users/makinahmed/followers`)
        .then(res => res.json())
        .then(data => displayFollowers(data))
}

const displayFollowers = (data) => {
    let followers = document.getElementById('followers-container')
    data.map(follower => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.classList.add('col-lg-3')
        div.innerHTML = ` 
        <img src="${follower.avatar_url}" class="card-img-top" style="width:50%; height: 50%">
        <h3>Name : ${follower.login}</h3>
        <a  class="btn btn-primary w-50 mb-3 mx-auto" href="${follower.url}|| 'NOT FOUND!'">Visit Repository</a> 
      
        `
        followers.appendChild(div);
    })
}





const showFollowers = () => {
    document.getElementById('repositories').style.display = 'none'
    loadFollowers();
    document.getElementById('follower-container').style.display = 'block'

}


const showRepository = () => {
    document.getElementById('follower-container').style.display = 'none'
    document.getElementById('repositories').style.display = 'block'
}