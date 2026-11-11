import Visita from "./Visita";

const ListaVisitas = ({ visitas, categorias }) => {
    if (visitas.length === 0) {
        return <p>No tenés visitas registradas.</p>;
    }

    return (
        <section className="lista-visitas" aria-label="Historial de visitas">
            {visitas.map((visita) => {
                const categoriaId =
                    typeof visita.categoriaId === "object"
                        ? visita.categoriaId?._id
                        : visita.categoriaId;
                const categoria = categorias.find(
                    (item) => item._id === categoriaId
                );

                return (
                    <Visita
                        key={visita._id}
                        visita={visita}
                        categoria={categoria}
                    />
                );
            })}
        </section>
    );
};

export default ListaVisitas;