import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function CliffordReef({mode='stage'}:ExperimentRendererProps){const ref=useRef<HTMLCanvasElement>(null)
 useEffect(()=>{const c=ref.current,g=c?.getContext('2d');if(!c||!g)return;const compact=mode==='preview';let t=0,raf=0
 const draw=()=>{const b=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,compact?1.1:1.7);c.width=b.width*d;c.height=b.height*d;g.setTransform(d,0,0,d,0,0);g.fillStyle='#010305';g.fillRect(0,0,b.width,b.height);g.globalCompositeOperation='lighter';const a=-1.42+.08*Math.sin(t*.3),bb=1.67+.06*Math.cos(t*.23),cc=1.15,dd=.76;let x=.1,y=.1;const n=compact?24000:52000;const s=Math.min(b.width,b.height)*.19
 for(let i=0;i<n;i++){const nx=Math.sin(a*y)+cc*Math.cos(a*x),ny=Math.sin(bb*x)+dd*Math.cos(bb*y);x=nx;y=ny;if(i<50)continue;const px=b.width*.5+x*s,py=b.height*.53+y*s*.82;const hue=(i%900)/900;g.fillStyle=`rgba(${60+120*hue},${170+70*(1-hue)},255,${compact?.055:.045})`;g.fillRect(px,py,compact?1:1.15,compact?1:1.15)}t+=.015;raf=requestAnimationFrame(draw)};draw();return()=>cancelAnimationFrame(raf)},[mode]);return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Clifford Reef strange attractor artwork"/>}
