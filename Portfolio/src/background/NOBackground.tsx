import React, { useEffect, useRef, useState } from "react";

export default function Background() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
    const SQUARES = 2000;
    const squareSize = 20; // Tamanho dos quadrados
    const padding = 1; // Espaçamento entre os quadrados
    const [columns, setColumns] = useState(0);

    // Função para calcular o número de colunas
    const calculateColumns = () => {
        const container = containerRef.current;
        if (container) {
            const rect = container.getBoundingClientRect();
            const cols = Math.floor(rect.width / (squareSize + padding));
            setColumns(cols);
        }
    };

    useEffect(() => {
        calculateColumns();
        window.addEventListener('resize', calculateColumns);
        return () => {
            window.removeEventListener('resize', calculateColumns);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        for (let i = 0; i < SQUARES; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            container.appendChild(square);
        }

        return () => {
            // Limpa os elementos ao desmontar
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const container = containerRef.current;
            if (!container || columns === 0) return;

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const col = Math.floor(x / (squareSize + padding));
            const row = Math.floor(y / (squareSize + padding));
            const index = row * columns + col;

            const square = container.children[index] as HTMLDivElement;
            if (square) {
                setColor(square);
                setTimeout(() => removeColor(square), 2000);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [columns]);

    useEffect(() => {
        let animationTimeout: NodeJS.Timeout;
        let animationInterval: NodeJS.Timeout;

        const startAnimation = () => {
            let count = 0;
            animationInterval = setInterval(() => {
                if (count >= 7) { // 0.3s * 7 ≈ 2.1s
                    clearInterval(animationInterval);
                    return;
                }
                changeRandomSquares();
                count++;
            }, 300);
            // Parar a animação após 2 segundos
            animationTimeout = setTimeout(() => {
                clearInterval(animationInterval);
            }, 2000);
        };

        const changeRandomSquares = () => {
            const container = containerRef.current;
            if (!container) return;

            const squaresToChange = 2;
            for (let i = 0; i < squaresToChange; i++) {
                const randomIndex = Math.floor(Math.random() * SQUARES);
                const square = container.children[randomIndex] as HTMLDivElement;
                if (square) {
                    const newColor = getRandomColor();
                    square.style.background = newColor;
                    square.style.boxShadow = `0 0 2px ${newColor}, 0 0 10px ${newColor}`;

                    // Reverte a cor após 1 segundo
                    setTimeout(() => {
                        square.style.background = '#1d1d1d';
                        square.style.boxShadow = '0 0 2px #000';
                    }, 1000);
                }
            }
        };

        // Inicia a animação a cada 5 segundos
        animationInterval = setInterval(startAnimation, 5000);
        startAnimation();

        return () => {
            clearTimeout(animationTimeout);
            clearInterval(animationInterval);
        };
    }, []);

    function setColor(element: HTMLDivElement) {
        const color = getRandomColor();
        element.style.background = color;
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    }

    function removeColor(element: HTMLDivElement) {
        element.style.background = '#1d1d1d';
        element.style.boxShadow = '0 0 2px #000';
    }

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    return (
        <div ref={containerRef} className="background"></div>
    );
}