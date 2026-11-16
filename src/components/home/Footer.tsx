export default function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-name">Nicolas Faraci</div>
      <div>Développeur fullstack senior, MVP web et mobile</div>
      <div>France · {new Date().getFullYear()}</div>
    </footer>
  );
}
