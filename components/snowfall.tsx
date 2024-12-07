"use client";

import React, { useEffect, useRef } from "react";

const Snowfall = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const options = {
      snowflakes: 200,
      maxSize: 2,
      minSize: 1,
      maxVelocity: 1,
    };

    // Получаем холст и контекст
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const flakes: Flake[] = [];

    // Класс для снежинки
    class Flake {
      x: number;
      y: number;
      r: number;
      a: number;
      aStep: number;
      weight: number;
      alpha: number;
      speed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = randomBetween(0, 1);
        this.a = randomBetween(0, Math.PI);
        this.aStep = 0.01;

        this.weight = randomBetween(options.minSize, options.maxSize);
        this.alpha = this.weight / options.maxSize;
        this.speed = (this.weight / options.maxSize) * options.maxVelocity;
      }

      // Обновление позиции снежинки
      update() {
        this.x += Math.cos(this.a) * this.r;
        this.a += this.aStep;
        this.y += this.speed;
      }
    }

    // Инициализация
    function init() {
      for (let i = 0; i < options.snowflakes; i++) {
        const x = randomBetween(0, windowW, true);
        const y = randomBetween(0, windowH, true);
        const flake = new Flake(x, y);
        flakes.push(flake);
      }

      scaleCanvas();
      loop();
    }

    // Масштабирование холста
    function scaleCanvas() {
      canvas.width = windowW;
      canvas.height = windowH;
    }

    // Основной цикл
    function loop() {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, windowW, windowH);
      ctx.restore();

      flakes.forEach((flake) => {
        flake.update();

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.weight, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
        ctx.fill();

        if (flake.y >= windowH) {
          flake.y = -flake.weight;
        }
      });

      requestAnimationFrame(loop);
    }

    // Функция для случайных значений
    function randomBetween(min: number, max: number, round = false): number {
      const num = Math.random() * (max - min + 1) + min;
      return round ? Math.floor(num) : num;
    }

    window.addEventListener("resize", scaleCanvas);

    init();

    return () => {
      window.removeEventListener("resize", scaleCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Snowfall;
