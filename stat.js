fetch('http://localhost:3000/stat', {
  method: 'GET', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}).then(async resp=>{
  
  const dataArr = await resp.json()
  for (const review of dataArr){
    const tr = document.createElement('tr')
    
    const idCell = document.createElement('td')
    idCell.innerText = review.specialistID
    
    const ratingCell = document.createElement('td')
    ratingCell.innerText = review.starRate
    
    const reviewCell = document.createElement('td')
    reviewCell.innerText = review.review
    
    const dateCell = document.createElement('td')
    dateCell.innerText = new Date(review.date).toLocaleString("uk-UA")
    
    tr.appendChild(idCell)
    tr.appendChild(ratingCell)
    tr.appendChild(reviewCell)
    tr.appendChild(dateCell)
    document.getElementById('statTable').appendChild(tr)
  }
})