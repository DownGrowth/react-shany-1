import p from '../assets/images/mountain.svg'
import add from '../assets/images/add.svg'
export const Home: React.FC = () => {
  return <div>
    <div flex justify-center items-center>
      <img mt-20vh mb-20vh width="186" height="186" src={p} />
      </div>
      <div px-16px>
      <button h-48px w="100%" bg='#C1E9F8' b-none text='black' rounded-8px>开始记账</button>
      </div>
    <button w-56px h-56px bg='#C1E9F8' rounded="50%" b-none text='black' text-6xl fixed bottom-16px right-16px>
      <img max-w="70%" max-h="70%" src={add} />
    </button>

  </div>
}
