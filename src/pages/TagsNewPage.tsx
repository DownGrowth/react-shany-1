import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { emojis } from '../lib/emoji'
import s from './TagsNewPage.module.scss'

export const TagsNewPage: React.FC = () => {
  const onSubmit = () => {
  }
  const [emojiKind, setEmojiKind] = useState('表情')
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='记一笔' icon={<Icon name="back" className='w-24px h-24px' />} />
        </Gradient>
      <form onSubmit={onSubmit} px-16px py-32px flex flex-col gap-y-8px>
        <div flex flex-col gap-y-8px>
          <span text-18px text="[var(--text-main)]">标签名</span>
          <input b-input-text />
          <span text-red text-12px>标签名太长</span>
        </div>
        <div flex flex-col gap-y-8px>
          <span text-18px text="[var(--text-main)]">符号 <span>😊</span></span>
          <div b-1 b="#C1E9F8" rounded-8px>
            <div flex px-8px py-8px gap-x-16px overflow-auto text="#999">
              {emojis.map(emoji =>
                <span key={emoji.name} whitespace-nowrap
                  className={emoji.name === emojiKind ? s.selectedTag : ''}
                  onClick={() => setEmojiKind(emoji.name)}>{emoji.name} </span>)}
            </div>
            <div text-24px pt-8px pb-16px h-400px overflow-auto>
              {emojis.map(emoji =>
                <div key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}
                grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]" justify-center
                >
                  {emoji.chars.map(char => <span>{char}</span>)}
              </div>)}
            </div>
          </div>
        </div>
        <p text-center py-24px text="[var(--text-main)]">记账时长按标签即可编辑</p>
        <div>
          <button b-btn>确定</button>
        </div>
      </form>
    </div>
  )
}
