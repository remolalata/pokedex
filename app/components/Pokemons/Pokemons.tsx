import { PokemonDetail } from "@types";
import { map } from "lodash-es";

interface PokemonsProps {
    pokemons: PokemonDetail[];
}

export const Pokemons = ({
    pokemons = []
}: PokemonsProps) => {
    return (
        <div>
            <ul>
                {map(pokemons, (pokemon) => (
                        <h3>{pokemon.name}</h3>
                ))}
            </ul>
        </div>
    )
}