document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile menu toggle ---
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });

    // --- Typewriter Effect ---
    const typeWriterElement = document.getElementById('typewriter-command');
    if (typeWriterElement) {
        const commands = [
            "./init_portfolio.sh",
            "whoami",
            "nmap -sV target.local",
            "cat credentials.txt",
            "sudo -l",
            "connecting to secure server..."
        ];
        
        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentCommand = commands[commandIndex];
            
            if (isDeleting) {
                typeWriterElement.innerHTML = currentCommand.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterElement.innerHTML = currentCommand.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typingSpeed = 100;
            if (isDeleting) typingSpeed = 50;
            
            if (!isDeleting && charIndex === currentCommand.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
                typingSpeed = 500; // Pause before new word
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start typewriter
        setTimeout(typeWriter, 1000);
    }

    // --- Matrix Rain Background ---
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Characters for matrix (Katakana + Latin + Numerals)
        const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
        const charsArray = matrixChars.split('');
        
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        
        // Array for drops - one per column
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        // Draw the matrix rain
        function drawMatrix() {
            // Translucent black background to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = charsArray[Math.floor(Math.random() * charsArray.length)];
                
                // Draw character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Reset drop to top randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move drop down
                drops[i]++;
            }
        }
        
        // Loop the animation
        setInterval(drawMatrix, 33);
        
        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});
