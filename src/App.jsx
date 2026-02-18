import React, { useState, useEffect, useRef } from 'react';

// --- Confetti Component ---
const ConfettiEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const particles = [];
    const colors = ['#d1e3ff', '#d4f4e2', '#ffccd5', '#fff4cc', '#e2d4f4'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (particles.length < 150) {
        particles.push(new Particle());
      }

      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.y > canvas.height) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

// --- Gift Card Component ---
const GiftCard = ({ image, label, delay }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="flex flex-col items-center w-full max-w-[400px] perspective-1000 transform-gpu opacity-0 animate-unbox"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      <div className="relative group w-full transition-all duration-500 hover:scale-[1.05]">
        <div className="relative aspect-square md:aspect-[1/1] overflow-hidden rounded-[32px] border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white transition-all duration-500 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.3)] flex items-center justify-center">
          
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 animate-pulse">
              <span className="text-6xl">🎁</span>
            </div>
          )}

          <img 
            src={image} 
            alt={label} 
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-sm'}`}
            onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x400?text=Gift+Revealed!";
                setIsLoaded(true);
            }}
          />
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="mt-8 relative text-center">
          <div className="inline-block text-xl md:text-2xl bg-white px-10 py-4 rounded-full border-[4px] border-black font-bold shadow-[6px_6px_0px_#000] transform -rotate-1 group-hover:rotate-0 transition-all duration-300">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [revealed, setRevealed] = useState({
    enjoy: false,
    play: false
  });
  const [allRevealed, setAllRevealed] = useState(false);

  useEffect(() => {
    if (revealed.enjoy && revealed.play) {
      const timer = setTimeout(() => {
        setAllRevealed(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [revealed]);

  const handleReveal = (type) => {
    setRevealed(prev => ({ ...prev, [type]: true }));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-12 px-4 overflow-x-hidden selection:bg-blue-100">
      {/* Google Font Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
        
        body {
          font-family: 'Jua', sans-serif;
          background-color: #fdfaf5;
          margin: 0;
        }

        .btn-shadow {
          box-shadow: 6px 6px 0px #000;
        }

        .btn-shadow:active {
          box-shadow: 2px 2px 0px #000;
          transform: translate(4px, 4px);
        }

        @keyframes unbox {
          0% {
            transform: scale(0.6) translateY(100px) rotateX(-30deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) translateY(-15px) rotateX(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }

        .animate-unbox {
          animation: unbox 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-40 transition-opacity duration-1000"
        style={{
          backgroundColor: '#fdfaf5',
          backgroundImage: `radial-gradient(#d1e3ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="fixed inset-0 z-[1] bg-white/30 backdrop-blur-[1px]" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-[#1a1a1a] mb-6 drop-shadow-sm animate-pulse">
            Happy Birthday Gian!
          </h1>
          <div className="text-xl md:text-3xl text-[#1a1a1a] font-medium h-24 flex items-center justify-center">
            {allRevealed ? (
              <div className="animate-bounce">
                <span className="inline-block transform scale-150 mr-2">🎁 </span>
                <span>Ecco i tuoi regalini! Speriamo che ti piacciano :) </span>
                <span className="inline-block transform scale-150 ml-2"> 🎁</span>
              </div>
            ) : (
              <p className="bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl border-2 border-dashed border-black/10 shadow-sm max-w-xl">
                Nell'attesa di averli tra le tue mani,<br className="hidden md:block" /> scarta virtualmente i tuoi regali:
              </p>
            )}
          </div>
        </header>

        {/* Action Buttons Section */}
        <div className={`flex gap-6 mb-16 flex-wrap justify-center transition-all duration-1000 ${allRevealed ? 'opacity-0 scale-90 pointer-events-none absolute -top-96' : 'opacity-100 scale-100'}`}>
          <button
            onClick={() => handleReveal('enjoy')}
            disabled={revealed.enjoy}
            className={`
              group relative px-10 py-5 text-2xl md:text-4xl border-[4px] border-black rounded-[60px] btn-shadow transition-all duration-300
              ${revealed.enjoy 
                ? 'bg-gray-200 opacity-20 cursor-not-allowed grayscale' 
                : 'bg-[#d1e3ff] hover:scale-110 active:scale-95 hover:rotate-2'}
            `}
          >
            let's enjoy
            {!revealed.enjoy && <span className="absolute -top-3 -right-3 text-2xl animate-bounce">🎶</span>}
          </button>
          <button
            onClick={() => handleReveal('play')}
            disabled={revealed.play}
            className={`
              group relative px-10 py-5 text-2xl md:text-4xl border-[4px] border-black rounded-[60px] btn-shadow transition-all duration-300
              ${revealed.play 
                ? 'bg-gray-200 opacity-20 cursor-not-allowed grayscale' 
                : 'bg-[#d4f4e2] hover:scale-110 active:scale-95 hover:-rotate-2'}
            `}
          >
            let's play
            {!revealed.play && <span className="absolute -top-3 -right-3 text-2xl animate-bounce delay-150">🎮</span>}
          </button>
        </div>

        {/* Gifts Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl px-4 items-start">
          <div className="flex justify-center h-full min-h-[400px]">
            {revealed.enjoy && (
              <GiftCard 
                image="https://cdn-p.smehost.net/sites/af0adc8ea1314bfb8328afdc06ce1e06/wp-content/uploads/2025/05/Frieren_LP_Packshot_Cover_wVinyl_Website.jpg" 
                label="Frieren Soundtrack Vinyl"
                delay={0}
              />
            )}
          </div>
          <div className="flex justify-center h-full min-h-[400px]">
            {revealed.play && (
              <GiftCard 
                image="https://cyberpiggy.com/image/cache/catalog/banners/steam25-800x800.jpeg" 
                label="Steam Gift Card"
                delay={0.3}
              />
            )}
          </div>
        </div>
      </div>

      {allRevealed && <ConfettiEffect />}
    </div>
  );
}
