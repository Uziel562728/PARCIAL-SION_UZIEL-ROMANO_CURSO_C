import fs from "fs/promises";
import path from "path";

const obtenerPokemonPorId = async (id) => {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!respuesta.ok) {
        throw new Error("Error al consumir PokeAPI");
    }

    const pokemon = await respuesta.json();

    return pokemon;
};

export const generarCsvPokemonService = async () => {
    const pokemones = [];

    for (let id = 1; id <= 15; id++) {
        const pokemon = await obtenerPokemonPorId(id);

        pokemones.push({
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            base_experience: pokemon.base_experience
        });
    }

    let csv = "id,name,height,weight,base_experience\n";

    pokemones.forEach((pokemon) => {
        csv += `${pokemon.id},${pokemon.name},${pokemon.height},${pokemon.weight},${pokemon.base_experience}\n`;
    });

  const carpetaArchivos = path.join(process.cwd(), "files");

await fs.mkdir(carpetaArchivos, {
    recursive: true
});

const rutaArchivo = path.join(carpetaArchivos, "pokemon_15.csv");

await fs.writeFile(rutaArchivo, csv);

    return csv;
};