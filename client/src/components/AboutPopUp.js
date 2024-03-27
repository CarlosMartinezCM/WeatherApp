// Modal for about pop up
import React, { useState, useEffect } from 'react';

class AboutPopUp extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.drawClock();
    this.intervalId = setInterval(this.drawClock, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  drawClock = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(radius, radius, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    this.drawHand(ctx, radius * 0.5, hour * 30 + minute / 2, radius * 0.07);
    this.drawHand(ctx, radius * 0.8, minute * 6 + second / 10, radius * 0.05);
    this.drawHand(ctx, radius * 0.9, second * 6, radius * 0.02);
  };

  drawHand = (ctx, length, angle, width) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(this.canvasRef.current.width / 2, this.canvasRef.current.height / 2);
    ctx.lineTo(
      this.canvasRef.current.width / 2 + length * Math.cos((angle * Math.PI) / 180),
      this.canvasRef.current.height / 2 + length * Math.sin((angle * Math.PI) / 180)
    );
    ctx.strokeStyle = 'black';
    ctx.stroke();
  };

  render() {

    return (
      <div className="modal" role="dialog">
        <div className="modal-content">
          <div className='modal-header'>
            <p className='modal-title'>About</p>
            <button id='modalClose' className='close' onClick={this.props.hideAbout}>
              &times;</button>
          </div>
          <div className='modalBody'>
            <center>
              <h1>Weather Application using ReactJS.</h1>
              <p>Static site deployed on Vercel from GitHub.</p>
              <p style={{ fontStyle: "italic" }}>Version 3.1; Weather Forecast Project</p>
              <canvas
                ref={this.canvasRef}
                width={200}
                height={200}
                style={{ border: '1px solid black' }}
              ></canvas>
            </center>
            <div className='modalFooter'>
              <button className='modal-submit-btn' onClick={this.props.hideAbout}>close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }


}

export default AboutPopUp;