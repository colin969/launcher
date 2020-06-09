import * as React from 'react';
import { withSearch, WithSearchProps } from '@renderer/containers/withSearch';

type OwnProps = {};

type AdvSearchPanelProps = OwnProps & WithSearchProps

function AdvSearch(props: AdvSearchPanelProps) {
  const boxes: JSX.Element[] = [];
  const wrapperClass = props.advSearchOpen ? 'adv-search__wrapper-open' : '';
  return (
    <div className={`adv-search__wrapper ${wrapperClass}`}>
      <div className='adv-search'>
        { boxes.map((b, i) => (
          <div
            className='adv-search__box'
            key={i} >
            {b}
          </div>
        ))
        }
      </div>
    </div>
  );
}

export const AdvSearchPanel = withSearch(AdvSearch);