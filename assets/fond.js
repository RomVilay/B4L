import React from 'react'
import Svg, {Defs, RadialGradient, Stop, Path} from 'react-native-svg'

function SvgFond(props) {
  return (
    <Svg width={376.942} height={816.206} {...props}>
      <Defs>
        <RadialGradient
          id="fond_svg__a"
          cx={0.509}
          cy={0.342}
          r={0.593}
          gradientTransform="matrix(2.165 0 0 1 -.593 0)"
          gradientUnits="objectBoundingBox">
          <Stop offset={0} stopColor="#0e2e45" />
          <Stop offset={0.23} stopColor="#0d2b40" />
          <Stop offset={0.492} stopColor="#0a2232" />
          <Stop offset={0.769} stopColor="#05141b" />
          <Stop offset={1} stopColor="#000503" />
        </RadialGradient>
      </Defs>
      <Path fill="url(#fond_svg__a)" d="M0 0h376.942v816.206H0z" />
    </Svg>
  )
}

export default SvgFond