import type { Project } from "../../data/projects";

/**
 * Contenido de las pantallas.
 *
 * No es un screenshot suelto: una captura estirada dentro de un iPhone se lee
 * como una foto ampliada, no como un producto. Es una página montada con los
 * datos reales del proyecto (marca, secciones, título, descripción y stack
 * leído del package.json del repo).
 */

type Variant = "desktop" | "phone";

const BAR_HEIGHTS = [38, 54, 46, 68, 60, 82, 74, 96];

export const MockSite = ({
  project,
  variant,
  animate
}: {
  project: Project;
  variant: Variant;
  animate: boolean;
}) => {
  const isPhone = variant === "phone";

  return (
    <div
      className={[
        "mock",
        isPhone ? "mock--phone" : "",
        animate ? "mock--auto" : ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav className="mock__nav">
        <span className="mock__brand">{project.brand}</span>
        <span className="mock__links">
          {project.nav.slice(0, isPhone ? 2 : 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </nav>

      <header className="mock__hero">
        <div>
          <h1 className="mock__title">{project.title}</h1>
          {/* En móvil la descripción sale del hero: dentro se desborda. */}
          {!isPhone && <p className="mock__lede">{project.description}</p>}
        </div>

        <div
          className={`mock__shot ${
            project.imageFit === "contain" ? "mock__shot--contain" : ""
          }`}
        >
          {project.image && (
            <img src={project.image} alt="" loading="lazy" decoding="async" />
          )}
        </div>
      </header>

      {isPhone && (
        <section className="mock__section">
          <p className="mock__lede">{project.description}</p>
        </section>
      )}

      <section className="mock__section">
        <p className="mock__label">Stack</p>
        <div className="mock__chips">
          {project.stack.map((tech) => (
            <span key={tech} className="mock__chip">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mock__section">
        <div className="mock__cards">
          {Array.from({ length: isPhone ? 1 : 6 }).map((_, i) => (
            <div key={i} className="mock__card">
              <div className="mock__skel" />
              <div className="mock__skel" />
              <div className="mock__skel mock__skel--short" />
            </div>
          ))}
        </div>
      </section>

      {/* Sin gráfico en móvil: a ese tamaño no se lee y roba altura. */}
      {!isPhone && (
        <section className="mock__section">
          <div className="mock__chart">
            {BAR_HEIGHTS.map((h, i) => (
              <span key={i} className="mock__bar" style={{ height: `${h}%` }} />
            ))}
          </div>
        </section>
      )}

      {/* Listado con las secciones reales del producto: da recorrido al scroll
          y hace que la página se lea como un producto, no como un placeholder. */}
      {project.nav.length > 0 && (
        <section className="mock__section">
          <p className="mock__label">Módulos</p>
          <div className="mock__rows">
            {project.nav.map((item) => (
              <div key={item} className="mock__row">
                <span>
                  <span className="mock__dot" />
                  {item}
                </span>
                <span>Activo</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mock__spacer" />

      <footer className="mock__footer">
        <span>{project.brand}</span>
        <span>/{project.slug}</span>
      </footer>
    </div>
  );
};

/** Sesión de terminal, para proyectos que no tienen interfaz gráfica. */
export const MockTerminal = ({ project }: { project: Project }) => (
  <div className="term">
    {project.terminal?.map((line, i) => (
      <div key={i} className="term__line">
        {line.prompt && <span className="term__prompt">{line.prompt} </span>}
        <span
          className={
            line.tone === "dim"
              ? "term__dim"
              : line.tone === "ok"
              ? "term__ok"
              : line.tone === "accent"
              ? "term__accent"
              : undefined
          }
        >
          {line.text}
        </span>
        {line.prompt && !line.text && <span className="term__caret" />}
      </div>
    ))}
  </div>
);
