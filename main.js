
const homeRoot = document.querySelector('#home')

const homeScore = homeRoot.querySelector('#score-display')
const homeTimeout = homeRoot.querySelector('#timeout-display')
const homeFouls = homeRoot.querySelector('#foul-display')

const homeBtnIncOne = homeRoot.querySelector('#btn-inc-one')
const homeBtnIncTwo = homeRoot.querySelector('#btn-inc-two')
const homeBtnIncThree = homeRoot.querySelector('#btn-inc-three')
const homeTimeoutBtn = homeRoot.querySelector('#btn-inc-timeout')
const homeFoulBtn = homeRoot.querySelector('#btn-inc-foul')

const awayRoot = document.querySelector('#away')

const awayScore = awayRoot.querySelector('#score-display')
const awayTimeout = awayRoot.querySelector('#timeout-display')
const awayFouls = awayRoot.querySelector('#foul-display')

const awayBtnIncOne = awayRoot.querySelector('#btn-inc-one')
const awayBtnIncTwo = awayRoot.querySelector('#btn-inc-two')
const awayBtnIncThree = awayRoot.querySelector('#btn-inc-three')
const awayTimeoutBtn = awayRoot.querySelector('#btn-inc-timeout')
const awayFoulBtn = awayRoot.querySelector('#btn-inc-foul')

const resetBtn = document.querySelector('#reset')


class ScoreBoard {
    constructor(scoreDisplay, timeoutDisplay, foulDisplay, btnIncreaseOne, btnIncreaseTwo, btnIncreaseThree, btnTimeouts, btnFouls, callback) {
        this.scoreDisplay = scoreDisplay
        this.timeoutDisplay = timeoutDisplay

        this.timeoutDisplay.dataset.score = 7
        this.timeoutDisplay.textContent = `${this.render('TIMEOUTS: ')}${this.timeoutDisplay.dataset.score}`

        this.foulDisplay = foulDisplay
        this.foulDisplay.dataset.score = 0
        this.foulDisplay.textContent = `${this.render('FOULS: ')}${this.foulDisplay.dataset.score}`
        this.btnIncreaseOne = btnIncreaseOne
        this.btnIncreaseTwo = btnIncreaseTwo
        this.btnIncreaseThree = btnIncreaseThree
        this.btnFouls = btnFouls
        this.btnTimeouts = btnTimeouts
        this.callback = callback

        this.btnIncreaseOne.addEventListener('click', this.addOnePoint)
        this.btnIncreaseTwo.addEventListener('click', this.addTwoPoints)
        this.btnIncreaseThree.addEventListener('click', this.addThreePoints)
        this.btnTimeouts.addEventListener('click', this.decreaseTimeOut)
        this.btnFouls.addEventListener('click', this.increasefouls)

    }

    increaseDisplayByNum(displayElem, num) {
        let score = +displayElem.dataset.score
        score += num
        displayElem.textContent = score
        displayElem.dataset.score = score
    }

    render(text) {
        return `${text}:`
    }



    addOnePoint = () => {
        this.increaseDisplayByNum(this.scoreDisplay, 1)
        this.callback(home.scoreDisplay, away.scoreDisplay)

    }
    addTwoPoints = () => {
        this.increaseDisplayByNum(this.scoreDisplay, 2)
        this.callback(home.scoreDisplay, away.scoreDisplay)
    }
    addThreePoints = () => {
        this.increaseDisplayByNum(this.scoreDisplay, 3)
        this.callback(home.scoreDisplay, away.scoreDisplay)
    }
    decreaseTimeOut = (e) => {
        let timeouts = this.timeoutDisplay.dataset.score
        timeouts--
        if (timeouts < 1) {
            e.target.disabled = true
        }
        this.timeoutDisplay.textContent = `${this.render('TIMEOUTS: ')}${timeouts}`
        this.timeoutDisplay.dataset.score = timeouts
    }

    increasefouls = () => {
        let fouls = this.foulDisplay.dataset.score
        fouls++
        this.foulDisplay.textContent = `${this.render('FOULS: ')}${fouls}`
        this.foulDisplay.dataset.score = fouls
    }
}

const home = new ScoreBoard(homeScore, homeTimeout, homeFouls, homeBtnIncOne, homeBtnIncTwo, homeBtnIncThree, homeTimeoutBtn, homeFoulBtn, compare)

const away = new ScoreBoard(awayScore, awayTimeout, awayFouls, awayBtnIncOne, awayBtnIncTwo, awayBtnIncThree, awayTimeoutBtn, awayFoulBtn, compare)

resetBtn.addEventListener('click', () => {
    const scores = document.querySelectorAll('#score-display')
    scores.forEach((displayElem) => {
        let score = displayElem.dataset.score
        score = 0
        displayElem.textContent = score
        displayElem.dataset.score = score
    })
})


function compare(homeScoreElem, awayScoreElem) {
    let homeScore = +homeScoreElem.dataset.score
    let awayScore = +awayScoreElem.dataset.score
    if (homeScore > awayScore) {
        homeScoreElem.style.backgroundColor = 'yellow'
        awayScoreElem.style.backgroundColor = 'black'
    } else if (awayScore > homeScore) {
        homeScoreElem.style.backgroundColor = 'black'
        awayScoreElem.style.backgroundColor = 'yellow'
    } else {
        homeScoreElem.style.backgroundColor = 'black'
        awayScoreElem.style.backgroundColor = 'black'
    }
}