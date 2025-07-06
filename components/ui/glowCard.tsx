import React, { useRef, useEffect, ComponentType } from 'react';

// --- Componente de Estilos ---
// O CSS é injetado diretamente para manter o componente autônomo.
// Este estilo define as classes usadas pelo HOC e pelo conteúdo.
const CardStyles = () => (
  <style>{`
    .app-container {
        font-family: 'Inter', sans-serif;
        display: grid;
        place-items: center;
        min-height: 100vh;
        width: 100%;
        background-color: #0c0a09;
        background-image: radial-gradient(circle at 1px 1px, #1f2937 1px, transparent 0);
        background-size: 30px 30px;
    }

    .card-container {
        perspective: 1500px;
    }

    .card {
        width: 360px;
        height: 500px;
        background: rgba(31, 41, 55, 0.3); 
        border-radius: 32px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
        color: #e5e7eb;
        transition: transform 0.1s ease-out;
        transform-style: preserve-3d;
        backdrop-filter: blur(20px); 
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }

    .card::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            hsla(var(--hue), 90%, 70%, 0.25) 0%,
            rgba(0, 0, 0, 0) 40% 
        );
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 1;
    }
    
    .card::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            hsla(var(--hue), 90%, 70%, 0.8) 0%,
            rgba(0, 0, 0, 0) 20%
        );
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 0;
        border-radius: inherit;
        -webkit-mask:
            radial-gradient(transparent, transparent),
            linear-gradient(white, white);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
    }

    .card-container:hover .card::before,
    .card-container:hover .card::after {
        opacity: 1;
    }

    /* Estilo para o conteúdo que será envolvido pelo HOC */
    .card-content {
        position: relative;
        z-index: 2;
        height: 100%;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transform: translateZ(60px);
    }
  `}</style>
);

// --- O High-Order Component (HOC) ---
// Esta função recebe um componente e retorna um novo componente com o efeito de brilho.
const withInteractiveGlow = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const GlowWrapper = (props: P) => {
        const cardContainerRef = useRef<HTMLDivElement>(null);
        const cardRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const container = cardContainerRef.current;
            const card = cardRef.current;

            if (!container || !card) return;

            const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const hue = (x / rect.width) * 360;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                card.style.setProperty('--hue', `${hue}`);

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;

                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            };

            const handleMouseLeave = () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            };

            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, []);

        return (
            <div ref={cardContainerRef} className="card-container">
                <div ref={cardRef} className="card">
                    {/* Renderiza o componente original passado como argumento */}
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    };
    return GlowWrapper;
};


// --- Componente de Conteúdo ---
// Este é o componente que define o que vai DENTRO do card.
// Ele não tem lógica de animação.
const MyCardContent = () => {
    return (
        <div className="card-content">
            <div className="flex-grow flex items-center justify-center">
                <svg className="w-[120px] h-[120px] self-center drop-shadow-lg" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.37,2.37,4.05,19.33a1.5,1.5,0,0,0,2.12,1.8l5.4-3.6a1.49,1.49,0,0,1,1.3,0l5.4,3.6a1.5,1.5,0,0,0,2.12-1.8L17.63,2.37a1.5,1.5,0,0,0-1.8-1.5H8.17A1.5,1.5,0,0,0,6.37,2.37Z"/>
                </svg>
            </div>
            <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-sm font-medium self-start">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0ea5e9"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#paint0_linear_10_20)"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#paint1_radial_10_20)" fillOpacity="0.2"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#paint2_radial_10_20)" fillOpacity="0.2"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#paint3_radial_10_20)" fillOpacity="0.2"></path><defs><linearGradient id="paint0_linear_10_20" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#fb923c"></stop><stop offset="1" stopColor="#f97316"></stop></linearGradient><radialGradient id="paint1_radial_10_20" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 2) rotate(90) scale(10)"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></radialGradient><radialGradient id="paint2_radial_10_20" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 2) rotate(90) scale(10)"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></radialGradient><radialGradient id="paint3_radial_10_20" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 2) rotate(90) scale(10)"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></radialGradient></defs></svg>
                    <span>Cursor tracking tutorial</span>
                </div>
                <h1 className="text-4xl font-bold leading-tight text-gray-50 -mt-5">Wherever you go, it follows</h1>
                <a href="#" className="text-base font-medium text-gray-400 border-b border-gray-600 pb-0.5 self-start transition-colors hover:text-gray-50">Learn more</a>
            </div>
        </div>
    );
};

// --- Composição Final ---
// Aqui, aplicamos o HOC ao nosso componente de conteúdo.
const InteractiveGlowCard = withInteractiveGlow(MyCardContent);


// --- Componente de Exibição ---
// Este é o componente principal que você deve exportar e usar em seu projeto.
export default function GlowCard() {
  return (
    <>
      <CardStyles />
      <div className="app-container">
        <InteractiveGlowCard />
      </div>
    </>
  );
}
