import './App.css'

export function App() {
  return (
    <article className='md-followCard'>
      <header>
        <img alt="Avatar" src="https://img.icons8.com/color/128/vite.png" />
        <div>
          <strong>Nombre Apellido Apellido</strong>
          <span>@usuario</span>
        </div>
      </header>
      <aside>
        <button>
            Seguir
        </button>
      </aside>
    </article>
  );
}
