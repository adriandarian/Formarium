import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function ReactionCrown({mode='stage'}:ExperimentRendererProps){const ref=useRef<HTMLCanvasElement>(null)
 useEffect(()=>{const c=ref.current,g=c?.getContext('2d');if(!c||!g)return;const compact=mode==='preview';let t=0,raf=0
 const draw=()=>{const b=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,compact?1.2:2);c.width=b.width*d;c.height=b.height*d;g.setTransform(d,0,0,d,0,0);g.fillStyle='#030203';g.fillRect(0,0,b.width,b.height);g.translate(b.width/2,b.height/2);g.globalCompositeOperation='lighter';const S=Math.min(b.width,b.height)*.23;const layers=compact?18:34
 for(let j=0;j<layers;j++){const q=j/layers;g.beginPath();for(let i=0;i<=360;i++){const a=i/360*Math.PI*2;const rd=1+.13*Math.sin(5*a+t*.7+q*2)+.08*Math.sin(9*a-t*.43)+.055*Math.sin(17*a+t*.21+j*.17);const cell=.045*Math.sin(31*a+Math.sin(a*4+t)*2+j*.3);const r=S*(.42+q*.72)*(rd+cell);const x=Math.cos(a)*r,y=Math.sin(a)*r;if(i===0)g.moveTo(x,y);else g.lineTo(x,y)}g.closePath();g.strokeStyle=`rgba(${245-j*2},${120+j*3},${180+j*2},${.018+q*.075})`;g.lineWidth=.6+(1-q)*.45;g.stroke()}
 for(let i=0;i<90;i++){const a=i/90*Math.PI*2+t*.05,r=S*(1.2+.08*Math.sin(i*1.7+t));g.fillStyle=`rgba(255,210,160,${.06+.04*Math.sin(i)})`;g.fillRect(Math.cos(a)*r,Math.sin(a)*r,1.2,1.2)}t+=.016;raf=requestAnimationFrame(draw)};draw();return()=>cancelAnimationFrame(raf)},[mode]);return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Reaction Crown generative artwork"/>}
