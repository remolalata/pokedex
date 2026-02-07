import { Modal, PokemonCardLoader } from '@components';

export default function PokemonModalLoading() {
  return (
    <Modal isOpen={true} backgroundColor='#9ca3af'>
      <div className='p-4 min-h-[340px] flex items-center justify-center'>
        <PokemonCardLoader />
      </div>
    </Modal>
  );
}
