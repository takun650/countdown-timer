const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const roundInfo = document.getElementById('roundInfo');

const startSound = document.getElementById('startSound');
const finishSound = document.getElementById('finishSound');
const finalSound = document.getElementById('finalSound');

let countdown;
let interval;
let totalRounds = 10;  // 合計で10回繰り返す
let currentRound = 0;
let countdownDuration = 60;  // 60秒間カウントダウン
let intervalDuration = 2;    // 2秒インターバル

let isStopped = false;  // ストップ状態を管理する変数
let remainingTime;      // ストップ後に再開するための残り時間

// ページ読み込み時に音声ファイルをキャッシュに載せる
window.addEventListener('load', () => {
    startSound.play();
    startSound.pause();

    finishSound.play();
    finishSound.pause();

    finalSound.play();
    finalSound.pause();
});

// スタートボタンの動作
startButton.addEventListener('click', () => {
    isStopped = false;
    clearInterval(countdown);
    clearInterval(interval);
    startCountdown();
});

// カウントダウンの処理
function startCountdown() {
    if (!remainingTime) {
        remainingTime = countdownDuration;
    }
    
    // サウンド発生: スタート時
    startSound.play();

    roundInfo.textContent = `ラウンド ${currentRound + 1} / ${totalRounds}`;

    countdown = setInterval(() => {
        if (isStopped) {
            clearInterval(countdown);
            return;
        }

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');

        // サウンド発生: 残り0秒の時
        if (remainingTime === 0) {
            clearInterval(countdown);

            if (currentRound === totalRounds - 1) {
                // 最終ラウンドの終了時
                finalSound.play();
                alert("すべてのラウンドが完了しました！");
            } else {
                // 次のラウンドを開始
                currentRound++;
                startInterval();
            }
        } else {
            remainingTime--;
        }
    }, 1000);
}

function startInterval() {
    let remainingInterval = intervalDuration;
    roundInfo.textContent = "インターバル中...";

    interval = setInterval(() => {
        if (isStopped) {
            clearInterval(interval);
            return;
        }

        if (remainingInterval === 0) {
            clearInterval(interval);
            remainingTime = countdownDuration;

            // サウンド発生: 次のラウンドスタートの時
            startSound.play();
            startCountdown();
        } else {
            remainingInterval--;
        }
    }, 1000);
}

// ストップボタンの動作
stopButton.addEventListener('click', () => {
    isStopped = true;
});
