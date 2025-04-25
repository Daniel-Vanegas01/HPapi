function Filtro({ onCasaChange }) {
  const casas = [
    "All",
    "Gryffindor",
    "Slytherin",
    "Ravenclaw",
    "Hufflepuff",
    "unknown"
  ];

  return (
    <div className="c-filtro">
      {casas.map((casa, index) => (
        <button key={index} onClick={() => onCasaChange(casa)}>
          {casa}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
