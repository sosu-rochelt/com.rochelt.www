import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './Header.scss';

import Divider from '../../atoms/Divider';

import FullsizeImage from '../../atoms/FullsizeImage';
import LanguageSelection from '../../atoms/LanguageSelection';
import Title from '../../atoms/Title';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
/**
 * @param  {string}
 * @param  {string}
 * @param  {...[type]}
 * @return {node}
 */
const Header = ({
  className,
  colorOverride,
  title,
  subline,
  src,
  variant,
  ...otherProps
}) => {
  const srcIsColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/gm.test(src);
  const additionalProps = { ...otherProps };

  return (
    <div
      style={{
        color: colorOverride,
        backgroundColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/gm.test(src)
          ? src
          : 'transparent'
      }}
      className={cx({
        header: true
      })}
    >
      <FullsizeImage src={src}>
        <LanguageSelection
          dark={false}
          languages={[{ lang: 'de', label: 'de' }]}
        />

        <Title title={title} subline={subline} />

        <Divider
          variant={[
            'small',
            'no-bottom-margin',
            variant === 'dark' ? 'dark' : 'light'
          ]}
        />
      </FullsizeImage>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  colorOverride: PropTypes.string,
  title: PropTypes.string,
  subline: PropTypes.string
};

Header.defaultProps = {
  colorOverride: 'none'
};
export default Header;
