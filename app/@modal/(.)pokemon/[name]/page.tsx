import { Modal, PokemonDetails } from '@components';

export default function PokemonModal() {
  return (
    <Modal isOpen={true}>
      <PokemonDetails />
    </Modal>
  );
}
