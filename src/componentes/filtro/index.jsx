  function Filtro({ onCasaChange }) {
    const casas = [
      "All",
      "Gryffindor",
      "Slytherin",
      "Hufflepuff",
      "Ravenclaw",
      "Other"
    ];

    return (
      <div className="c-filtro">
        {casas.map((casa, index) => (
          <button
            key={index}
            onClick={() => onCasaChange(casa)}
            className=""
          >
            {casa}
          </button>
        ))}
      </div>
    );
  }

  export default Filtro;
