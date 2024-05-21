const usersArr = JSON.parse(localStorage.getItem("users")) || [];
const formSignUp = document.querySelector(".formSignUp")
const formLogIn = document.querySelector(".formLogIn")

const dSignUp = document.querySelector(".dSignUp")
const dLogIn = document.querySelector(".dLogIn")

const name_s = document.querySelector(".name")
const email_s = document.querySelector(".email")
const pass_s = document.querySelector(".pass")
const validPass_s = document.querySelector(".validPass")
const name_l = document.querySelector(".name_inp")
const pass_l = document.querySelector(".pass_inp")

const btnL = document.querySelector(".btnL")
const btnS = document.querySelector(".btnS")
const tabSignUp = document.querySelector(".tabSignUp")
const tabLogIn = document.querySelector(".tabLogIn")
const soundCandyMatch = new Audio("../sound/CandyMatch.wav")

const welcome=document.querySelector(".welcome")
const container=document.querySelector(".container")
welcome.addEventListener("click",()=>{
    container.scrollIntoView({ behavior: "smooth" });
})

let newUserObj;

// בלחיצה על כניסה יועבר לכרטיסיית כניסה
tabLogIn.addEventListener("click", e => {
    dSignUp.style.display = "none"
    dLogIn.style.display = "block"
    tabLogIn.style.color = " rgb(46, 114, 202)"
    tabSignUp.style.color = "white"
    soundCandyMatch.play()
})

// בלחיצה על הרשמה יועבר לכרטיסיית הרשמה
tabSignUp.addEventListener("click", e => {
    soundCandyMatch.play()
    dLogIn.style.display = "none"
    dSignUp.style.display = "block"
    tabSignUp.style.color = " rgb(46, 114, 202)"
    tabLogIn.style.color = "white"

})

//אירוע לחיצה על כניסה 
btnL.addEventListener("click", () => {
    let i
    // בודק האם כבר מופיע במערך הנרשמים ומעביר לדף הבית
    for (i = 0; i < usersArr.length; i++) {
        if (usersArr[i].name === name_l.value && usersArr[i].kod === pass_l.value) {
            localStorage.setItem("currentUser", JSON.stringify({ index: i, name: usersArr[i].name, win: usersArr[i].win, lose: usersArr[i].lose }))
            formLogIn.action = "homePage.html"
            break
        }
    }
    // אם השם לא קיים במערכת יועבר לדף הרשמה
    if(i===usersArr.length){
        alert("אינך רשום במערכת, הנך מועבר לדף הרשמה")
        pass_l.value = ""
        dLogIn.style.display = "none"
        dSignUp.style.display = "block"
        tabSignUp.style.color = " rgb(46, 114, 202)"
        tabLogIn.style.color = "white"    
    }
})

//אירוע לחיצה על הרשמה - בודק האם כבר מופיע במערך הנרשמים אם לא מוסיף למערך
btnS.addEventListener("click", () => {
    if (name_s.value === "" || pass_s.value === "" || validPass_s.value != pass_s.value) {
        alert("אחד מהערכים שהכנסת אינו תקין או שלא מלאת את כל התאים")
    }
    else {
        newUserObj = { name: name_s.value, email: email_s.value, kod: pass_s.value, win: 0, lose: 0 }
        let i
        for (i = 0; i < usersArr.length && (usersArr[i].name != newUserObj.name && usersArr[i].kod != newUserObj.kod); i++);
        // הרשמה - שמירת הנתונים בלוקאל סטורייג למשתמש חדש
        if (i === usersArr.length) {
            localStorage.setItem("currentUser", JSON.stringify({ index: i, name: newUserObj.name, win: 0, lose: 0 }))
            usersArr.push(newUserObj)
            localStorage.setItem("users", JSON.stringify(usersArr))
            alert("נרשמת בהצלחה")
            formSignUp.action = "homePage.html"

        }
        else {
            // משתמש קיים מועבר לכרטיסיית הרשמה
            if (usersArr[i].name === newUserObj.name && usersArr[i].kod === newUserObj.kod) {
                alert("שמך רשום במערכת. הנך מועבר לכניסה")
                dSignUp.style.display = "none"
                dLogIn.style.display = "block"
                tabLogIn.style.color = " rgb(46, 114, 202)"
                tabSignUp.style.color = "white"
            }
        }
    }
})
