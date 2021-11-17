import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Container } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

// const requestAnimationFrame = dynamic(()=>import(window), {ssr: false})
import style from './signof.module.css';

export const SignOf = ({ canvasREF }) => {
  // const canvasREF = useRef(null);
  // const textREF = useRef(null);
  // const imageREF = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lastPos, setLastPos] = useState(mousePos);
  const [ctx, setCtx] = useState(null);
  const [canvas, setCanvas] = useState(null);

  // const draw = (ctx, frameCount) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   ctx.fillStyle = '#000000';
  //   ctx.beginPath();
  //   ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  //   ctx.fill();
  // };

  useEffect(() => {
    if (canvasREF) {
      const ca = canvasREF.current;
      setCanvas(ca);
      const ct = ca.getContext('2d');
      setCtx(ct);
    }
  }, [canvasREF, canvas]);

  useEffect(() => {
    const renderCanvas = () => {
      if (drawing && ctx) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        setLastPos(mousePos);
      }
    };
    renderCanvas();
  }, [mousePos, drawing, ctx]);

  useEffect(() => {
    let anim;
    const render = () => {
      anim = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(anim);
    };
  }, [mousePos]);

  useEffect(() => {
    ctx ? (ctx.strokeStyle = '#222222') : '';
    ctx ? (ctx.lineWidth = 4) : '';
  }, [ctx]);

  useEffect(() => {
    document.addEventListener(
      'touchstart',
      function (e) {
        if (e.target === canvas) {
          e.preventDefault();
          document.body.style.overflow = 'hidden';
        }
      },
      false
    );
    document.addEventListener(
      'touchend',
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
          document.body.style.overflow = 'auto';
        }
      },
      false
    );
  }, [canvas]);

  const getMousePos = (mouseEvent) => {
    if (canvas) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      };
    }
  };

  const getTouchPos = (touchEvent) => {
    if (canvas) {
      let rect = canvas.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top,
      };
    }
  };

  const handleMouseDown = (e) => {
    setDrawing(true);
    const a = getMousePos(e);
    setLastPos(a);
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
  };

  const handleMouseMove = (e) => {
    const art = getMousePos(e);
    setMousePos(art);
  };

  const handleTouchStart = (e) => {
    setDrawing(true);
    setMousePos(getTouchPos(e));
    var touch = e.touches[0];
    const a = getMousePos(touch);
    setLastPos(a);
  };

  const handleTouchMove = (e) => {
    var touch = e.touches[0];
    const art = getMousePos(touch);
    setMousePos(art);
  };

  const handleTouchEnd = (e) => {
    setDrawing(false);
  };

  return (
    <div>
      <canvas
        ref={canvasREF}
        className={style.sigcanvas}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        width='380'
        height='200'
      >
        Browser nicht unterstützt
      </canvas>
      {/* <Textarea ref={textREF} id={'textar'}></Textarea> */}
      {/* <img ref={imageREF} src='' /> */}
    </div>
  );
};
