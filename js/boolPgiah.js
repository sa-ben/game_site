const divLevel = document.getElementById("levels") // אזור כפתורי רמת המשחק
const levels = document.querySelectorAll(".btnlevel") // כפתורי רמת המשחק
const colorBox = document.getElementById("colors") // מחסן הצבעים שנבחרו
const chooseBoard = document.getElementById("chooseColors") // קשת הצבעים לבחירה
const gameBoard = document.querySelector(".gameBoard") // לוח המשחק
const guessColors = document.querySelector(".guessColors") // טבלת הצבעים שניחשו
const marks = document.querySelector(".marksLine")//טבלת סימון הבול והפגיעה
const arrSumColors = [6, 8, 10] // מספר צבעים לבחירה לפי רמת קושי
const header = document.getElementById("header") // כותרת - שם המשחק
const computerChoice = document.querySelector("#computerChoice") // איזור שורת הצבעים שנבחרו ע"י המחשב
const winMsg = document.querySelector(".winMsg") //הודעת ניצחון
const gameOverMsg=document.querySelector(".gameOverMsg")//הודעת שגיאה
const btnPlayAgain = document.querySelectorAll(".btnPlayAgain") // כפתורי שחק שוב בהודעת סיום המשחק
const btnExitGame = document.querySelectorAll(".btnExitGame") // כפתורי יציאה בהודעת סיום המשחק
const usersArr = JSON.parse(localStorage.getItem("users")) || []
const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const exit=document.querySelector(".exit")

const soundWin=new Audio("../sound/pachy.mp3")
const soundInput=new Audio("../sound/Button.wav")
const soundInput2=new Audio("../sound/WeaponWhips.wav")
const soundLoose=new Audio("../sound/error2.mp3")

const openMenue=document.querySelector(".openMenue")
const wwww=document.querySelector(".wwww")
const x=document.querySelector(".x")

exit.addEventListener("click",()=>{
    window.location.href="homePage.html"
})
console.log(currentUser);

let cmpColors = document.getElementsByClassName("cmpColor") // ארבעת הצבעים שנבחרו ע"י המחשב
let level//משתנה שישמור את רמת הקושי שנבחרה
let countColors = 0   // מספר הצבעים לבחירה לפי רמת הקושי
const colorsStack = [] //מערך הצבעים במחסנית
const computerColors = [] //מערך ארבעת הצבעים שהמחשב הגריל
let arrColorBox = [] //מערך אלמנטי הצבעים 
let line = 0, col = 0; //המיקום הנוכחי בלוח המשחק
let thisLine = [0, 1, 2, 3] //מערך בגודל 4 לשמירת הצבעים בכל שורה

// יצירת לוח המשחק
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 4; j++) {
        // מקומות ניחוש הצבעים
        const guess = document.createElement("div")
        

        guess.className = `guess gLine${i}`
        guessColors.append(guess);


        // מקומות סימון התוצאה
        const mark = document.createElement("div")
        mark.className = `mark mLine${i}`
        marks.append(mark);
    }
}

// הגדרת מקומות הניחוש כמערך דו מימדי
const arrGuess = []
for (let i = 1; i <= 10; i++) {
    arrGuess.push(document.getElementsByClassName(`gLine${i}`))
}

// הגדרת מקומות הסימון כמערך דו מימדי
const arrMarks = []
for (let i = 1; i <= 10; i++) {
    arrMarks.push(document.getElementsByClassName(`mLine${i}`))
}

//ניהול המשחק
//בחירת רמה
levels.forEach((l, i) => { // מעבר על כפתורי רמת המשחק
    l.addEventListener("click", () => { // ארוע לחיצה
        level = i
        divLevel.style.display = "none" // לאחר בחירה, הסתרת אזור הכפתורים
        chooseColors(arrSumColors[i]) // קריאה לפונקציית בחירת צבעים
    })
})

// פונקציה לבחירת הצבעים למשחק
const chooseColors = (n) => {
    // יצירת כותרת: בחר צבעים
    const pcolor = document.createElement("h2")
    pcolor.innerText = `בחרו ${n} צבעים למשחק`
    chooseBoard.append(pcolor)

    const box = document.createElement("div");
    // יצירת לוח לבחירת צבעים 
    const board = document.createElement("input")
    board.type = "color"
    board.className = "board"
    box.append(board)
    //יצירת כפתור אישור
    const ok = document.createElement("button")
    ok.className = "btnOk"
    ok.innerText = "אישור"
    box.append(ok)
    chooseBoard.append(box)
    //אירוע לחיצה בעת אישור צבע
    ok.addEventListener("click", () => {
        //שמירת הצבעים במערך
        colorsStack.push(board.value)
        creatStack(n)
    })
}

//פונקציה ליצירת מחסנית הצבעים
const creatStack = (n) => {
    //הוספת צבע למחסן
    const newColor = document.createElement("div")
    newColor.style.backgroundColor = colorsStack[countColors]
    newColor.className = "sColor"
    newColor.draggable = "true"
    colorBox.append(newColor)
    // בחירת מספר צבעים כפי רמת המשחק
    countColors++;
    // כאשר יגיע למספר הרצוי יעבור למשחק
    if (countColors === n) {
        play()
    }
}

// פונקציה להצגת לוח המשחק
const play = () => {
    //הסתרת התצוגה הקודמת והגדרת התצוגה החדשה
    header.style.display = "none";
    chooseBoard.style.display = "none";
    gameBoard.style.display = "block";
    gameBoard.style.display = "flex";
    gameBoard.style.flexDirection = "rowReverse"
    //שמירת אלמנטי מחסן הצבעים
    arrColorBox = document.getElementsByClassName("sColor")
    for (let i = 0; i < arrColorBox.length; i++) {
        //הפעלת הפונקציה לכל אלמנט ממחסן הצבעים
        draw(arrColorBox[i], i)
    }
    //קריאה לפונקציה להגרלת ארבעת הצבעים
    chooseCmpColors(arrSumColors[level])
    // הצגת השורה בה יתגלו הצבעים שהמחשב בחר
    createCmpColors();
}

// פונקציה ליצירת ארבעה מקומות לצבעים שהמחשב מגריל
const createCmpColors = () => {
    for (let i = 0; i < 4; i++) {
        const cmpColor = document.createElement("div")
        cmpColor.className = "cmpColor";
        cmpColor.innerText = "?";
        computerChoice.append(cmpColor)
    }
    cmpColors = document.getElementsByClassName("cmpColor") // ארבעת הצבעים שנבחרו ע"י המחשב
}

// צביעת שורה בלוח לפי בחירת השחקן
const draw = (color, i) => {
    color.addEventListener('click', (color => {
       soundInput2.play()
        bgColor = colorsStack[i];
        thisLine[col] = bgColor
        arrGuess[line][col++].style.backgroundColor = bgColor;
        

        if (col === 4) {
            col = 0
            checkIfSame()
            line++
            if(line===10){
                lose();
                soundLoose.play()
            }
        }
    }))
}

// פונקציה לבחירה אקראית של 4 צבעים למשחק הניחוש
const chooseCmpColors = (n) => {
    for (let i = 0; i < 4; i++) {
        let c = Math.floor(Math.random() * n); // בחירת מספר אקראי לפי כמות הצבעים בדרגת הקושי
        //  בדיקה שלא נבחר צבע פעמיים 
        for (let j = 0; j < i; j++) {
            if (computerColors[j] === colorsStack[c]) {
                c = Math.floor(Math.random() * n);
                j = -1
            }
        }
        computerColors.push(colorsStack[c]);
    }
}

// בדיקת שורת הצבעים שהכניס השחקן
//פןנקציה הבודקת ומסמנת את כמויות הבול והפגיעה
const checkIfSame = () => {
    let countBool = 0, countPgia = 0;
    for (let i = 0; i < 4; i++) {
        if (computerColors[i] === thisLine[i])
            countBool++;
        else{
            for (let j = 0; j < 4; j++) {
                if (computerColors[i] === thisLine[j])
                    countPgia++;
            }
        }
    }
    console.log('bool:', countBool, 'pgiah:', countPgia);
    drawCheckMark(countBool, countPgia)
}

// פונקציה הצובעת את עיגולי הבול והפגיעה
const drawCheckMark = (bool, pgia) => {
    let i = 0
    for (; i < bool;) {
        arrMarks[line][i++].style.backgroundColor = "crimson" //red
    }
    for (; i <bool+ pgia;) {
        arrMarks[line][i++].style.backgroundColor = "lightgray"// white
    }
    // במקרה של ניצחון
    if (bool === 4) {
        win();
        soundWin.play()
    }
}

// פונקציה להתרחשויות במקרה ניצחון
const win = () => {
    //מניעת הופעת הודעת הכשלון במקרה שהניחוש הצליח רק בשורה האחרונה
    if(line===10)
        line++
    colorBox.style.display="none"
    discoverCmpColors();
    appearWinMessage();
    console.log(currentUser);
    currentUser.win++;
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
    updateLocalStorage();
}

// פונקציה לחשיפת הצבעים שנבחרו ע"י המחשב
const discoverCmpColors = () => {
    console.log(cmpColors);
    for (let i = 0; i < cmpColors.length; i++) {
        cmpColors[i].innerText="";
        cmpColors[i].style.backgroundColor=computerColors[i]
    }
}

// פונקציה להקפצת הודעת ניצחון למשתמש
const appearWinMessage = () => {
    winMsg.style.display = "block";
}

// פונקציה להתרחשות במקרה כישלון
const lose = () => {
    // הקפצת הודעת GAME OVER
    gameOverMsg.style.display="block"
    currentUser.lose++;
    // localStorage.setItem("currentUser",JSON.stringify(currentUser))
    updateLocalStorage()
}

//עדכון הlocalstrorage

const updateLocalStorage=()=>{
    const index=currentUser.index;
    usersArr[index].win=currentUser.win;
    usersArr[index].lose=currentUser.lose;
    localStorage.setItem("users",JSON.stringify(usersArr));
}
// btnPlayAgain.forEach((btn)=>{
    for (let i = 0;  i< btnPlayAgain.length;i++) {
        btnPlayAgain[i].addEventListener("click",()=>{
            winMsg.style.display="none"
            gameOverMsg.style.display="none"
            colorBox.style.display="grid"
            const allGuess=document.getElementsByClassName("guess")
            console.log(allGuess);
            for (let j = 0; j  < allGuess.length; j++) {
                const g = allGuess[j];
                g.style.background="none" 
                console.log("stylenone");  
            }
            const allMark=document.getElementsByClassName("mark")
            for (let j = 0; j  < allMark.length; j++) {
                const m = allMark[j];
                m.style.background="none"   
                console.log("stylenone");  
            }
            line=0;col=0;
            chooseCmpColors(arrSumColors[level])
            for (let j = 0; j < cmpColors.length; j++) {
                const cmpC = cmpColors[j];
                cmpC.innerText = "?";
                cmpC.style.background="none"
                console.log("stylenone");
            }
        })
}

btnExitGame.forEach(btn=>{
    btn.addEventListener("click",()=>{
        
    })
})

openMenue.addEventListener("click",e=>{
    wwww.style.display="flex"
    openMenue.style.display="none"
})
x.addEventListener("click",e=>{
    wwww.style.display="none"
    openMenue.style.display="flex"
})
