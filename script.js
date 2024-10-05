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

function startCountdown() {
    let remainingTime = countdownDuration;
    roundInfo.textContent = `ラウンド ${currentRound + 1} / ${totalRounds}`;
    
    // カウントダウンスタート時に音を鳴らす
    startSound.play();

    countdown = setInterval(() => {
        if (isStopped) {
            clearInterval(countdown);  // ストップ時はカウントダウンを止める
            return;
        }

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');

        if (remainingTime === 0) {
            clearInterval(countdown);

            // 最終ラウンドかどうかで鳴らす音を分ける
            if (currentRound === totalRounds - 1) {
                finalSound.play();  // 10サイクル目には別の音を鳴らす
                alert("すべてのラウンドが完了しました！");
            } else {
                finishSound.play();
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
            clearInterval(interval);  // ストップ時はインターバルも止める
            return;
        }

        if (remainingInterval === 0) {
            clearInterval(interval);
            startCountdown();
        } else {
            remainingInterval--;
        }
    }, 1000);
}

// スタートボタンの動作
startButton.addEventListener('click', () => {
    isStopped = false;  // ストップ状態を解除
    clearInterval(countdown);  // スタートを押すたびにタイマーをリセット
    clearInterval(interval);
    currentRound = 0;
    startCountdown();
});

// ストップボタンの動作
stopButton.addEventListener('click', () => {
    isStopped = true;  // ストップ状態にする
});
