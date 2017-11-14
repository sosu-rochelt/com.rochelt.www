/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "styles" }]*/

import React from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames'

import styles from './LanguageSelection.scss'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */

 /**
  * @param  {array}
  * @return {node}
  */



const LanguageSelectionLink = (language, index) => {
    return <li key={index} className="languageSelection__item">
        <a href={'#'+ language.lang} className="languageSelection__link">{language.label}</a>
    </li>
}

const LanguageSelection = ({languages, dark, ...otherProps }) => {
    const languageList = languages.map((language, index) => LanguageSelectionLink(language, index))
    return <ul
        className={cx({
            'languageSelection': true,
            'languageSelection--dark': dark,
            'is-hidden': languages.length === 1 ? true : false
        })}

        {...otherProps}
    >
    {languageList}    
    
    </ul>
}


LanguageSelection.propTypes = {
    /** defining available languages, this does not check for availability of each content block */
    languages: PropTypes.array,
    dark: PropTypes.bool

}

LanguageSelection.defaultProps = {
    languages: [{lang: 'de',label: 'de'}],
    dark: true
};

export default LanguageSelection
