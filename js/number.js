const divLevel = document.getElementById("levels") // אזור כפתורי רמת המשחק
const levels = document.querySelectorAll(".btnlevel") // כפתורי רמת המשחק
const areaPlay = document.getElementById("play") //איזור המשחק שיתגלה לאחר בחירת רמה
const guessNum = document.querySelector(".guessNum") //תיבת טקסט לניחוש מספר
const btnOk = document.querySelector(".btnOk") //כפתור אישור לשליחת ניחוש
const arrlevel = [100, 250, 500]; //מערך להגרלת מספר לפי הרמה הרצויה
const message = document.querySelector(".message") // הודעה לאחר ניסיון ניחוש
const winMsg = document.querySelector(".winMsg") //הודעת ניצחון
const gameOverMsg = document.querySelector(".gameOverMsg") //הודעת שגיאה
const btnPlayAgain = document.querySelectorAll(".btnPlayAgain") // כפתורי שחק שוב בהודעת סיום המשחק
const btnExitGame = document.querySelectorAll(".btnExitGame") // כפתורי יציאה בהודעת סיום המשחק
const sumGuess = document.querySelector(".sumGuess") // מספר נסיונות מענה
const exit=document.querySelector(".exit")

console.log(sumGuess);

const soundInput=new Audio("../sound/Button.wav")
const soundInput2=new Audio("../sound/WeaponWhips.wav")
const soundLoose=new Audio("../sound/error2.mp3")

const openMenue=document.querySelector(".openMenue")
const wwww=document.querySelector(".wwww")
const x=document.querySelector(".x")

const usersArr = JSON.parse(localStorage.getItem("users")) || []
const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const soundWin=new Audio("../sound/pachy.mp3")

exit.addEventListener("click",()=>{
    window.location.href="homePage.html"
})


let cmpNum; //המספר שהמחשב הגריל
let guess; //ניחוש של המשחק
let time = 0; //כמות הניחושים
let playLevel

guessNum.addEventListener("keyof", () => {
    message.innerText = "";
})

//בחירת רמה
levels.forEach((l, i) => { // מעבר על כפתורי רמת המשחק
    l.addEventListener("click", () => { // ארוע לחיצה
        level = i
        divLevel.style.display = "none" // לאחר בחירה, הסתרת אזור הכפתורים
        play(i)//קריאה לפונקצית המשחק
    })
})

const play = (i) => {
    playLevel = arrlevel[i]
    cmpNum = Math.round(Math.random() * playLevel) //הגרלת מספר לפי מערך הרמות
    console.log(cmpNum);
    guessNum.value = "";//איפוס תיבת הטקסט
    areaPlay.style.display = "block"//הצגת אזור המשחק
    sumGuess.innerText= `נסיונות מענה: ${time}/10`
}

//יצירת אירוע בשליחת ניחוש
btnOk.addEventListener("click", () => {
    guess = Number(guessNum.value)//שמירת הניחוש הנוכחי
    guessNum.value = "";//איפוס תיבת הטקסט
    time++;//עדכון כמות הניחושים
    sumGuess.innerText= `נסיונות מענה: ${time}/10`
    //בדיקה אם הניחוש נכון
    if (guess === cmpNum) {
        message.innerText = ""
        win()
        soundWin.play()
    }
    //ניחוש שגוי אך יותר מ10- אבוד
    else if (time > 10) {
        lose();
        soundLoose.play()
    }
    // מספר גבוה מטוח הבחירה 
    else if (guess > playLevel) {
        message.innerText = `המספר ${guess} מחוץ לטווח `
    }
    // ניחוש מספר נמוך מהמספר הנבחר
    else if (guess < cmpNum) {
        message.innerText = `נסה מספר גבוה יותר מ-${guess}`
    }
    // ניחוש מספר גבוה מהמספר הנבחר 
    else if (guess > cmpNum) {
        message.innerText = `נסה מספר נמוך יותר מ-${guess}`
    }
    // הזנת ערך שאינו מספרים
    else {
        message.innerText = "לא הכנסת מספר"
    }
})



// פונקציה להתרחשות במקרה כישלון
const lose = () => {
    // הקפצת הודעת GAME OVER
    gameOverMsg.style.display = "block"
    areaPlay.style.display = "none"
    currentUser.lose++;
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    updateLocalStorage()
}

// פונקציה להתרחשות במקרה ניצחון
const win = () => {
    winMsg.style.display = "block"
    areaPlay.style.display = "none"
    currentUser.win++;
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    updateLocalStorage()
}
btnPlayAgain.forEach(btn => {
    btn.addEventListener("click", () => {
        winMsg.style.display = "none"
        gameOverMsg.style.display = "none"
        guessNum.value = "";//איפוס תיבת הטקסט
        divLevel.style.display = "flex" //בחירת רמה למשחק החדש
    })
})
    btnExitGame.forEach(btn => {
        btn.addEventListener("click", () => {

    })

})

//עדכון הlocalstrorage
const updateLocalStorage = () => {
    const index = currentUser.index;
    usersArr[index].win = currentUser.win;
    usersArr[index].lose = currentUser.lose;
    localStorage.setItem("users", JSON.stringify(usersArr));
}

openMenue.addEventListener("click",e=>{
    wwww.style.display="flex"
    openMenue.style.display="none"
})
x.addEventListener("click",e=>{
    wwww.style.display="none"
    openMenue.style.display="flex"
})