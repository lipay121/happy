document.addEventListener('DOMContentLoaded', function() {
    const balloon = document.getElementById('balloon');
    const flowersContainer = document.getElementById('flowersContainer');
    const cakeContainer = document.getElementById('cakeContainer');
    const message = document.getElementById('message');
    
    let isBalloonPopped = false;
    
    // Event listener untuk balon
    balloon.addEventListener('click', function() {
        if (!isBalloonPopped) {
            popBalloon();
        }
    });
    
    // Fungsi untuk memecahkan balon
    function popBalloon() {
        isBalloonPopped = true;
        
        // Tambahkan class untuk animasi pop
        balloon.classList.add('popped');
        
        // Play sound effect (optional)
        playPopSound();
        
        // Setelah balon pecah, tampilkan bunga
        setTimeout(() => {
            showFlowers();
            updateMessage();
        }, 500);
    }
    
    // Fungsi untuk menampilkan bunga
    function showFlowers() {
        flowersContainer.classList.add('show');
        
        // Animasi tambahan untuk kue
        cakeContainer.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cakeContainer.style.transform = 'scale(1)';
        }, 300);
        
        // Tambahkan efek konfeti
        createConfetti();
    }
    
    // Fungsi untuk update pesan
    function updateMessage() {
        message.innerHTML = `
            <h1>🎂 Selamat Ulang Tahun! 🌸</h1>
            <p>Semoga tahun ini penuh dengan kebahagiaan! ✨</p>
        `;
        
        // Animasi untuk pesan
        message.style.animation = 'none';
        message.offsetHeight; // Trigger reflow
        message.style.animation = 'titleGlow 2s ease-in-out infinite alternate';
    }
    
    // Fungsi untuk efek suara pop (optional)
    function playPopSound() {
        // Bisa ditambahkan audio file jika diperlukan
        console.log('Pop! 🎈');
    }
    
    // Fungsi untuk membuat konfeti
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'absolute';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '20';
                
                document.body.appendChild(confetti);
                
                // Animasi konfeti jatuh
                const animation = confetti.animate([
                    { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                animation.onfinish = () => {
                    confetti.remove();
                };
            }, i * 100);
        }
    }
    
    // Tambahkan efek hover untuk balon
    balloon.addEventListener('mouseenter', function() {
        if (!isBalloonPopped) {
            this.style.transform = 'translateX(-50%) scale(1.1)';
        }
    });
    
    balloon.addEventListener('mouseleave', function() {
        if (!isBalloonPopped) {
            this.style.transform = 'translateX(-50%) scale(1)';
        }
    });
    
    // Tambahkan efek keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !isBalloonPopped) {
            event.preventDefault();
            popBalloon();
        }
    });
    
    // Tambahkan efek touch untuk mobile
    let touchStartY = 0;
    balloon.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
    });
    
    balloon.addEventListener('touchend', function(event) {
        const touchEndY = event.changedTouches[0].clientY;
        const touchDiff = Math.abs(touchEndY - touchStartY);
        
        if (touchDiff < 10 && !isBalloonPopped) {
            popBalloon();
        }
    });
    
    // Tambahkan animasi loading
    window.addEventListener('load', function() {
        // Animasi fade in untuk semua elemen
        const elements = [balloon, cakeContainer, message];
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
    
    // Tambahkan efek parallax sederhana
    document.addEventListener('mousemove', function(event) {
        if (!isBalloonPopped) {
            const mouseX = event.clientX / window.innerWidth;
            const mouseY = event.clientY / window.innerHeight;
            
            balloon.style.transform = `translateX(calc(-50% + ${(mouseX - 0.5) * 20}px)) translateY(${(mouseY - 0.5) * 10}px)`;
        }
    });
    
    // Reset function untuk testing
    window.resetAnimation = function() {
        isBalloonPopped = false;
        balloon.classList.remove('popped');
        flowersContainer.classList.remove('show');
        message.innerHTML = `
            <h1>🎂 Selamat Ulang Tahun! 🎈</h1>
            <p>Klik balon untuk melihat kejutan! ✨</p>
        `;
        
        // Reset semua bunga
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach(flower => {
            flower.style.animation = 'none';
            flower.offsetHeight;
            flower.style.animation = '';
        });
    };
    
    // Tambahkan instruksi di console
    console.log('🎂 Selamat Ulang Tahun! 🎈');
    console.log('Klik balon atau tekan SPACE untuk melihat kejutan!');
    console.log('Ketik resetAnimation() di console untuk reset animasi');
}); 