const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const roundInfo = document.getElementById('roundInfo');

const startSound = document.getElementById('startSound');
// 全てのサウンドを「スタートサウンド」に統一
const finishSound = startSound;
const finalSound = startSound;

let countdown;
let interval;
let totalRounds = 10;  // 合計で10回繰り返す
let currentRound = 0;
let countdownDuration = 5;  // 60秒間カウントダウン
let intervalDuration = 2;    // 2秒インターバル

let isStopped = false;  // ストップ状態を管理する変数
let remainingTime;      // ストップ後に再開するための残り時間

// ページ読み込み時に音声ファイルをキャッシュに載せる
window.addEventListener('load', () => {
    // スタートサウンドを事前に再生してキャッシュに載せる
    startSound.play();
    startSound.pause();
    console.log('サウンドファイルをキャッシュしました');
});

// スタートボタンの動作
startButton.addEventListener('click', () => {
    isStopped = false;  // ストップ状態を解除
    clearInterval(countdown);  // スタートを押すたびにタイマーをリセット
    clearInterval(interval);
    startCountdown();  // 残り時間から再開
});

// カウントダウンの処理
function startCountdown() {
    if (!remainingTime) {
        remainingTime = countdownDuration;  // 残り時間がない場合は初期値をセット
    }
    
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

        // 残り1秒のときにフィニッシュ音を2回鳴らす
        if (remainingTime === 1) {
            finishSound.play();  // 1回目の音を再生
            setTimeout(() => {
                finishSound.play();  // 2回目の音を少し遅れて再生
            }, 500);  // 500ms遅らせて2回目を再生
        }

        if (remainingTime === 0) {
            clearInterval(countdown);

            // 最終ラウンドかどうかで鳴らす音を分ける
            if (currentRound === totalRounds - 1) {
                // ファイナルで4回音を鳴らす
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        finalSound.play();  // 4回音を鳴らす
                    }, i * 500);  // 500msずつ遅らせて4回再生
                }
                alert("すべてのラウンドが完了しました！");
            } else {
                currentRound++;
                startInterval();  // 2秒のインターバルを開始
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
            remainingTime = countdownDuration;  // 次のラウンドのカウントダウンを開始
            startCountdown();
        } else {
            remainingInterval--;
        }
    }, 1000);
}

// ストップボタンの動作
stopButton.addEventListener('click', () => {
    isStopped = true;  // ストップ状態にする
});
