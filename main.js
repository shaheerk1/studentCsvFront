//Event Listeners
document
  .getElementById('buttonForSearch')
  .addEventListener('click', searchClicked)

document.getElementById('buttonForAdd').addEventListener('click', addClicked)

//Function for search click event
function searchClicked() {
  //get input and prepare link for ajax
  const stdNo = document.getElementById('StudentNoForSearch').value

  const link = `https://studentcsv.herokuapp.com/students/${stdNo}`
  console.log(link)

  let studendData = {}

  //create ajax get request to the link and set response to above object
  var xhttp = new XMLHttpRequest()
  xhttp.onload = async function () {
    if (this.status == 200) {
      const output = await this.response
      studendData = JSON.parse(output)
      console.log(studendData)
      setDom()
    }
  }
  xhttp.open('GET', link, true)
  xhttp.send()

  //set respose Data to Dom

  function setDom() {
    console.log(studendData)
    document.getElementById('studentNo').innerHTML = studendData.studentNo
    document.getElementById('firstName').innerHTML = studendData.firstName
    document.getElementById('lastName').innerHTML = studendData.lastName
  }
}

//Function for Add click event
function addClicked() {
  //get input and make it an object then convert it to json also prepare link for ajax
  const stdNo = document.getElementById('stdNoForAdd').value
  const fName = document.getElementById('fNameForAdd').value
  const lName = document.getElementById('lNameForAdd').value

  let dataToPost = {
    studentNo: stdNo,
    firstName: fName,
    lastName: lName,
  }

  const jsonData = JSON.stringify(dataToPost)

  console.log(jsonData)

  const postLink = 'https://studentcsv.herokuapp.com/student'

  //create ajax post request to the link and set body to above jsonData
  var xhttp = new XMLHttpRequest()
  xhttp.onload = function () {
    if (this.status == 200) {
      console.log(this.responseText)
    }
  }
  xhttp.open('POST', postLink, true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(jsonData)

  //popup settings
  var popup = document.getElementById('myPopup')
  popup.classList.toggle('show')
}
