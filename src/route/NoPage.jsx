import '../style/noPage.css';

const NoPage = () => {
  return (
    <div className="no-page">
      <h1>404</h1>
      <p>Oops! La página que buscas no existe.</p>
      <a href="/" className="back-home">Volver al inicio</a>
    </div>
  );
};

export default NoPage;
