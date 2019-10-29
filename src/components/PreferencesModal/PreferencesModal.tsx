import React, { useState, useEffect } from 'react'
import styled from '../../lib/styled'
import Icon from '../atoms/Icon'
import { mdiClose } from '@mdi/js'
import { usePreferences } from '../../lib/preferences'
import TabButton from './TabButton'

const StyledContainer = styled.div`
  z-index: 7000;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px;
  background-color: white;
  .nav {
    width: 200px;
    margin-right: 10px;
  }
  .navButton {
    display: block;
    width: 100%;
    height: 30px;
    &.active {
      background-color: ${({ theme }) => theme.colors.active};
    }
  }
  .content {
    flex: 1;
  }
  .closeButton {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
  }
`

const PreferencesModal = () => {
  const { closed, toggleClosed } = usePreferences()
  const [tab, setTab] = useState('general')

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!closed && event.key === 'Escape') {
        toggleClosed()
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [closed, toggleClosed])

  if (closed) {
    return null
  }

  return (
    <StyledContainer>
      <div className='nav'>
        <TabButton
          label='General'
          tab='general'
          active={tab === 'general'}
          setTab={setTab}
        />
        <TabButton
          label='Editor'
          tab='editor'
          active={tab === 'editor'}
          setTab={setTab}
        />
        <TabButton
          label='Markdown'
          tab='markdown'
          active={tab === 'markdown'}
          setTab={setTab}
        />
        <TabButton
          label='Hotkeys'
          tab='hotkeys'
          active={tab === 'hotkeys'}
          setTab={setTab}
        />
        <TabButton
          label='About'
          tab='about'
          active={tab === 'about'}
          setTab={setTab}
        />
      </div>
      <div className='content'>Content</div>
      <button className='closeButton' onClick={toggleClosed}>
        <Icon path={mdiClose} />
      </button>
    </StyledContainer>
  )
}

export default PreferencesModal
