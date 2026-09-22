import { profile } from '../data/profile.js'
import { useScroll } from '../lib/scroll.jsx'

export default function Footer() {
  const scroll = useScroll()

  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span className="mono">
          © {new Date().getFullYear()} {profile.nome} — {profile.cargo}
        </span>
        <button type="button" className="footer-topo mono" onClick={() => scroll.scrollTo('#inicio')}>
          voltar ao topo ↑
        </button>
      </div>
    </footer>
  )
}
