import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function LissajousMedusa({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const compact = mode === 'preview'
    let time = 0
    let raf = 0
    const draw = () => {
      const r = canvas.getBoundingClientRect(); const d = Math.min(devicePixelRatio || 1, compact ? 1.2 : 2)
      canvas.width = Math.max(1, r.width * d); canvas.height = Math.max(1, r.height * d); ctx.setTransform(d,0,0,d,0,0)
      const w=r.width,h=r.height,s=Math.min(w,h); ctx.fillStyle='#020205';ctx.fillRect(0,0,w,h);ctx.translate(w/2,h*.38)
      ctx.globalCompositeOperation='lighter'
      const rings=compact?12:22
      for(let q=0;q<rings;q++){const p=q/rings;ctx.beginPath();const n=160
        for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;const rx=s*(.11+p*.16);const ry=s*(.065+p*.11);const x=Math.sin(3*a+time*.5+p)*rx*(.7+.3*Math.cos(2*a));const y=Math.sin(2*a+time*.35)*ry
          if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.strokeStyle=`rgba(170,150,255,${.035+p*.08})`;ctx.lineWidth=.7;ctx.stroke()}
      const tentacles=compact?18:34
      for(let j=0;j<tentacles;j++){const u=j/(tentacles-1)-.5;ctx.beginPath();for(let k=0;k<70;k++){const p=k/69;const x=u*s*.32+Math.sin(p*9+j*.8+time)*s*(.008+p*.015);const y=s*.1+p*s*.36+Math.sin(p*5+time*.7+j)*s*.006;if(k===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.strokeStyle=`rgba(120,210,255,${.08+(j%5)*.025})`;ctx.stroke()}
      time+=.018;raf=requestAnimationFrame(draw)
    };draw();return()=>cancelAnimationFrame(raf)
  },[mode])
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Lissajous Medusa generative artwork" />
}
