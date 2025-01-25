import './styles/custom.scss';
import './styles/style.css'

export function App() {
  return (
    <article className='md-followCard'>
      <header>
        <img alt="Avatar" src="https://img.icons8.com/color/128/vite.png" />
        <div className={''}>
          <strong>Nombre Apellido Apellido</strong>
          <span>@usuario</span>
        </div>
      </header>
      <aside>
        <button className={'btn btn-primary'}>
            Seguir
        </button>
      </aside>
    </article>
  );
}
