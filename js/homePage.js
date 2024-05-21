// const usersArr = JSON.parse(localStorage.getItem("users")) || []
const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const welcome=document.querySelector(".welcome")
const countWinLose = document.querySelector(".countWinLose")
const exit=document.querySelector(".exit")
welcome.innerText=`welcome ${currentUser.name}`
countWinLose.innerText = `win: ${currentUser.win} lose: ${currentUser.lose}`

exit.addEventListener("click",()=>{
    window.location.href="signUp.html"
})