/** First-paint vault silhouette, kept opaque until the first 3D frame is established. */
export function VaultPoster() {
  return <svg className="vault-poster" viewBox="-3 -3 6 6" aria-hidden="true">
    <defs>
      <linearGradient id="vault-poster-metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d9e4ed" /><stop offset=".46" stopColor="#929fae" /><stop offset="1" stopColor="#506477" /></linearGradient>
      <radialGradient id="vault-poster-glow"><stop stopColor="#ff9b35" stopOpacity=".4" /><stop offset="1" stopColor="#ff9b35" stopOpacity="0" /></radialGradient>
    </defs>
    <circle r="2.54" fill="#111923" stroke="#3b4a5b" strokeWidth=".12" />
    <circle r="2.39" fill="#0b1017" stroke="#8795a3" strokeWidth=".035" />
    <circle r="2.24" fill="none" stroke="#e1ab57" strokeWidth=".022" />
    <circle r="2.10" fill="none" stroke="#99a8b8" strokeWidth=".025" />
    {Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${22.5+i*45})`}><path d="M0 -2.66V-2.13" stroke="#263544" strokeWidth=".21" /><path d="M0 -2.44V-2.13" stroke="#a8b8c6" strokeWidth=".10" /></g>)}
    <g transform="scale(.006451613) translate(-632 -520)" fill="url(#vault-poster-metal)" stroke="#53677c" strokeWidth="6" strokeLinejoin="round">
      <path d="M555 252H630L728 348 554 523V558L590 595 518 664 410 585V445L540 332V264Z" />
      <path d="M764 380 850 473V621L727 728V781H641L548 683 720 521V492L689 462Z" />
    </g>
    <circle r="1.15" fill="url(#vault-poster-glow)" />
    <path d="M-.187 .032 .213 -.316V.071L-.181 .394Z" fill="#ffc270" stroke="#ffe0a0" strokeWidth=".02" />
  </svg>;
}
