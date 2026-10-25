import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="cards">
        <figure className="card">
          <figcaption className="card_title">3D Hover</figcaption>
        </figure>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cards {
    perspective: 500px;
  }

  .card {
    width: 200px;
    height: 250px;
    background: linear-gradient(145deg, rgb(var(--brand-amethyst-rgb) / .72), var(--color-surface-card) 78%);
    border: 1px solid rgb(var(--brand-cyan-rgb) / .32);
    border-radius: 14px;
    position: relative;
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform .5s, box-shadow .5s;
  }

  .card:hover {
    transform: translateZ(10px) rotateX(20deg) rotateY(20deg);
    box-shadow: 0 18px 44px rgb(var(--brand-amethyst-rgb) / .48), 0 0 28px rgb(var(--brand-cyan-rgb) / .12);
  }

  .card_title {
    color: var(--color-brand-pure-white);
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    transition: transform .5s, box-shadow .5s;
    font: 700 1.5rem monospace;
    text-shadow: -1px -1px 0 var(--color-brand-ink),
      1px -1px 0 var(--color-brand-ink),
      -1px 1px 0 var(--color-brand-ink),
      1px 1px 0 var(--color-brand-ink);
  }

  .card:hover .card_title {
    transform: translateZ(50px);
  }`;

export default Card;
