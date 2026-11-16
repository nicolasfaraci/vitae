export default function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-status">
        <span className="status-dot" aria-hidden="true" />
        <span>Démarrage sous 2 à 3 semaines</span>
      </div>
      <h1 className="hero-title">
        De l’idée
        <br />à la <span className="hero-highlight">prod.</span>
      </h1>
      <div className="hero-bottom">
        <p className="hero-lead">
          Je suis Nicolas, développeur fullstack. Je cadre, je code et je mets en ligne votre MVP,
          votre outil métier ou votre fonctionnalité IA. Un seul interlocuteur, pas de chef de projet
          entre nous.
        </p>
        <div className="hero-actions">
          <a className="btn btn-accent" href="#contact">
            Décrire mon projet ↗
          </a>
          <a className="btn btn-outline" href="#work">
            Voir ce que j’ai livré
          </a>
        </div>
      </div>
    </section>
  );
}
