import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgNavigationReverse(props) {
    return (
        <Svg width={277.429} height={14.95} {...props}>
            <Path
                data-name="Ligne 4"
                fill="none"
                stroke="#0099bc"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M0 1h277.429"
            />
            <Path
                data-name="Trac\xE9 44"
                d="M138.715 14.949l5.417-9.381h-10.833z"
                fill="#296197"
                style={{
                    mixBlendMode: 'screen',
                    isolation: 'isolate',
                }}
            />
        </Svg>
    )
}

export default SvgNavigationReverse