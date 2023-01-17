import add from '../assets/images/add.svg'
export const AddItemFloatButton: React.FC = () =>
  (<button w-56px h-56px bg='#C1E9F8' rounded="50%" b-none text='black' text-6xl fixed bottom-16px right-16px>
  <img max-w="70%" max-h="70%" src={add} />
</button>)
