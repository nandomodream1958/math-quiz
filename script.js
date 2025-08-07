const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const attemptsElement = document.getElementById('attempts');
const accuracyElement = document.getElementById('accuracy');
const timerElement = document.getElementById('timer');

let correctAnswer;
let score = 0;
let attempts = 0;
let correctAnswersCount = 0; // 正解数を追跡する新しい変数
let timer;
let timerInterval;
const TIME_LIMIT = 10; // 各問題の制限時間（秒）
const BONUS_POINTS_PER_SECOND = 1; // 残り1秒あたりのボーナスポイント

// 難易度管理用の変数
let operationType = 'addition'; // 'addition', 'subtraction', 'multiplication', 'division'
let additionLevel = 1;
let subtractionLevel = 1;
let multiplicationLevel = 1;
let divisionLevel = 1;

// レベルごとの背景色
const levelColors = {
    addition: {
        1: '#f0f0f0',
        2: '#e0f7fa' // Light Cyan
    },
    subtraction: {
        1: '#e3f2fd', // Light Blue
        2: '#bbdefb'
    },
    multiplication: {
        1: '#fff9c4', // Light Yellow
        2: '#ffcdd2'  // Light Red
    },
    division: {
        1: '#fbe9e7', // Light Deep Orange
        2: '#ffccbc'
    }
};

function updateStats() {
    scoreElement.textContent = `スコア: ${score}`;
    attemptsElement.textContent = `問題数: ${attempts}`;
    if (attempts > 0) {
        const accuracy = (correctAnswersCount / attempts) * 100; // correctAnswersCount を使用
        accuracyElement.textContent = `正答率: ${accuracy.toFixed(1)}%`;
    } else {
        accuracyElement.textContent = `正答率: ---`;
    }
}

function startTimer() {
    timer = TIME_LIMIT;
    timerElement.textContent = `残り時間: ${timer}秒`;
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = `残り時間: ${timer}秒`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            gameOver(); // 時間切れでゲームオーバー
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerElement.textContent = '';
}

function gameOver() {
    resetTimer();
    resultElement.textContent = '時間切れ！ゲームオーバー！';
    resultElement.style.color = 'red';
    answerElement.disabled = true; // 入力欄を無効化
    submitButton.disabled = true; // ボタンを無効化

    // 「もう一度プレイ」ボタンを作成
    let playAgainButton = document.getElementById('play-again');
    if (!playAgainButton) {
        playAgainButton = document.createElement('button');
        playAgainButton.id = 'play-again';
        playAgainButton.textContent = 'もう一度プレイ';
        playAgainButton.style.marginTop = '20px';
        playAgainButton.style.padding = '10px 20px';
        playAgainButton.style.fontSize = '1.2rem';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.border = 'none';
        playAgainButton.style.backgroundColor = '#28a745';
        playAgainButton.style.color = 'white';
        playAgainButton.style.borderRadius = '5px';
        playAgainButton.addEventListener('click', resetGame);
        document.querySelector('.container').appendChild(playAgainButton);
    }
    playAgainButton.style.display = 'block'; // ボタンを表示
}

function resetGame() {
    score = 0;
    attempts = 0;
    correctAnswersCount = 0;
    operationType = 'addition';
    additionLevel = 1;
    subtractionLevel = 1;
    multiplicationLevel = 1;
    divisionLevel = 1;
    document.body.style.backgroundColor = levelColors.addition[1];
    answerElement.disabled = false; // 入力欄を有効化
    submitButton.disabled = false; // ボタンを有効化
    document.getElementById('play-again').style.display = 'none'; // ボタンを非表示
    updateStats();
    generateQuestion();
}

function gameOver() {
    resetTimer();
    resultElement.textContent = '時間切れ！ゲームオーバー！';
    resultElement.style.color = 'red';
    answerElement.disabled = true; // 入力欄を無効化
    submitButton.disabled = true; // ボタンを無効化

    // 「もう一度プレイ」ボタンを作成
    let playAgainButton = document.getElementById('play-again');
    if (!playAgainButton) {
        playAgainButton = document.createElement('button');
        playAgainButton.id = 'play-again';
        playAgainButton.textContent = 'もう一度プレイ';
        playAgainButton.style.marginTop = '20px';
        playAgainButton.style.padding = '10px 20px';
        playAgainButton.style.fontSize = '1.2rem';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.border = 'none';
        playAgainButton.style.backgroundColor = '#28a745';
        playAgainButton.style.color = 'white';
        playAgainButton.style.borderRadius = '5px';
        playAgainButton.addEventListener('click', resetGame);
        document.querySelector('.container').appendChild(playAgainButton);
    }
    playAgainButton.style.display = 'block'; // ボタンを表示
}

function resetGame() {
    score = 0;
    attempts = 0;
    correctAnswersCount = 0;
    operationType = 'addition';
    additionLevel = 1;
    subtractionLevel = 1;
    multiplicationLevel = 1;
    divisionLevel = 1;
    document.body.style.backgroundColor = levelColors.addition[1];
    answerElement.disabled = false; // 入力欄を有効化
    submitButton.disabled = false; // ボタンを有効化
    document.getElementById('play-again').style.display = 'none'; // ボタンを非表示
    updateStats();
    generateQuestion();
}

function generateQuestion() {
    resetTimer();
    let num1, num2, questionText;

    if (operationType === 'addition') {
        const min = (additionLevel === 1) ? 1 : Math.pow(10, additionLevel - 1);
        const max = Math.pow(10, additionLevel) - 1;
        num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        correctAnswer = num1 + num2;
        questionText = `${num1} + ${num2} = ?`;
    } else if (operationType === 'subtraction') {
        const min = (subtractionLevel === 1) ? 1 : Math.pow(10, subtractionLevel - 1);
        const max = Math.pow(10, subtractionLevel) - 1;
        num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
        correctAnswer = num1 - num2;
        questionText = `${num1} - ${num2} = ?`;
    } else if (operationType === 'multiplication') {
        if (multiplicationLevel === 1) {
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
        } else { // multiplicationLevel === 2
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 9) + 1;
            if (Math.random() > 0.5) [num1, num2] = [num2, num1];
        }
        correctAnswer = num1 * num2;
        questionText = `${num1} × ${num2} = ?`;
    } else { // division
        let divisor, quotient;
        if (divisionLevel === 1) {
            divisor = Math.floor(Math.random() * 9) + 1;
            quotient = Math.floor(Math.random() * 9) + 1;
        } else { // divisionLevel === 2
            divisor = Math.floor(Math.random() * 9) + 1;
            quotient = Math.floor(Math.random() * 90) + 10;
        }
        const dividend = divisor * quotient;
        correctAnswer = quotient;
        questionText = `${dividend} ÷ ${divisor} = ?`;
    }

    questionElement.textContent = questionText;
    answerElement.value = '';
    resultElement.textContent = '';
    answerElement.focus();
    startTimer();
}

function adjustDifficulty() {
    // 5問以上、正答率80%以上でレベルアップ
    if (attempts < 5 || (correctAnswersCount / attempts) <= 0.8) { // correctAnswersCount を使用
        return null;
    }

    const resetStats = () => {
        attempts = 0;
        score = 0;
        correctAnswersCount = 0; // correctAnswersCount もリセット
    };

    let message = null;
    let newBackgroundColor = null;

    if (operationType === 'addition') {
        if (additionLevel < 2) {
            additionLevel++;
            message = `レベルアップ！ 次は${additionLevel}桁のたし算！`;
            newBackgroundColor = levelColors.addition[additionLevel];
        } else {
            operationType = 'subtraction';
            subtractionLevel = 1;
            message = `たし算マスター！ 次はひき算に挑戦だ！`;
            newBackgroundColor = levelColors.subtraction[subtractionLevel];
        }
    } else if (operationType === 'subtraction') {
        if (subtractionLevel < 2) {
            subtractionLevel++;
            message = `レベルアップ！ 次は${subtractionLevel}桁のひき算！`;
            newBackgroundColor = levelColors.subtraction[subtractionLevel];
        }
    } else if (operationType === 'multiplication') {
        if (multiplicationLevel < 2) {
            multiplicationLevel++;
            message = `レベルアップ！ 次は2桁×1桁のかけ算！`;
            newBackgroundColor = levelColors.multiplication[multiplicationLevel];
        }
    } else if (operationType === 'division') {
        if (divisionLevel < 2) {
            divisionLevel++;
            message = `レベルアップ！ 次は「答えが2桁」のわり算！`;
            newBackgroundColor = levelColors.division[divisionLevel];
        }
    }


    if (message) {
        resetStats();
        document.body.style.backgroundColor = newBackgroundColor;
    }

    return message;
}

function checkAnswer() {
    resetTimer(); // タイマーを停止
    const userAnswer = parseInt(answerElement.value, 10);
    if (isNaN(userAnswer)) {
        resultElement.textContent = '数字を入力してください。';
        resultElement.style.color = 'orange';
        return;
    }

    attempts++;

    if (userAnswer === correctAnswer) {
        correctAnswersCount++; // 正解数をインクリメント
        let pointsEarned = 1; // 基本点
        if (timer > 0) {
            const bonus = timer * BONUS_POINTS_PER_SECOND;
            pointsEarned += bonus;
            resultElement.textContent = `せいかい！ (+${bonus}ボーナスポイント)`;
        } else {
            resultElement.textContent = 'せいかい！';
        }
        score += pointsEarned;

        const levelUpMessage = adjustDifficulty();
        
        if (levelUpMessage) {
            resultElement.textContent = levelUpMessage;
        }
        resultElement.style.color = 'green';
        
        updateStats();
        setTimeout(generateQuestion, levelUpMessage ? 2000 : 1000);
    } else {
        resultElement.textContent = 'ざんねん！もういちどためしてね。';
        resultElement.style.color = 'red';
        updateStats();
        setTimeout(generateQuestion, 1000);
    }
}

submitButton.addEventListener('click', checkAnswer);

answerElement.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// 初期背景色を設定
document.body.style.backgroundColor = levelColors.addition[1];
updateStats();
generateQuestion();
