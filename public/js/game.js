let guessedLetters = [];
let wrongAttempts = 0;
const maxAttempts = 6;

function initializeGame() {
    updateWordDisplay();
    drawHangman();
}

function updateWordDisplay() {
    const display = word.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
    document.getElementById('word-display').textContent = display;
}

function guessLetter() {
    const input = document.getElementById('letter-input');
    const guess = input.value.toUpperCase();
    input.value = '';

    if (guess) {
        // Si es una palabra completa
        if (guess.length > 1) {
            if (guess === word) {
                // Revelar toda la palabra
                word.split('').forEach(letter => {
                    if (!guessedLetters.includes(letter)) {
                        guessedLetters.push(letter);
                    }
                });
                updateWordDisplay();
                alert('¡Felicitaciones! ¡Ganaste!');
            } else {
                wrongAttempts++;
                drawHangman();
                if (wrongAttempts >= maxAttempts) {
                    alert('¡Perdiste! La palabra era: ' + word);
                    return;
                }
            }
        } 
        // Si es una letra individual
        else if (!guessedLetters.includes(guess)) {
            guessedLetters.push(guess);
            
            if (!word.includes(guess)) {
                wrongAttempts++;
                drawHangman();
                
                if (wrongAttempts >= maxAttempts) {
                    alert('¡Perdiste! La palabra era: ' + word);
                    return;
                }
            }
        }

        updateWordDisplay();
        document.getElementById('used-letters').textContent = 
            'Letras usadas: ' + guessedLetters.join(', ');

        if (!document.getElementById('word-display').textContent.includes('_')) {
            alert('¡Felicitaciones! ¡Ganaste!');
        }
    }
}

function drawHangman() {
    const canvas = document.getElementById('hangman-drawing');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 150);
    ctx.stroke();

    if (wrongAttempts >= 1) {
        ctx.beginPath();
        ctx.moveTo(100, 150);
        ctx.lineTo(100, 50);
        ctx.stroke();
    }

    if (wrongAttempts >= 2) {
        ctx.beginPath();
        ctx.moveTo(100, 50);
        ctx.lineTo(140, 50);
        ctx.stroke();
    }

    if (wrongAttempts >= 3) {
        ctx.beginPath();
        ctx.moveTo(140, 50);
        ctx.lineTo(140, 70);
        ctx.stroke();
    }

    if (wrongAttempts >= 4) {
        ctx.beginPath();
        ctx.arc(140, 80, 10, 0, Math.PI * 2);
        ctx.stroke();
    }

    if (wrongAttempts >= 5) {
        ctx.beginPath();
        ctx.moveTo(140, 90);
        ctx.lineTo(140, 120);
        ctx.moveTo(140, 100);
        ctx.lineTo(120, 110);
        ctx.moveTo(140, 100);
        ctx.lineTo(160, 110);
        ctx.stroke();
    }

    if (wrongAttempts >= 6) {
        ctx.beginPath();
        ctx.moveTo(140, 120);
        ctx.lineTo(120, 140);
        ctx.moveTo(140, 120);
        ctx.lineTo(160, 140);
        ctx.stroke();
    }
}

document.getElementById('letter-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});

window.onload = initializeGame;