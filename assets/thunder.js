import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgThunder(props) {
    return (
        <Svg width={13.497} height={21.621} {...props}>
            <Path
                d="M13.438 8.325a.453.453 0 00-.394-.229H7.117L8.111.502a.455.455 0 00-.834-.3L.068 12.832a.453.453 0 00.385.69h5.839l-.788 7.6a.455.455 0 00.838.278l7.09-12.628a.453.453 0 00.005-.456z"
                fill="#087998"
            />
        </Svg>
    )
}

export default SvgThunder