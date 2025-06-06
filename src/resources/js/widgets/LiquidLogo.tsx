import React, { useEffect, useRef } from "react";

import Matter from "matter-js";

import '../../scss/LiquidLogo.scss';

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const LiquidLogo = () => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const width = 35;
        const height = 35;

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const engine = Matter.Engine.create();

        const runner = Matter.Runner.create();
        engineRef.current = engine;

        engine.gravity.y = 0.5;

        const render = Matter.Render.create({
            canvas,
            engine,
            options: {
                width,
                height,
                wireframes: false,
                background: "transparent",
                pixelRatio,
            },
        });

        const wallThickness = 200;

        const walls = [
            Matter.Bodies.rectangle(
                width / 2,
                -wallThickness / 2,
                width * 2,
                wallThickness,
                { isStatic: true, render: { visible: false } },
            ), // top
            Matter.Bodies.rectangle(
                width / 2,
                height + wallThickness / 2,
                width * 2,
                wallThickness,
                { isStatic: true, render: { visible: false } },
            ), // bottom
            Matter.Bodies.rectangle(
                -wallThickness / 2,
                height / 2,
                wallThickness,
                height * 2,
                { isStatic: true, render: { visible: false } },
            ), // left
            Matter.Bodies.rectangle(
                width + wallThickness / 2,
                height / 2,
                wallThickness,
                height * 2,
                { isStatic: true, render: { visible: false } },
            ), // right
        ];

        const droplets = Array.from({ length: 40 }, () =>
            Matter.Bodies.circle(
                width / 2 + (Math.random() - 0.5) * 30,
                height / 2 + (Math.random() - 0.5) * 30,
                2.5,
                {
                    restitution: 0.3,
                    friction: 0.05,
                    density: 0.03,
                    frictionAir: 0.05,
                    inertia: Infinity,
                    render: {
                        fillStyle: "rgba(168, 213, 186, 1)",
                    },
                },
            ),
        );
        Matter.Events.on(engine, "beforeUpdate", () => {
            droplets.forEach((body) => {
                const maxSpeed = 5;
                const speed = Matter.Vector.magnitude(body.velocity);
                if (speed > maxSpeed) {
                    const limitedVelocity = Matter.Vector.mult(
                        Matter.Vector.normalise(body.velocity),
                        maxSpeed,
                    );
                    Matter.Body.setVelocity(body, limitedVelocity);
                }
            });
        });

        Matter.World.add(engine.world, [...walls, ...droplets]);

        Matter.Runner.run(runner, engine);
        Matter.Render.run(render);

        // Реакция на клик
        const handleClick = () => {
            droplets.forEach((droplet) => {
                const forceX = (Math.random() - 0.5) * 0.01;
                const forceY = -(Math.random() * 0.009);

                Matter.Body.applyForce(droplet, droplet.position, {
                    x: forceX,
                    y: forceY,
                });
            });
        };
        canvas.addEventListener("click", handleClick);

        // Реакция на скролл
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const delta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;

            const clampedForce = clamp(-delta * 0.0002, -0.001, 0.001);

            droplets.forEach((droplet) => {
                Matter.Body.applyForce(droplet, droplet.position, {
                    x: (Math.random() - 0.5) * 0.0005,
                    y: clampedForce,
                });
            });
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            canvas.removeEventListener("click", handleClick);
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            Matter.World.clear(engine.world, false);
        };
    }, []);

    return (
        <div className="header__logowrap">
            <div className="header__logo">
                <canvas
                    id="liquid-logo"
                    ref={canvasRef}
                    width="35"
                    height="35"
                    style={{
                        borderRadius: "9px",
                        border: "none",
                        outline: "none !important",
                        display: "block",
                    }}
                ></canvas>
            </div>
        </div>
    );
};

export default LiquidLogo;
