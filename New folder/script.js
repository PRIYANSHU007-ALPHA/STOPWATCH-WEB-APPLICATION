class Stopwatch {
    constructor() {
        this.display = document.querySelector('.display');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapList = document.getElementById('lapList');

        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.isRunning = false;
        this.lapTimes = [];

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.lap());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(() => this.updateDisplay(), 10);
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
        }
    }

    reset() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.elapsedTime = 0;
        this.startTime = 0;
        this.lapTimes = [];
        this.updateDisplay();
        this.clearLaps();
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = false;
    }

    lap() {
        if (this.isRunning) {
            const lapTime = this.formatTime(this.elapsedTime);
            this.lapTimes.push(lapTime);
            this.addLapToList(lapTime);
        }
    }

    updateDisplay() {
        if (this.isRunning) {
            this.elapsedTime = Date.now() - this.startTime;
        }
        this.display.textContent = this.formatTime(this.elapsedTime);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    }

    addLapToList(lapTime) {
        const li = document.createElement('li');
        li.textContent = `Lap ${this.lapTimes.length}: ${lapTime}`;
        this.lapList.insertBefore(li, this.lapList.firstChild);
    }

    clearLaps() {
        while (this.lapList.firstChild) {
            this.lapList.removeChild(this.lapList.firstChild);
        }
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
});