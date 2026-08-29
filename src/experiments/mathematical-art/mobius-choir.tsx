import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function MobiusChoir({ mode='stage' }: ExperimentRendererProps){
 const ref=useRef<HTMLCanvasElement>(null)
 useEffect(()=>{const c=ref.current,x=c?.getContext('2d');if(!c||!x)return;const compact=mode==='preview';let t=0,raf=0
 const draw=()=>{const b=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,compact?1.2:2);c.width=b.width*d;c.height=b.height*d;x.setTransform(d,0,0,d,0,0);x.fillStyle='#020204';x.fillRect(0,0,b.width,b.height);x.translate(b.width/2,b.height/2);x.globalCompositeOperation='lighter';const s=Math.min(b.width,b.height)*.21
  for(let band=0;band<(compact?5:9);band++){const phase=t*.24+band*.7;for(let vi=0;vi<7;vi++){const v=-1+vi/3;x.beginPath();for(let i=0;i<=220;i++){const u=i/220*Math.PI*2;let X=(1+v*.32*Math.cos(u/2))*Math.cos(u),Y=(1+v*.32*Math.cos(u/2))*Math.sin(u),Z=v*.32*Math.sin(u/2);const cy=Math.cos(.75+phase),sy=Math.sin(.75+phase),cx=Math.cos(.52),sx=Math.sin(.52);let yy=Y*cx-Z*sx,zz=Y*sx+Z*cx,xx=X*cy+zz*sy;zz=-X*sy+zz*cy;const k=1/(2.8-zz*.45);const px=xx*s*k,py=yy*s*k+(band-(compact?2:4))*s*.055;if(i===0)x.moveTo(px,py);else x.lineTo(px,py)}x.strokeStyle=`rgba(${140+band*10},${110+vi*12},255,${.035+vi*.012})`;x.lineWidth=.7;x.stroke()}}
  t+=.012;raf=requestAnimationFrame(draw)};draw();return()=>cancelAnimationFrame(raf)},[mode])
 return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Möbius Choir generative artwork" />
}
