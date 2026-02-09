import { getGradientFromHex } from '@/app/lib/helpers';
import { Modal, PokemonCardLoader } from '@components';

export default function PokemonModalLoading() {
  const backgroundColor = '#9ca3af';

  return (
    <Modal isOpen={true} backgroundColor={backgroundColor} background={getGradientFromHex(backgroundColor)}>
      <div className='p-4 min-h-[340px] flex items-center justify-center'>
        <PokemonCardLoader />
      </div>
    </Modal>
  );
}
