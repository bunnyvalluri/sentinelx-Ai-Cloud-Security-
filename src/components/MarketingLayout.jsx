import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Logo from './common/Logo';

const NAV_LINKS = [
  { label: 'Features', to: '/features', icon: '⚡', tag: 'AI Threat Intelligence' },
  { label: 'Integrations', to: '/integrations', icon: '🔗', tag: 'AWS, GCP, Azure, K8s' },
  { label: 'Pricing', to: '/pricing', icon: '💎', tag: 'Plans for every team' },
  { label: 'Roadmap', to: '/roadmap', icon: '🗺️', tag: 'Latest releases & Q3' },
  { label: 'Docs', to: '/docs', icon: '📚', tag: 'SDKs & API Reference' },
  { label: 'Blog', to: '/blog', icon: '✍️', tag: 'Cybersecurity research' },
  { label: 'About', to: '/about', icon: '🛡️', tag: 'Our mission & team' },
];

const FOOTER_COLS = [
  { title: 'Product', links: [{ l: 'Features', to: '/features' }, { l: 'Integrations', to: '/integrations' }, { l: 'Pricing', to: '/pricing' }, { l: 'Roadmap', to: '/roadmap' }] },
  { title: 'Resources', links: [{ l: 'Documentation', to: '/docs' }, { l: 'API Reference', to: '/api-reference' }, { l: 'Blog', to: '/blog' }, { l: 'Community', to: '/community' }] },
  { title: 'Company', links: [{ l: 'About Us', to: '/about' }, { l: 'Careers', to: '/careers' }, { l: 'Legal', to: '/legal' }, { l: 'Contact', to: '/contact' }] },
  { title: 'Security', links: [{ l: 'SOC2 Report', to: '/legal' }, { l: 'Privacy Policy', to: '/legal' }, { l: 'Status Page', to: '/contact' }, { l: 'Bug Bounty', to: '/contact' }] },
];

export default function MarketingLayout({ children }) {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMobileOpen(false), [pathname]);

  // Lock body scroll and set active class when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-active');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-active');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-active');
    };
  }, [mobileOpen]);

  // Scroll-reveal observer - re-runs on route change
  useEffect(() => {
    // Small delay to let React finish rendering new page content
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal:not(.visible)');
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        }),
        { threshold: 0.05, rootMargin: '100px 0px 0px 0px' }
      );
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, [pathname]);


  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', transition: 'background 0.3s ease, color 0.3s ease' }}>

      <style>{`
        @keyframes mlSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mlFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .ml-nav-link {
          position: relative;
          padding: 7px 14px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.25s;
          text-decoration: none;
          white-space: nowrap;
        }
        .ml-nav-link::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          border-radius: 1px;
          background: linear-gradient(90deg, #8b5cf6, #38bdf8);
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .ml-nav-link.active::after,
        .ml-nav-link:hover::after { width: 60%; }

        .footer-link {
          display: block;
          margin-bottom: 13px;
          font-size: 13.5px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s, transform 0.2s;
          font-weight: 400;
        }
        .footer-link:hover {
          color: var(--text-primary);
          transform: translateX(3px);
        }

        .social-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1px solid var(--border-light);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: var(--text-muted);
          cursor: pointer; transition: all 0.25s; font-weight: 700;
          background: var(--bg-card);
        }
        .social-btn:hover {
          border-color: rgba(139,92,246,0.45);
          color: #a78bfa;
          background: rgba(139,92,246,0.1);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .get-demo-btn {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: #fff; border: none; border-radius: 10px;
          padding: 9px 22px; font-size: 13.5px; font-weight: 700;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(139,92,246,0.28), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.25s; display: flex; align-items: center; gap: 7px;
          letter-spacing: -0.2px;
        }
        .get-demo-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(139,92,246,0.45), inset 0 1px 0 rgba(255,255,255,0.15);
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
        }
        .get-demo-btn:active { transform: translateY(0); }

        .sign-in-link {
          font-size: 13.5px; font-weight: 600;
          color: var(--text-secondary); text-decoration: none;
          transition: color 0.2s; padding: 7px 10px; border-radius: 8px;
        }
        .sign-in-link:hover { color: var(--text-primary); }

        .announcement-bar {
          background: linear-gradient(90deg, rgba(124,58,237,0.12) 0%, rgba(99,102,241,0.10) 50%, rgba(56,189,248,0.08) 100%);
          border-bottom: 1px solid rgba(139,92,246,0.15);
          padding: 9px 24px;
          text-align: center;
          font-size: 12.5px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease;
          overflow: hidden;
          position: relative;
        }
        .close-announcement {
          position: absolute; right: 20px;
          width: 24px; height: 24px;
          border-radius: 6px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px;
          transition: all 0.2s;
        }
        .close-announcement:hover {
          background: rgba(244,63,94,0.12);
          border-color: rgba(244,63,94,0.3);
          color: #f43f5e;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100dvh;
          max-height: 100dvh;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-sizing: border-box;
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
        }

        [data-theme="dark"] .mobile-menu {
          background: rgba(9, 9, 13, 0.98);
          color: #f4f4f5;
        }

        [data-theme="light"] .mobile-menu {
          background: rgba(255, 255, 255, 0.99);
          color: #09090b;
        }

        .mobile-menu.open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }

        /* Hide floating chatbot when mobile menu is open */
        body.mobile-menu-active .floating-chatbot-btn {
          display: none !important;
        }

        .clean-menu-header {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: max(14px, env(safe-area-inset-top, 14px)) 20px 14px;
          border-bottom: 1px solid var(--border-light);
          background: inherit;
          backdrop-filter: blur(20px);
          flex-shrink: 0;
        }

        .clean-menu-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .clean-menu-close:hover {
          background: rgba(244, 63, 94, 0.1);
          color: #f43f5e;
          border-color: rgba(244, 63, 94, 0.3);
        }

        .clean-menu-body {
          flex: 1;
          padding: 8px 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .clean-nav-list {
          display: flex;
          flex-direction: column;
        }

        .clean-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 4px;
          border-bottom: 1px solid var(--border-light);
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }

        .clean-nav-row:last-child {
          border-bottom: none;
        }

        .clean-nav-label {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.02em;
          transition: color 0.2s;
        }

        .clean-nav-arrow {
          color: var(--text-muted);
          opacity: 0.4;
          transition: transform 0.2s, opacity 0.2s, color 0.2s;
        }

        .clean-nav-row:hover,
        .clean-nav-row.active {
          padding-left: 8px;
        }

        .clean-nav-row:hover .clean-nav-label,
        .clean-nav-row.active .clean-nav-label {
          color: #8b5cf6;
        }

        .clean-nav-row:hover .clean-nav-arrow,
        .clean-nav-row.active .clean-nav-arrow {
          transform: translateX(4px);
          opacity: 1;
          color: #8b5cf6;
        }

        .clean-menu-cta-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 6px;
        }

        .clean-btn-primary {
          width: 100%;
          height: 46px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: #ffffff !important;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.35);
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .clean-btn-primary:active {
          transform: scale(0.98);
        }

        .clean-btn-secondary {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-light);
          color: var(--text-primary) !important;
          font-size: 14.5px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        [data-theme="light"] .clean-btn-secondary {
          background: #f4f4f5;
          border-color: #e4e4e7;
          color: #18181b !important;
        }

        .clean-status-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--text-muted);
          padding-top: 2px;
          padding-bottom: max(16px, env(safe-area-inset-bottom, 16px));
        }

        .clean-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.8);
        }

        .scroll-progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, #38bdf8, #10b981);
          z-index: 1001;
          transition: width 0.1s linear;
        }

        .marketing-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(16px, 3.5vw, 48px);
          height: 68px;
          gap: 16px;
        }

        .marketing-nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
          flex-wrap: nowrap !important;
          white-space: nowrap !important;
        }

        .marketing-hamburger {
          display: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border-light);
          border-radius: 9px;
          width: 40px;
          height: 40px;
          padding: 0;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .marketing-hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .marketing-hamburger.sidebar-open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .marketing-hamburger.sidebar-open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .marketing-hamburger.sidebar-open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        @media (max-width: 1080px) {
          .marketing-nav-links {
            display: none !important;
          }
          .marketing-hamburger {
            display: flex !important;
          }
          .sign-in-link {
            display: none !important;
          }
        }

        .announcement-bar {
          white-space: nowrap;
          overflow: hidden;
        }
        .announcement-bar a {
          white-space: nowrap !important;
          flex-shrink: 0;
        }

        [data-theme="light"] .announcement-bar {
          background: linear-gradient(90deg, rgba(124,58,237,0.08) 0%, rgba(99,102,241,0.06) 50%, rgba(56,189,248,0.06) 100%) !important;
          border-bottom-color: rgba(124,58,237,0.12) !important;
          color: #334155 !important;
        }
        [data-theme="light"] .announcement-bar a {
          color: #6d28d9 !important;
        }

        @media (max-width: 768px) {
          .announcement-bar {
            display: none !important;
          }
          .marketing-nav {
            height: 60px;
            padding: 0 12px;
          }
        }

        @media (max-width: 640px) {
          .get-demo-btn {
            padding: 7px 14px;
            font-size: 12.5px;
          }
        }

        @media (max-width: 440px) {
          .get-demo-btn {
            display: none !important;
          }
        }
      `}</style>

      {/* ── Scroll Progress ── */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* ── Announcement Banner ── */}
      {announcementVisible && (
        <div className="announcement-bar">
          <span style={{ background: 'linear-gradient(90deg,#8b5cf6,#38bdf8)', color: '#fff', borderRadius: 100, padding: '2px 11px', fontSize: 10, fontWeight: 800, letterSpacing: 0.6 }}>NEW</span>
          <span>SentinelX 4.0 is here — CEREBRO AI with real-time threat correlation.</span>
          <Link to="/features" style={{ color: '#a78bfa', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
            onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}>
            See what's new
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <button className="close-announcement" onClick={() => setAnnouncementVisible(false)}>✕</button>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav
        ref={navRef}
        className="marketing-nav"
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          borderBottom: theme === 'light'
            ? (scrolled ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(0, 0, 0, 0.06)')
            : (scrolled ? '1px solid rgba(255, 255, 255, 0.10)' : '1px solid rgba(255, 255, 255, 0.05)'),
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          background: theme === 'light'
            ? (scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.90)')
            : (scrolled ? 'rgba(8, 8, 14, 0.95)' : 'rgba(8, 8, 14, 0.75)'),
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: scrolled
            ? (theme === 'light'
                ? '0 4px 20px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.04)'
                : '0 4px 30px rgba(0, 0, 0, 0.5)')
            : (theme === 'light' ? '0 1px 2px rgba(0, 0, 0, 0.02)' : 'none'),
        }}>

        {/* Logo */}
        <Link to="/" className="marketing-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo layout="horizontal" size={28} glow={true} />
        </Link>

        {/* Desktop nav */}
        <div className="marketing-nav-links">
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`ml-nav-link ${pathname === l.to ? 'active' : ''}`}
              style={{
                color: pathname === l.to ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: pathname === l.to ? 'rgba(139,92,246,0.1)' : 'transparent',
              }}
              onMouseEnter={e => {
                if (pathname !== l.to) {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={e => {
                if (pathname !== l.to) {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >{l.label}</Link>
          ))}
        </div>

        {/* Right side controls (theme toggle always visible; hamburger on mobile) */}
        <div className="marketing-nav-right" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/login" className="sign-in-link">Sign In</Link>
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
            <div className="theme-toggle-track"><div className="theme-toggle-thumb" /></div>
          </button>
          <Link to="/login" className="get-demo-link" style={{ textDecoration: 'none' }}>
            <button className="get-demo-btn">
              Get a Demo
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`marketing-hamburger ${mobileOpen ? 'sidebar-open' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Senior UI/UX Clean Mobile Navigation ── */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {/* Top Header */}
        <div className="clean-menu-header">
          <Link to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Logo layout="horizontal" size={26} glow={true} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
              <div className="theme-toggle-track"><div className="theme-toggle-thumb" /></div>
            </button>
            <button className="clean-menu-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* Clean Nav Body: Links + CTAs + Status */}
        <div className="clean-menu-body">
          <div className="clean-nav-list">
            {NAV_LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={`clean-nav-row ${pathname === l.to ? 'active' : ''}`}
              >
                <span className="clean-nav-label">{l.label}</span>
                <svg className="clean-nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </Link>
            ))}
          </div>

          <div className="clean-menu-cta-group">
            <Link to="/login" onClick={() => setMobileOpen(false)} className="clean-btn-primary">
              Get Started Free →
            </Link>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="clean-btn-secondary">
              Sign In to Console
            </Link>
          </div>

          <div className="clean-status-bar">
            <span className="clean-status-dot" />
            <span>Systems operational • 99.99% SLA</span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>

      {/* ── Premium Footer ── */}
      <footer style={{
        background: theme === 'light'
          ? 'linear-gradient(180deg, var(--bg-primary) 0%, #ede9fe 100%)'
          : 'linear-gradient(180deg, var(--bg-primary) 0%, rgba(4,4,10,1) 100%)',
        borderTop: theme === 'light' ? '1px solid rgba(109,40,217,0.10)' : '1px solid rgba(255,255,255,0.06)',
        padding: '80px 0 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Footer bg glow */}
        <div style={{ position: 'absolute', top: 0, left: '30%', width: 500, height: 300, background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '20%', width: 400, height: 200, background: 'radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        {/* Top glow line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.5) 30%, rgba(56,189,248,0.5) 70%, transparent 100%)' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)', position: 'relative' }}>
          <div className="marketing-footer-grid">
            {/* Brand col */}
            <div>
              <Link to="/" style={{ textDecoration: 'none', marginBottom: 20, display: 'block' }}>
                <Logo layout="horizontal" size={30} />
              </Link>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.85, maxWidth: 270, marginBottom: 28, fontWeight: 400 }}>
                AI-powered cloud security platform protecting enterprise infrastructure from advanced threats — in real time.
              </p>
              {/* Status */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '7px 14px', marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e', display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>All systems operational</span>
              </div>
              {/* Socials */}
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ icon: '𝕏', label: 'Twitter' }, { icon: 'in', label: 'LinkedIn' }, { icon: '⌥', label: 'GitHub' }].map(s => (
                  <div key={s.icon} className="social-btn" title={s.label}>{s.icon}</div>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {FOOTER_COLS.map(col => (
              <div key={col.title}>
                <h5 style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 22 }}>{col.title}</h5>
                {col.links.map(l => (
                  <Link key={l.l} to={l.to} className="footer-link">{l.l}</Link>
                ))}
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.14)', borderRadius: 16, padding: '28px 32px', margin: '48px 0', display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 17, color: 'var(--text-primary)', marginBottom: 6 }}>Stay ahead of threats</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>Get weekly security insights from our CEREBRO AI team.</div>
            </div>
            <div style={{ display: 'flex', gap: 10, flex: '1', maxWidth: 420, minWidth: 280 }}>
              <input
                type="email"
                placeholder="your@company.com"
                style={{
                  flex: 1, padding: '10px 18px', borderRadius: 100,
                  border: `1px solid ${theme === 'light' ? 'rgba(109,40,217,0.15)' : 'rgba(255,255,255,0.1)'}`,
                  background: theme === 'light' ? '#ffffff' : 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)', fontSize: 14,
                  outline: 'none', transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = theme === 'light' ? 'rgba(109,40,217,0.15)' : 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = ''; }}
              />
              <button style={{ padding: '10px 22px', borderRadius: 100, border: 'none', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                Subscribe →
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: theme === 'light' ? '1px solid rgba(109,40,217,0.10)' : '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
            <div>© 2025 SentinelX Security Inc. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 20 }}>
              {[{ icon: '🔒', text: 'SOC2 Type II' }, { icon: '🌐', text: 'ISO 27001' }, { icon: '🛡', text: 'GDPR Compliant' }].map(b => (
                <span key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 5, transition: 'color 0.2s', cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {b.icon} {b.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
